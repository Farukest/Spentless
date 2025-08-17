import { useState } from "react";
import { toast } from "sonner";
import { AnalysisForm } from "./AnalysisForm";
import { AnalysisResults } from "./AnalysisResults";
import { analyzeGasFeesStandalone } from "../services/gasAnalyzer";

export interface AnalysisData {
  walletAddress: string;
  startDate: string;
  endDate: string;
  totalTransactions: number;
  totalSuccessful: number;
  totalFailed: number;
  totalOverallFee: string;
  methodStats: Record<string, MethodStats>;
  combinedSpecialMethods: {
    totalFee: string;
    totalCount: number;
    totalSuccessful: number;
    totalFailed: number;
  };
  createdAt: number;
}

export interface MethodStats {
  count: number;
  totalFee: string;
  totalGas: string;
  successful: number;
  failed: number;
}

export function GasTracker() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async (formData: {
    walletAddress: string;
    startDate: string;
    endDate: string;
    etherscanApiKey: string;
  }) => {
    setIsLoading(true);
    setAnalysisData(null);

    try {
      const result = await analyzeGasFeesStandalone(formData);
      
      if (result.success && result.data) {
        setAnalysisData(result.data);
        toast.success(result.message, {
          duration: 5000,
          description: `Found ${result.data.totalTransactions} transactions with ${result.data.combinedSpecialMethods.totalCount} special method calls`
        });
      } else {
        toast.error(result.message, {
          duration: 8000,
          description: "Please check your wallet address, date range, and API key"
        });
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'An error occurred during analysis', {
        duration: 8000,
        description: "Please try again or check your inputs"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        {/*<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">*/}
        {/*    🍇 Boundless ZK Fee Analyzer*/}
        {/*</h1>*/}
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          <strong> See How Much You Spent </strong>
        </p>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Professional method-based ( Limited for Boundless ZK Necessary Methods ) transaction analysis for BASE network. Track <strong>Lock Requests</strong>,
          <strong> Fulfilled Proofs</strong> with lightning-fast Etherscan API.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Method Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Failed TX Included</span>
          </div>
        </div>
      </div>

      <AnalysisForm onSubmit={handleAnalysis} isLoading={isLoading} />
      
      {analysisData && <AnalysisResults data={analysisData} />}
    </div>
  );
}
