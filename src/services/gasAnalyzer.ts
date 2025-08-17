// Method Signatures
const METHOD_SIGNATURES = {
  '0xb4206dd2': 'LOCK_REQUEST',
  '0x8e3b6945': 'SUBMIT_ROOT_AND_FULFILL',
  '0xa9059cbb': 'ERC20_TRANSFER',
  '0x23b872dd': 'ERC20_TRANSFER_FROM',
  '0x095ea7b3': 'ERC20_APPROVE',
  '0x': 'NATIVE_ETH_TRANSFER',
  'OTHER': 'OTHER_METHODS'
};

function getMethodSignature(data: string): string {
  if (!data || data === '0x' || data.length < 10) {
    return 'NATIVE_ETH_TRANSFER';
  }
  const signature = data.slice(0, 10).toLowerCase();
  return METHOD_SIGNATURES[signature as keyof typeof METHOD_SIGNATURES] || 'OTHER_METHODS';
}

function parseDate(dateString: string): number {
  const parts = dateString.split('-');
  
  if (parts.length !== 3) {
    throw new Error(`Invalid date format: ${dateString}. Please use YYYY-MM-DD format.`);
  }
  
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error(`Invalid date format: ${dateString}. Please use YYYY-MM-DD format.`);
  }
  
  const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}. Please check the date values.`);
  }
  
  return Math.floor(date.getTime() / 1000);
}

async function getTransactionsFromEtherscan(
  walletAddress: string,
  startTimestamp: number,
  endTimestamp: number,
  apiKey: string
) {
  const chainId = 8453; // BASE Network
  const url = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "1") {
    throw new Error(`Etherscan API error: ${data.message || 'Unknown error'}`);
  }

  // Filter by timestamp
  const filteredTxs = data.result.filter((tx: any) => {
    const txTimestamp = parseInt(tx.timeStamp);
    return txTimestamp >= startTimestamp && txTimestamp <= endTimestamp;
  });

  return filteredTxs;
}

function analyzeTransactionsByMethod(transactions: any[]) {
  const methodStats = {
    LOCK_REQUEST: { count: 0, totalFee: BigInt(0), totalGas: BigInt(0), successful: 0, failed: 0 },
    SUBMIT_ROOT_AND_FULFILL: { count: 0, totalFee: BigInt(0), totalGas: BigInt(0), successful: 0, failed: 0 },
    NATIVE_ETH_TRANSFER: { count: 0, totalFee: BigInt(0), totalGas: BigInt(0), successful: 0, failed: 0 },
    ERC20_TRANSFER: { count: 0, totalFee: BigInt(0), totalGas: BigInt(0), successful: 0, failed: 0 },
    ERC20_APPROVE: { count: 0, totalFee: BigInt(0), totalGas: BigInt(0), successful: 0, failed: 0 },
    OTHER_METHODS: { count: 0, totalFee: BigInt(0), totalGas: BigInt(0), successful: 0, failed: 0 }
  };

  let totalOverallFee = BigInt(0);
  let totalSuccessful = 0;
  let totalFailed = 0;

  for (const tx of transactions) {
    const methodName = getMethodSignature(tx.input || tx.data);
    const gasUsed = BigInt(tx.gasUsed || 0);
    let gasPrice = BigInt(tx.gasPrice || 0);

    if (tx.effectiveGasPrice) {
      gasPrice = BigInt(tx.effectiveGasPrice);
    }

    const txFee = gasUsed * gasPrice;
    const isSuccessful = tx.isError === "0" && tx.txreceipt_status === "1";

    if (methodStats[methodName as keyof typeof methodStats]) {
      const stats = methodStats[methodName as keyof typeof methodStats];
      stats.count++;
      stats.totalFee += txFee;
      stats.totalGas += gasUsed;

      if (isSuccessful) {
        stats.successful++;
      } else {
        stats.failed++;
      }
    }

    totalOverallFee += txFee;

    if (isSuccessful) {
      totalSuccessful++;
    } else {
      totalFailed++;
    }
  }

  return {
    methodStats,
    totalOverallFee,
    totalSuccessful,
    totalFailed,
    totalTransactions: transactions.length
  };
}

export async function analyzeGasFeesStandalone(args: {
  walletAddress: string;
  startDate: string;
  endDate: string;
  etherscanApiKey: string;
}) {
  try {
    // Validate wallet address format
    if (!args.walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      throw new Error('Invalid wallet address format');
    }

    // Parse dates
    const startTimestamp = parseDate(args.startDate);
    const endTimestamp = parseDate(args.endDate) + (24 * 60 * 60 - 1);

    if (startTimestamp >= endTimestamp) {
      throw new Error('Start date must be before end date');
    }

    // Fetch transactions from Etherscan
    const transactions = await getTransactionsFromEtherscan(
      args.walletAddress,
      startTimestamp,
      endTimestamp,
      args.etherscanApiKey
    );

    if (!transactions || transactions.length === 0) {
      return {
        success: false,
        message: 'No transactions found in the specified date range',
        data: null
      };
    }

    // Analyze transactions by method
    const results = analyzeTransactionsByMethod(transactions);

    // Calculate combined special methods
    const lockRequestStats = results.methodStats.LOCK_REQUEST;
    const submitRootStats = results.methodStats.SUBMIT_ROOT_AND_FULFILL;
    
    const combinedFee = lockRequestStats.totalFee + submitRootStats.totalFee;
    const combinedCount = lockRequestStats.count + submitRootStats.count;
    const combinedSuccessful = lockRequestStats.successful + submitRootStats.successful;
    const combinedFailed = lockRequestStats.failed + submitRootStats.failed;

    // Convert BigInt to string for storage
    const methodStatsForStorage = Object.fromEntries(
      Object.entries(results.methodStats).map(([key, stats]) => [
        key,
        {
          count: stats.count,
          totalFee: stats.totalFee.toString(),
          totalGas: stats.totalGas.toString(),
          successful: stats.successful,
          failed: stats.failed,
        }
      ])
    );

    const analysisData = {
      walletAddress: args.walletAddress,
      startDate: args.startDate,
      endDate: args.endDate,
      totalTransactions: results.totalTransactions,
      totalSuccessful: results.totalSuccessful,
      totalFailed: results.totalFailed,
      totalOverallFee: results.totalOverallFee.toString(),
      methodStats: methodStatsForStorage,
      combinedSpecialMethods: {
        totalFee: combinedFee.toString(),
        totalCount: combinedCount,
        totalSuccessful: combinedSuccessful,
        totalFailed: combinedFailed,
      },
      createdAt: Date.now(),
    };

    return {
      success: true,
      message: `Analysis completed successfully. Found ${results.totalTransactions} transactions.`,
      data: analysisData
    };

  } catch (error: any) {
    console.error('Gas analysis error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred during analysis',
      data: null
    };
  }
}
