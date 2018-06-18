import Web3 from "web3";

let web3;
let isConnected = false;

function connectToNode() {

  const nodeIP = "http://137.117.247.14:3311";
  web3 = new Web3(nodeIP);

  web3.eth.net.isListening()
    .then(() => {
      console.log("Successfully connected to node running on: ", nodeIP);
      isConnected = true;
    })
    .catch((err) => {
      console.error("Failed to connect to node running on: ", nodeIP, "\n", err);
    });

  //let subscription = web.eth.subscribe(); //might be useful for error handling and such
}

function sendTransaction(transaction, callback) {

  if (!isConnected) {
    console.log("Not connected to node!");
    callback({
      "err": "Not connected to node"
    });
    return;
  }

  web3.eth.net.isListening()
    .then(() => {
      web3.eth.sendTransaction({
        "from": transaction.to,
        "to": transaction.from,
        "gas": 100000,
        "data": web3.utils.toHex(JSON.stringify(transaction.data))
      }, (err, hash) => {
        callback(err)
      });
    })
    .catch((err) => {
      console.error("Error while sending Transaction: ", "\n", err);
    });
}

async function getTransaction(transHash) {
    try {
        await web3.eth.net.isListening();
        return await web3.eth.getTransaction(transHash);
    }
    catch(err) {
        console.error("Error while getting Transaction: ", "\n", err);
    }
}

//TODO: Testing on real blockchain transactions
async function getAllTransactions(headTxHash) {
    let transactions = [];
    let currentHash = headTxHash;
    try {
        let currentTransaction = await getTransaction(lastTransactionHash);
        while (currentTransaction.payload.pretransaction !== null){
            currentHash = currentTransaction.payload.pretransaction;
            currentTransaction = await getTransaction(currentHash);
            transactions.add = currentTransaction;
        }
    }
    catch(err){
        console.log("Error while getting transactions", err);
    }
    return transactions;
}

function createUserAccount() {

  if (!isConnected) {
    console.log("Not connected to node!");
    return;
  }

  const userObj = web3.eth.accounts.create();

  return {
    "privateKey": userObj.privateKey,
    "publicKey": userObj.address
  };
}

function createCarAccount() {

  if (!isConnected) {
    console.log("Not connected to node!");
    return;
  }

  const carObj = web3.eth.accounts.create();

  return carObj.address;
}


module.exports = {
  "connectToNode": connectToNode,
    "createUserAccount": createUserAccount,
    "createCarAccount": createCarAccount,
    "sendTransaction": sendTransaction,
    "getAllTransactions" : getAllTransactions
};
