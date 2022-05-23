const Web3 = require("web3");
const express = require('express');
const cors = require('cors');

const web3 = new Web3(new 
Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/516b7a66a007457e971d23d9038ada18" ));

const privateKey = process.env.ETH_PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(account);
const address =account.address;
console.log("address", address)
const SC_ADDRESS = '0x43111D3fDB8fD5933Deb52d698B8C0C1bA93a17B';
const SC_ABI =  [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "supply",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "authorizer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            }
        ],
        "name": "AuthorizationUsed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "EIP712_DOMAIN_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "authorizer",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            }
        ],
        "name": "authorizationState",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validAfter",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validBefore",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "checkTransferWithAuthorization",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "hash1",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "recoveredAdd",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "R",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "S",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "V",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "nonces",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validAfter",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validBefore",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "receiveWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validAfter",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "validBefore",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "nonce",
                "type": "bytes32"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "transferWithAuthorization",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "version",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    }
]
var key = new Buffer.from(privateKey, 'hex')
var Contract = new web3.eth.Contract(SC_ABI,SC_ADDRESS )
var txCounter = 67;
const app = express();
app.use(express.json());
app.use(
    cors({
    origin:"*",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
      credentials: true,
    })
  );
  
// routes
app.get(
    '/api/healthcheck', 
    async (req, res) => {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            maintenance: MAINTENANCE,
            updateTradus: UPDATE_TRADUS,
        };
        try {
            return res.status(200).json(healthcheck);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
);
app.post(
    '/api/transaction', 
    async (req, res) => {
        try {
            const gasPrice = await web3.eth.getGasPrice();
            const gasPriceHex = web3.utils.toHex(gasPrice);
            var block = await web3.eth.getBlock("latest");
            console.log("gasLimit: " + block.gasLimit);
            const gasLimitHex =web3.utils.toHex(block.gasLimit);            
            let userNonce = await web3.eth.getTransactionCount(address)
            const dataEncoded = Contract.methods.transfer("0xDeCD84708c75258F8D491A324077fFd846C1884c",1).encodeABI();
            var tra = {
                nonce: userNonce,
                gasPrice: gasPriceHex,
                gasLimit: gasLimitHex,
                data: dataEncoded,
                to: SC_ADDRESS,
                from: address,
                chainId: 3
            };
            console.log(tra);            
            const signedTx =  await web3.eth.accounts.signTransaction(tra, privateKey);
            console.log(signedTx)
        
             await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
                if (err) { console.log(err); return; }
                console.log('txHash: ' + hash);
                return res.status(200).json({ hash });

            });
            

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
);
app.post(
    '/api/transfer_with_authorization', 
    async (req, res) => {
        try {
            let { from, to, value, validAfter, validBefore, nonce, r, s, v } = req.body;
            console.log(req.body)
            let gasPrice = (await web3.eth.getGasPrice()*2);
            console.log(gasPrice)

            if(gasPrice > 80722523716){
                gasPrice = 80722523716;
            }
            // gasPrice = 93905661020
            const gasPriceHex = web3.utils.toHex(gasPrice);
            
            var block = await web3.eth.getBlock("latest");
            console.log("gasLimit: " + block.gasLimit);
            const gasLimitHex =web3.utils.toHex(block.gasLimit);
            let userNonce = await web3.eth.getTransactionCount(address);
            console.log(txCounter)
            console.log(userNonce)
            if(userNonce < txCounter){
                userNonce = txCounter;
            }else{
                txCounter = userNonce;
            }
             const dataEncoded = Contract.methods.transferWithAuthorization(from, to, value, validAfter, validBefore, nonce, v, r, s).encodeABI();
            console.log("data encoded",dataEncoded);
            const gasEstimated = await Contract.methods.transferWithAuthorization(
                from, to, value, validAfter, validBefore, nonce, v, r, s
                ).estimateGas({from: address, gas: gasLimitHex});
                console.log("GAS estimated",gasEstimated);
            var tra = {
                nonce: userNonce,
                gas: gasEstimated,
                gasPrice: gasPriceHex,
                gasLimit: gasLimitHex,
                data: dataEncoded,
                to: SC_ADDRESS,
                from: address,
                chainId: 3
            };
                 
            console.log(tra)
            const signedTx =  await web3.eth.accounts.signTransaction(tra, privateKey);
            console.log("Signedtx",signedTx)
        
             await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
                if (err) { console.log(err); return; }
                console.log('txHash: ' + hash);
                txCounter += 1;
                console.log('txCounter: ' + txCounter);
                return res.status(200).json({ hash });

            });
            

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
);
app.post(
    '/api/receive_with_authorization', 
    async (req, res) => {
        try {
            let { from, to, value, validAfter, validBefore, nonce, r, s, v } = req.body;
            console.log(req.body)
            const gasPrice = await web3.eth.getGasPrice();
            console.log(gasPrice)
            const gasPriceHex = web3.utils.toHex(gasPrice);
            var block = await web3.eth.getBlock("latest");
            console.log("gasLimit: " + block.gasLimit);
            const gasLimitHex =web3.utils.toHex(block.gasLimit);
            console.log(txCounter)
            let userNonce = await web3.eth.getTransactionCount(address)
            console.log(userNonce)
            if(userNonce < txCounter){
                userNonce = txCounter;
            }else{
                txCounter = userNonce;
            }
            const dataEncoded = Contract.methods.receiveWithAuthorization(from, to, value, validAfter, validBefore, nonce, v, r, s).encodeABI();
            console.log("data encoded",dataEncoded);
            var tra = {
                nonce: userNonce,
                gas: 5000000,
                data: dataEncoded,
                to: SC_ADDRESS,
                from: address,
                chainId: 3
            };
                 
            console.log(tra)
            const signedTx =  await web3.eth.accounts.signTransaction(tra, privateKey);
            console.log("Signedtx",signedTx)
        
             await web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
                if (err) { console.log(err); return; }
                console.log('txHash: ' + hash);
                txCounter += 1;
                return res.status(200).json({ hash });

            });
            

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
);
// Init the server and listen to the port 4000
app.set('port', 4000);
app.listen(app.get('port'), () => {
    console.log('Server on port ' + `${app.get('port')}`);
});