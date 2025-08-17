# Boundless ZK Fee Analyzer 🍓

**Method-Based Transaction Analysis for BASE Network**

An advanced application that analyzes all your transactions on the BASE network for the Boundless ZK proof project. Provides detailed transaction analysis using wallet addresses and Etherscan API keys.

## 🎯 About the Project

This application comprehensively analyzes your transactions on BASE Network for the Boundless ZK proof project. It visualizes your blockchain activities with gas fees, transaction types, and method-based analysis.

## ✨ Features

- 🔍 **Wallet Analysis**: Analyze any BASE wallet address
- 📊 **Transaction Visualization**: Examine your transaction data with charts
- 💰 **Gas Fee Tracking**: Detailed gas fee analysis
- 🔧 **Method-Based Analysis**: Categorized analysis by transaction types
- 🌐 **Etherscan Integration**: Reliable data source
- 📱 **Responsive Design**: Perfect experience on all devices

## 🛠️ Technologies

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Convex
- **Blockchain**: BASE Network
- **API**: Etherscan API
- **Authentication**: Convex Auth (Anonymous)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Farukest/boundless-zk-analyzer.git
cd boundless-zk-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file:
```bash
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
CONVEX_DEPLOYMENT=giddy-gazelle-766
```

### 4. Get Etherscan API Key
1. Go to [Etherscan.io](https://etherscan.io/apis)
2. Create an account
3. Get your API key
4. Add it to `.env.local` file

### 5. Start the Application
```bash
npm run dev
```

## 📁 Project Structure

```
boundless-zk-analyzer/
├── app/                    # Frontend code (Vite + React)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   └── utils/          # Helper functions
├── convex/                 # Backend code (Convex)
│   ├── functions/          # Convex functions
│   ├── schema.ts           # Database schema
│   └── router.ts           # HTTP routes
└── README.md
```

## 🔧 Usage

### 1. Enter Wallet Address
- Enter your BASE wallet address on the main page
- Must be in valid Ethereum address format (0x...)

### 2. Start Analysis
- Click the "Analyze" button
- Data is fetched from Etherscan API
- Transaction data is processed and analyzed

### 3. Review Results
- **Transaction Summary**: Total transactions, gas usage
- **Graphical Analysis**: Time-based transaction distribution
- **Method Analysis**: Most used contract methods
- **Gas Fee Analysis**: Total and average fees paid

## 📊 Analysis Types

### Gas Fee Analysis
- Total gas consumption
- Average gas price
- Most expensive transactions
- Time-based gas trends

### Method-Based Analysis
- Contract interaction types
- Most frequently used methods
- Gas consumption by methods
- DeFi protocol usage

### Transaction Patterns
- Daily transaction activity
- Transaction size distribution
- Success/failure ratio

## 🌐 Deployment

### Deploy to Production
```bash
# Deploy Convex to production
npx convex deploy

# Build the frontend
npm run build

# Deploy to your preferred hosting service
```

### Supported Platforms
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Developer

- **Twitter**: [@Farukins](https://twitter.com/Farukins)
- **GitHub**: [@Farukest](https://github.com/Farukest)

## 🔗 Useful Links

- [BASE Network](https://base.org/)
- [Etherscan API](https://docs.etherscan.io/)
- [Boundless ZK Project](#)

## 📈 Roadmap

- [ ] Multi-wallet support
- [ ] NFT transaction analysis
- [ ] DeFi yield tracking
- [ ] Mobile app
- [ ] Advanced filtering options
- [ ] Export functionality

---

**⚡ Developed for the Boundless ZK proof project**