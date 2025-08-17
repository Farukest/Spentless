import { useState } from "react";

const today = new Date().toISOString().split('T')[0];
const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

interface AnalysisFormProps {
  onSubmit: (data: {
    walletAddress: string;
    startDate: string;
    endDate: string;
    etherscanApiKey: string;
  }) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const [formData, setFormData] = useState({
    walletAddress: "",
    startDate: weekAgo,
    endDate: today,
    etherscanApiKey: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      startDate: formData.startDate || weekAgo,
      endDate: formData.endDate || today
    };
    
    console.log('Form submitting:', submitData);
    onSubmit(submitData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">🔍</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gas Fee Analysis
          </h2>
          <p className="text-gray-500 mt-1">Analyze BASE network transactions by method signatures ( Boundless ZK )</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="walletAddress" className="block text-sm font-bold text-gray-800 mb-3">
              💳 Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="0x742d35Cc6634C0532925a3b8D35542Bb8000A8e4"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300 text-gray-800 font-mono text-sm bg-gray-50 hover:bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="etherscanApiKey" className="block text-sm font-bold text-gray-800 mb-3">
              🔑 Etherscan API Key
            </label>
            <input
              type="password"
              id="etherscanApiKey"
              name="etherscanApiKey"
              value={formData.etherscanApiKey}
              onChange={handleChange}
              placeholder="Your Etherscan API Key"
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="startDate" className="block text-sm font-bold text-gray-800 mb-3">
              📅 Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="endDate" className="block text-sm font-bold text-gray-800 mb-3">
              📅 End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all duration-300 text-gray-800 bg-gray-50 hover:bg-white"
              required
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-sm">💡</span>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2 text-lg">Get Your FREE Etherscan API Key</h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                Visit <a href="https://etherscan.io/apis" target="_blank" rel="noopener noreferrer" 
                className="underline font-bold hover:text-purple-600 transition-colors">etherscan.io/apis</a> to get your free API key.
              </p><p className="text-blue-800 text-sm leading-relaxed">or</p>

                <p className="text-blue-800 text-sm leading-relaxed mb-2">
                 If you already have go <a href="https://etherscan.io/apidashboard" target="_blank" rel="noopener noreferrer"
                 className="underline font-bold hover:text-purple-600 transition-colors">etherscan.io/apidashboard</a>
                </p>
              <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
                <p className="text-blue-700 text-sm font-medium">
                  🚀 <strong>Super Fast:</strong> API supports BASE network (Chain ID: 8453)<br/>
                  ⚡ <strong>Lightning Speed:</strong> 1000x faster than RPC scanning<br/>
                  🎯 <strong>Method Detection:</strong> Lock Requests & Fulfilled Proofs tracking
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-5 px-8 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-lg">Analyzing Transactions...</span>
            </>
          ) : (
            <>
              <span className="text-xl">🍓</span>
              <span className="text-lg">Click to See Your Results</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
