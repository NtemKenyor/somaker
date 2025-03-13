function getUrlParam(url, paramName) {
    // Get all parameters using the previous function
    let params = getAllUrlParams(url);

    // Return the value of the specified parameter
    return params[paramName] || null;
}


var MAINNET_RPC_ENDPOINTS = [
    'https://rpc.mainnet-alpha.sonic.game',
    'https://api.mainnet-alpha.sonic.game', // Primary
    'https://sonic.helius-rpc.com/', // Backup 1
    // 'https://ssc-dao.genesysgo.net', // Backup 2
];


// Updated network setup function
/* async function setupNetworkbyUrl(network) {
    if (network === "main" || network === "mainnet") {
        window.NODE_URL = "https://roynek.com/veilmatch/backend";
        window.PHP_URL = "https://roynek.com/cloudS/interact/server";
        // Use the first available Mainnet RPC endpoint
        const rpcUrl = await getAvailableRpcEndpoint(MAINNET_RPC_ENDPOINTS);
        window.connection = await new solanaWeb3.Connection(rpcUrl, 'confirmed');
        console.log(`Connected to Mainnet RPC: ${rpcUrl}`);
    } else if (network === "dev" || network === "devnet") {
        window.NODE_URL = "https://roynek.com/veilmatch/backend";
        window.PHP_URL = "https://roynek.com/cloudS/interact/server";
        window.connection = new solanaWeb3.Connection('https://spring-quick-surf.solana-devnet.quiknode.pro/016ff48f0f7c3f1520e515c01dca9a83ef528317', 'confirmed');
    } else if (network === "local" || network === "localnet") {
        window.NODE_URL = "http://localhost:3000/veilmatch/backend";
        window.PHP_URL = "http://localhost/cloudS/interact/server";
        window.connection = new solanaWeb3.Connection('http://127.0.0.1:8899', 'confirmed');
    } else {
        throw new Error('Invalid network specified');
    }
}
 */

async function BuildNetwork(network) {
    if (network === "main" || network === "mainnet") {
        window.NODE_URL = "https://roynek.com/veilmatch/backend";
        window.PHP_URL = "https://roynek.com/cloudS/interact/server";
        // Use the first available Mainnet RPC endpoint
        // const rpcUrl = await getAvailableRpcEndpoint(MAINNET_RPC_ENDPOINTS[0]);
        console.log(`Connected to Mainnet RPC: ${MAINNET_RPC_ENDPOINTS[0]}`);

        return await new solanaWeb3.Connection(MAINNET_RPC_ENDPOINTS[0], 'confirmed');
    } else if (network === "dev" || network === "devnet") {
        window.NODE_URL = "https://roynek.com/veilmatch/backend";
        window.PHP_URL = "https://roynek.com/cloudS/interact/server";
       return new solanaWeb3.Connection('https://spring-quick-surf.solana-devnet.quiknode.pro/016ff48f0f7c3f1520e515c01dca9a83ef528317', 'confirmed');
    } else if (network === "local" || network === "localnet") {
        window.NODE_URL = "http://localhost:3000/veilmatch/backend";
        window.PHP_URL = "http://localhost/cloudS/interact/server";
        return new solanaWeb3.Connection('http://127.0.0.1:8899', 'confirmed');
    } else {
        throw new Error('Invalid network specified');
    }
}


async function loadStoredWallet() {
    const privateKey = localStorage.getItem('solana_private_key');
    // const accountIcon = document.getElementById('accountIcon');
    // const profilePopup = document.getElementById('profilePopup');
    const solanaAddress = document.getElementById('solanaAddress');
    // const balanceElement = document.getElementById('balance');

    if (privateKey) {
        try {
            keypair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
            await displayWalletInfo();
            // accountIcon.style.display = 'block';  
            // profilePopup.style.display = 'block';  // Show profile popup
            solanaAddress.textContent = keypair.publicKey.toBase58(); // Display address
            await getBalance(); // Fetch and display balance
        } catch (error) {
            console.error("Error loading wallet:", error);
            alert("Invalid wallet data. Redirecting...");
            window.location.href = "index.html"; // Redirect to index.html
        }
    } else {
        alert("No wallet found. Please create or connect a new wallet.");
        window.location.href = "index.html"; // Redirect to index.html
    }
}

// Fetch wallet balance
async function getBalance() {
    if (!keypair) {
        alert('No wallet found. Create or load a wallet first.');
        return;
    }
    try {
        const balance = await window.connection.getBalance(keypair.publicKey);
        const formattedBalance = (Math.floor((balance / solanaWeb3.LAMPORTS_PER_SOL) * 100) / 100) + ' SOL';
        document.getElementById('balance').textContent = 'Balance: ' + formattedBalance;
    } catch (error) {
        console.error("Error fetching balance:", error);
        document.getElementById('balance').textContent = 'Balance: Error';
    }
}



/* async function loadStoredWallet() {
    const privateKey = localStorage.getItem('solana_private_key');
    const accountIcon = document.getElementById('accountIcon');
    const postBtn = document.getElementById("createPostBtn");

    if (privateKey) {
        keypair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
        await displayWalletInfo();
        accountIcon.style.display = 'block';  // Show the icon if the wallet is loaded
        postBtn.style.display = 'block';
    } else {
        accountIcon.style.display = 'none';  // Hide the icon if no wallet is found
        createAccountBtn.style.display = 'block';
        document.getElementById("profilepopup").style.display = "none";
        // alert('No wallet found. Please create a new wallet.');
    }
}


// Download private key as a JSON file
function downloadPrivateKey() {
    if (!keypair) {
        alert('No wallet found. Create or load a wallet first.');
        return;
    }
    const privateKey = JSON.stringify(Array.from(keypair.secretKey));
    const blob = new Blob([privateKey], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'solana_private_key.json';
    link.click();
}

// Load private key from uploaded file
function loadPrivateKeyFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const privateKeyArray = JSON.parse(e.target.result);
        keypair = solanaWeb3.Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
        // displayWalletInfo();

        // loading up everything.
        localStorage.setItem('solana_private_key', JSON.stringify(Array.from(keypair.secretKey)));
        // displayWalletInfo();
        closeWalletModal();
        location.reload();
        alert('Wallet loaded successfully!');
        
    };
    reader.readAsText(file);

    
}



async function redirectToPageWithData(pageUrl, publicKey) {
    const urlWithParams = `${pageUrl}?public_key=${encodeURIComponent(publicKey)}`; // Add data to URL
    window.location.href = urlWithParams; // Redirect to new URL
}

async function userRedirect(pageUrl) {
    if (!keypair) {
        showToast('No wallet found. Create or load a wallet first.');
        return;
    }
    redirectToPageWithData(pageUrl, keypair.publicKey);
}

async function getPublicKeyFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('public_key'); // Get the 'public_key' parameter
} 

async function getAccountDetails() {
    if (!keypair) {
        alert('No wallet found. Create or load a wallet first.');
        return;
    }

    try {
        // Get balance in SOL
        const balanceLamports = await window.connection.getBalance(keypair.publicKey);
        const balanceSOL = balanceLamports / solanaWeb3.LAMPORTS_PER_SOL;

        // Get account info
        const accountInfo = await window.connection.getAccountInfo(keypair.publicKey);

        if (accountInfo) {
            // Displaying the balance and account info
            document.getElementById('balance').textContent = balanceSOL + ' SOL';
            document.getElementById('owner').textContent = accountInfo.owner.toBase58(); // Account owner
            document.getElementById('lamports').textContent = accountInfo.lamports; // Balance in lamports
            document.getElementById('executable').textContent = accountInfo.executable ? 'Yes' : 'No'; // Is the account executable
            document.getElementById('rentEpoch').textContent = accountInfo.rentEpoch; // Rent epoch
            document.getElementById('accountData').textContent = accountInfo.data.length > 0
                ? new TextDecoder().decode(accountInfo.data) // Decoded account data, if any
                : "No data";
        } else {
            alert("Account not found or has no associated data.");
        }
    } catch (error) {
        console.error("Failed to fetch account details:", error);
        alert("An error occurred while fetching account details. Please try again.");
    }
}

async function getAccountDetailsPublic() {
    // if (!keypair) {
    //     alert('No wallet found. Create or load a wallet first.');
    //     return;
    // }
    let publicKey = getPublicKeyFromUrl();

    try {
        // Get balance in SOL
        // const balanceLamports = await window.connection.getBalance(publicKey);
        // const balanceSOL = balanceLamports / solanaWeb3.LAMPORTS_PER_SOL;

        // Get account info
        const accountInfo = await window.connection.getAccountInfo(publicKey);

        if (accountInfo) {
            // Displaying the balance and account info
            return accountInfo;
            
        } else {
            console.log("Account not found or has no associated data.");
            return None;
        }
    } catch (error) {
        console.error("Failed to fetch account details:", error);
        alert("An error occurred while fetching account details. Please try again.");
        return None;
    }
}

async function displayAccountDetials(){
    accountInfo = getAccountDetailsPublic();
    if(accountInfo){
        document.getElementById('balance').textContent = balanceSOL + ' SOL';
        document.getElementById('owner').textContent = accountInfo.owner.toBase58(); // Account owner
        document.getElementById('lamports').textContent = accountInfo.lamports; // Balance in lamports
        document.getElementById('executable').textContent = accountInfo.executable ? 'Yes' : 'No'; // Is the account executable
        document.getElementById('rentEpoch').textContent = accountInfo.rentEpoch; // Rent epoch
        document.getElementById('accountData').textContent = accountInfo.data.length > 0
            ? new TextDecoder().decode(accountInfo.data) // Decoded account data, if any
            : "No data";
    }else{
        showToast("We are having some errors with displaying the account information.");
    }
    
}
*/


var url = window.location.href;
var network = getUrlParam(url, 'network');



document.addEventListener("DOMContentLoaded", async () => {
    if(network == "" || network == null){
        
        network = "mainnet";
        console.log("Setting netork to Sonic: "+ network);
    }

    window.connection = await BuildNetwork(network);
    // await setupNetwork(network);  // Ensure connection is established before loading the wallet
    
    await loadStoredWallet();
    // loadPosts();
});