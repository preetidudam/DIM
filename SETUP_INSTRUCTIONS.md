# Step-by-Step Setup Instructions

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
- ✅ **npm 9+** (comes with Node.js)
- ✅ **MetaMask** browser extension installed ([Get MetaMask](https://metamask.io/))
- ✅ **Git** (optional, for version control)

Verify installations:
```bash
node --version    # Should show v18.x or higher
npm --version     # Should show 9.x or higher
```

---

## 🚀 PART 1: Backend Setup (Hardhat + Smart Contract)

### Step 1: Navigate to Project Root
```bash
cd C:\Users\preet\OneDrive\Desktop\EDI-Project
```

### Step 2: Install Backend Dependencies
```bash
npm install
```
This installs Hardhat, Ethers, testing libraries, and other dependencies. Wait for completion.

### Step 3: Configure Environment Variables
1. **Copy the sample environment file:**
   ```bash
   copy env.sample .env
   ```
   (On Linux/Mac: `cp env.sample .env`)

2. **Open `.env` file** in a text editor and fill in:
   ```env
   # For local development, you can leave PRIVATE_KEY empty
   # Only fill it in if you want to deploy to Sepolia testnet
   SEPOLIA_RPC_URL=https://rpc.sepolia.org
   PRIVATE_KEY=
   ETHERSCAN_API_KEY=
   ```
   
   **⚠️ IMPORTANT:** 
   - For local testing: Leave `PRIVATE_KEY=` **empty** (just the equals sign, nothing after it)
   - Do NOT use placeholder text like `0xYOUR_PRIVATE_KEY` - this will cause errors!
   - We'll use Hardhat's local accounts for local development

### Step 4: Compile the Smart Contract
```bash
npm run compile
```
Expected output: `Compiled 1 Solidity file successfully`

### Step 5: Run Tests (Optional but Recommended)
```bash
npm test
```
You should see 4 passing tests:
- ✅ registers a device and stores metadata
- ✅ prevents duplicate registrations
- ✅ allows different owners to reuse device names
- ✅ returns ids per owner and full details

---

## 🌐 PART 2: Deploy Contract (Choose One Option)

### **Option A: Deploy to Local Hardhat Network (Recommended for Testing)**

#### Step 1: Start Local Hardhat Node
Open a **new terminal window** and run:
```bash
cd C:\Users\preet\OneDrive\Desktop\EDI-Project
npm run node
```

This starts a local blockchain. **Keep this terminal open!** You'll see:
- 20 test accounts with 10,000 ETH each
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`

#### Step 2: Deploy Contract (In Another Terminal)
Open a **second terminal** and run:
```bash
cd C:\Users\preet\OneDrive\Desktop\EDI-Project
npm run deploy:local
```

**Copy the deployed address!** Example output:
```
DeviceRegistry deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Save this address** - you'll need it for the frontend!

---

### **Option B: Deploy to Sepolia Testnet (For Real Network Testing)**

#### Step 1: Get Sepolia ETH
1. Visit a Sepolia faucet (e.g., [Alchemy Sepolia Faucet](https://sepoliafaucet.com/))
2. Request test ETH to your wallet address

#### Step 2: Configure `.env` for Sepolia
Edit `.env` and add:
```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_WITHOUT_0x_PREFIX
```

**⚠️ Security Note:** Never share your private key or commit `.env` to Git!

#### Step 3: Deploy to Sepolia
```bash
npm run deploy:sepolia
```

Copy the deployed contract address from the output.

---

## 🎨 PART 3: Frontend Setup (React App)

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```
This installs React, Ethers v6, TailwindCSS, and other UI dependencies.

### Step 3: Configure Frontend Environment
1. **Create `.env` file** in the `frontend` folder:
   ```bash
   cd frontend
   echo REACT_APP_DEVICE_REGISTRY_ADDRESS=0xYOUR_DEPLOYED_ADDRESS > .env
   ```
   
   Or manually create `frontend/.env` with:
   ```env
   REACT_APP_DEVICE_REGISTRY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```
   
   **Replace `0x5FbDB2315678afecb367f032d93F642f64180aa3`** with the actual address from your deployment!

### Step 4: Start the React Development Server
```bash
npm start
```

The browser should automatically open to `http://localhost:3000`. If not, manually navigate to that URL.

---

## 🔌 PART 4: Connect MetaMask

### Step 1: Add Local Network to MetaMask (For Local Testing)

If you deployed to **localhost**, add the network:

1. Open MetaMask extension
2. Click the network dropdown (top left)
3. Click **"Add Network"** → **"Add a network manually"**
4. Fill in:
   - **Network Name:** `Hardhat Local`
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Chain ID:** `31337`
   - **Currency Symbol:** `ETH`
   - **Block Explorer:** (leave empty)
5. Click **"Save"**

### Step 2: Import Test Account (For Local Testing)

1. In MetaMask, click the account icon (top right)
2. Click **"Import Account"**
3. Copy one of the private keys from your Hardhat node terminal (the one showing `Account #0`, `Account #1`, etc.)
4. Paste the private key and click **"Import"**

**⚠️ Only use these accounts for local testing! Never use real private keys.**

### Step 3: Connect Wallet in the App

1. In the React app (`http://localhost:3000`), click **"Connect MetaMask"**
2. MetaMask will pop up asking for permission
3. Click **"Connect"** or **"Next"** → **"Connect"**
4. You should see: **"Connected: 0x1234...5678"** (your address)

---

## ✅ PART 5: Using the Application

### 1. Register a Device
1. In the **"Register Device"** section, type a device name (e.g., "Weather Sensor")
2. You'll see a preview of the Device ID below the input
3. Click **"Register Device"**
4. MetaMask will pop up - click **"Confirm"** to sign the transaction
5. Wait for confirmation (you'll see a success notification)

### 2. Fetch Device by ID
1. Copy a Device ID (from registration or from the list)
2. Paste it into the **"Fetch Device by ID"** input field
3. Click **"Fetch Details"**
4. Device information will appear in the right panel

### 3. View All My Devices
1. Click **"Load My Devices"** button
2. All devices registered by your connected wallet will appear as cards
3. Each card shows: Device ID, Name, Owner, and Registration Timestamp

---

## 🐛 Troubleshooting

### Problem: "Contract address not configured"
**Solution:** Make sure `frontend/.env` exists and has `REACT_APP_DEVICE_REGISTRY_ADDRESS` set correctly.

### Problem: "MetaMask is required"
**Solution:** Install the MetaMask browser extension and refresh the page.

### Problem: "Transaction failed" or "Insufficient funds"
**Solution:** 
- For local: Make sure you imported a Hardhat test account with ETH
- For Sepolia: Get test ETH from a faucet

### Problem: "Device already exists"
**Solution:** Each owner can only register a device with the same name once. Try a different name.

### Problem: Frontend shows "Set REACT_APP_DEVICE_REGISTRY_ADDRESS"
**Solution:** 
1. Create `frontend/.env` file
2. Add: `REACT_APP_DEVICE_REGISTRY_ADDRESS=0xYOUR_ADDRESS`
3. Restart the React dev server (`Ctrl+C` then `npm start`)

### Problem: Hardhat node not responding
**Solution:** 
1. Stop the node (`Ctrl+C`)
2. Restart: `npm run node`
3. Redeploy: `npm run deploy:local`

### Problem: "Invalid account: private key too short, expected 32 bytes"
**Solution:** 
1. Open your `.env` file
2. Make sure `PRIVATE_KEY=` is **empty** (nothing after the equals sign)
3. Do NOT use placeholder text like `0xYOUR_PRIVATE_KEY` or `#0`
4. For local development, you don't need a private key - leave it empty!
5. Save the file and try `npm run compile` again

---

## 📝 Quick Command Reference

### Backend Commands (Root Directory)
```bash
npm install              # Install dependencies
npm run compile          # Compile contracts
npm test                 # Run tests
npm run node             # Start local Hardhat node
npm run deploy:local     # Deploy to localhost
npm run deploy:sepolia   # Deploy to Sepolia
```

### Frontend Commands (frontend/ Directory)
```bash
cd frontend
npm install              # Install dependencies
npm start                # Start dev server (http://localhost:3000)
npm run build            # Build for production
```

---

## 🎯 Next Steps

1. **Test all features:** Register multiple devices, fetch by ID, view your device list
2. **Try different accounts:** Import multiple Hardhat accounts and register devices from different addresses
3. **Deploy to Sepolia:** Once comfortable, deploy to a real testnet
4. **Customize the UI:** Modify Tailwind classes in `frontend/src/components/` to match your brand

---

## 📚 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js v6 Documentation](https://docs.ethers.org/v6/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

---

**Happy Building! 🚀**

