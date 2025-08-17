import { Toaster } from "sonner";
import { GasTracker } from "./components/GasTracker";
import { DynamicHeader } from './components/DynamicHeader';
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-boundless-body">
      {/*<header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md h-20 flex justify-center items-center border-b border-gray-200 shadow-sm px-6">*/}
      {/*  <div className="flex items-center gap-4">*/}
      {/*    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">*/}
      {/*      <span className="text-white font-bold text-xl">🍓</span>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">*/}
      {/*          Boundless ZK Fee Analyzer*/}
      {/*      </h2>*/}
      {/*      <p className="text-sm text-gray-500">Method-Based Transaction Analysis</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</header>*/}
        {/* Dynamic Header */}
        <DynamicHeader />

        {/* Main Content */}

      <main className="flex-1 p-6 pt-8">
        <div className="max-w-7xl mx-auto">
          <GasTracker />
        </div>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}
