import { useEffect, useRef } from "react";
import { AnalysisData } from "./GasTracker";

interface AnalysisResultsProps {
    data: AnalysisData;
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Bileşen render edildiğinde otomatik olarak scroll yap
        const timer = setTimeout(() => {
            if (resultsRef.current) {
                // Header yüksekliği için offset hesapla
                const headerHeight = 80; // Header'ın yaklaşık yüksekliği
                const elementPosition = resultsRef.current.offsetTop - headerHeight;

                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [data]); // data değiştiğinde çalış

    const formatEther = (weiString: string, maxDigits: number = 8) => {
        const wei = BigInt(weiString);
        const ether = Number(wei) / 1e18;
        return ether.toFixed(maxDigits).replace(/\.?0+$/, '');
    };

    const formatPercentage = (value: number, total: number) => {
        if (total === 0) return "0.0";
        return ((value / total) * 100).toFixed(1);
    };

    const getMethodIcon = (method: string) => {
        switch (method) {
            case 'LOCK_REQUEST': return '🔒';
            case 'SUBMIT_ROOT_AND_FULFILL': return '✅';
            case 'NATIVE_ETH_TRANSFER': return '💎';
            case 'ERC20_TRANSFER': return '🔄';
            case 'ERC20_APPROVE': return '✔️';
            case 'OTHER_METHODS': return '🔧';
            default: return '📊';
        }
    };

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'LOCK_REQUEST': return 'from-red-500 to-pink-500';
            case 'SUBMIT_ROOT_AND_FULFILL': return 'from-green-500 to-emerald-500';
            case 'NATIVE_ETH_TRANSFER': return 'from-blue-500 to-cyan-500';
            case 'ERC20_TRANSFER': return 'from-purple-500 to-violet-500';
            case 'ERC20_APPROVE': return 'from-yellow-500 to-orange-500';
            case 'OTHER_METHODS': return 'from-gray-500 to-slate-500';
            default: return 'from-indigo-500 to-blue-500';
        }
    };

    const getMethodBorderColor = (method: string) => {
        switch (method) {
            case 'LOCK_REQUEST': return 'border-red-200';
            case 'SUBMIT_ROOT_AND_FULFILL': return 'border-green-200';
            case 'NATIVE_ETH_TRANSFER': return 'border-blue-200';
            case 'ERC20_TRANSFER': return 'border-purple-200';
            case 'ERC20_APPROVE': return 'border-yellow-200';
            case 'OTHER_METHODS': return 'border-gray-200';
            default: return 'border-indigo-200';
        }
    };

    return (
        <div ref={resultsRef} className="space-y-8 animate-fadeIn">
            {/* Analysis Complete - Ana başlık kartı */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl text-white p-8 shadow-2xl">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-pulse-custom">
                        <span className="text-3xl">📊</span>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Analysis Complete!</h2>
                        <p className="text-blue-100 text-lg">BASE Network Method-Based Gas Fee Report</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm hover-lift">
                        <div className="text-3xl font-bold mb-1">{data.totalTransactions}</div>
                        <div className="text-blue-100">Total Transactions</div>
                    </div>
                    <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm hover-lift">
                        <div className="text-3xl font-bold mb-1">{formatEther(data.totalOverallFee, 5)}</div>
                        <div className="text-blue-100">Total ETH Fees</div>
                    </div>
                    <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm hover-lift">
                        <div className="text-3xl font-bold mb-1">{formatPercentage(data.totalSuccessful, data.totalTransactions)}%</div>
                        <div className="text-blue-100">Success Rate</div>
                    </div>
                    <div className="bg-white/15 rounded-2xl p-6 text-center backdrop-blur-sm hover-lift">
                        <div className="text-3xl font-bold mb-1">
                            {data.totalTransactions > 0 ? formatEther((BigInt(data.totalOverallFee) / BigInt(data.totalTransactions)).toString(), 6) : '0'}
                        </div>
                        <div className="text-blue-100">Avg Fee/TX (ETH)</div>
                    </div>
                </div>
            </div>

            {/* Special Methods Spotlight */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 animate-slideIn">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-green-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">🎯</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Special Methods Spotlight</h3>
                        <p className="text-gray-600">Lock Requests & Fulfilled Proofs Analysis</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200 hover-lift">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">🔒</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-red-900">Lock Requests</h4>
                                <code className="text-red-600 text-sm bg-red-100 px-2 py-1 rounded">0xb4206dd2</code>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-900">{data.methodStats.LOCK_REQUEST?.count || 0}</div>
                                <div className="text-red-600 text-sm">Transactions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-900">{formatEther(data.methodStats.LOCK_REQUEST?.totalFee || '0')}</div>
                                <div className="text-red-600 text-sm">Total ETH</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover-lift">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">✅</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-green-900">Fulfilled Proofs</h4>
                                <code className="text-green-600 text-sm bg-green-100 px-2 py-1 rounded">0x8e3b6945</code>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-900">{data.methodStats.SUBMIT_ROOT_AND_FULFILL?.count || 0}</div>
                                <div className="text-green-600 text-sm">Transactions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-900">{formatEther(data.methodStats.SUBMIT_ROOT_AND_FULFILL?.totalFee || '0')}</div>
                                <div className="text-green-600 text-sm">Total ETH</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                    <h4 className="text-xl font-bold text-purple-900 mb-6 flex items-center gap-2">
                        <span>🎯</span>
                        <span>Combined Special Methods Summary</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-900 mb-1">{data.combinedSpecialMethods.totalCount}</div>
                            <div className="text-purple-600 text-sm">Total TXs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-900 mb-1">{formatEther(data.combinedSpecialMethods.totalFee, 7)}</div>
                            <div className="text-purple-600 text-sm">Total ETH</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-900 mb-1">{formatPercentage(data.combinedSpecialMethods.totalSuccessful, data.combinedSpecialMethods.totalCount)}%</div>
                            <div className="text-purple-600 text-sm">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-900 mb-1">
                                {data.combinedSpecialMethods.totalCount > 0 ? formatEther((BigInt(data.combinedSpecialMethods.totalFee) / BigInt(data.combinedSpecialMethods.totalCount)).toString(), 7) : '0'}
                            </div>
                            <div className="text-purple-600 text-sm">Avg ETH/TX</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Method Breakdown */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white text-xl">📈</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Complete Method Breakdown</h3>
                        <p className="text-gray-600">All transaction methods with detailed analytics</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.entries(data.methodStats).map(([method, stats]) => {
                        if (stats.count === 0) return null;

                        const avgFee = stats.count > 0 ? formatEther((BigInt(stats.totalFee) / BigInt(stats.count)).toString()) : '0';
                        const feePercentage = data.totalOverallFee !== '0' ?
                            ((Number(stats.totalFee) / Number(data.totalOverallFee)) * 100).toFixed(2) : '0.00';

                        const displayMethodName = method === 'LOCK_REQUEST' ? 'Lock Requests' :
                            method === 'SUBMIT_ROOT_AND_FULFILL' ? 'Fulfilled Proofs' :
                                method.replace(/_/g, ' ');

                        return (
                            <div key={method} className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 ${getMethodBorderColor(method)} hover-lift`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${getMethodColor(method)} rounded-xl flex items-center justify-center shadow-lg`}>
                                        <span className="text-white text-lg">{getMethodIcon(method)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{displayMethodName}</h4>
                                        <p className="text-gray-500 text-sm">{stats.count} transactions</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Total Fee:</span>
                                        <span className="font-bold text-gray-900">{formatEther(stats.totalFee)} ETH</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Avg Fee/TX:</span>
                                        <span className="font-bold text-gray-900">{avgFee} ETH</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Success Rate:</span>
                                        <span className="font-bold text-green-600">{formatPercentage(stats.successful, stats.count)}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Fee Share:</span>
                                        <span className="font-bold text-purple-600">{feePercentage}%</span>
                                    </div>

                                    {stats.failed > 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-500">⚠️</span>
                                                <span className="text-red-700 text-sm font-medium">
                          {stats.failed} failed TXs (gas fees paid)
                        </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Analysis Information */}
            <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white">ℹ️</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Analysis Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <span className="text-gray-600 font-medium block mb-2">Wallet Address:</span>
                        <div className="font-mono text-gray-900 text-sm break-all bg-gray-50 p-2 rounded">{data.walletAddress}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <span className="text-gray-600 font-medium block mb-2">Date Range:</span>
                        <div className="font-bold text-gray-900">{data.startDate} → {data.endDate}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <span className="text-gray-600 font-medium block mb-2">Analysis Date:</span>
                        <div className="font-bold text-gray-900">{new Date(data.createdAt).toLocaleString()}</div>
                    </div>
                </div>
                <div className="mt-6 bg-white rounded-xl p-4 border border-blue-200">
                    <p className="text-blue-800 text-sm">
                        <strong>🔵 BASE Network Analysis:</strong> All transactions included (successful + failed).
                        Failed transactions still paid gas fees and are counted in totals.
                    </p>
                </div>
            </div>
        </div>
    );
}