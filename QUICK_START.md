# ⚡ Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1️⃣ Backend Setup
```bash
# In project root
npm install
npm run compile
npm test                    # Verify tests pass
```

### 2️⃣ Deploy Locally
```bash
# Terminal 1: Start local blockchain
npm run node

# Terminal 2: Deploy contract
npm run deploy:local
# Copy the deployed address (e.g., 0x5FbDB...)
```

### 3️⃣ Frontend Setup
```bash
# Terminal 3: Navigate to frontend
cd frontend
npm install

# Create .env file
echo REACT_APP_DEVICE_REGISTRY_ADDRESS=0xYOUR_ADDRESS > .env
# Replace 0xYOUR_ADDRESS with the address from step 2

# Start React app
npm start
```

### 4️⃣ Connect MetaMask
1. Add network: `http://127.0.0.1:8545`, Chain ID `31337`
2. Import a Hardhat test account (private key from Terminal 1)
3. In the app, click "Connect MetaMask"

### 5️⃣ Use the App
- **Register Device:** Enter name → Click "Register" → Confirm in MetaMask
- **Fetch by ID:** Paste device ID → Click "Fetch Details"
- **View All:** Click "Load My Devices"

---

## 📋 Full Instructions

See `SETUP_INSTRUCTIONS.md` for detailed step-by-step guide with troubleshooting.



