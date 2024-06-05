import Web3 from "web3";
import { CHAINS } from "../config/chains";
import { Fee } from "../config/mintingfee";
import COLLECTIONS from "../config/collections";
import * as ethers from "ethers"

export async function sendONFT(account, collection, srcchain, dstchain, tokenId, nftVersion) {
	try {
		console.log(`Sending token ${tokenId} from ${srcchain} to ${dstchain}.`)
	
		if (account == undefined) return;
		const tokenContractAddress = COLLECTIONS[collection][nftVersion][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][nftVersion][srcchain].abi;
		const remoteChainId = CHAINS[dstchain].chainId;
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
		const adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
		const fees = await tokenContract.methods.estimateSendFee(remoteChainId, account, tokenId, false, adapterParams).call();
		const nativeFee = fees[0];
		const bridgeTransaction = await tokenContract.methods.sendFrom(
			account,	        	        // 'from' address to send tokens
			remoteChainId,                  // remote LayerZero chainId
			account,        	            // 'to' address to send tokens
			tokenId,                        // tokenId to send
			account,		                // refund address (if too much message fee is sent, it gets refunded)
			ethers.ZeroAddress, // is this zeroaddress?
			adapterParams,                  // flexible bytes array to indicate messaging adapter services
		).send({
			from: account,
			value: nativeFee
		});
		const transactionHash = bridgeTransaction.transactionHash;
		return transactionHash;
	} catch (e) {
		console.error("Bridge Error:", e);
	}
	return null;
}

function getTransactionReceiptAsync(transactionHash) {
	return new Promise((resolve, reject) => {
		const checkReceipt = async () => {
			try {
				const web3 = new Web3(window.ethereum);
				const receipt = await web3.eth.getTransactionReceipt(transactionHash);
				if (receipt) {
					resolve(receipt);
				} else {
					setTimeout(checkReceipt, 1000);
				}
			} catch (error) {
				reject(error);
			}
		};
		checkReceipt();
	});
}

// export async function mintONFT(account, collection, srcchain, nftVersion) {
// 	try {
// 		if (account == undefined) return;

// 		const tokenContractAddress = COLLECTIONS[collection][nftVersion][srcchain].contractAddress;
// 		const tokenContractABI = COLLECTIONS[collection][nftVersion][srcchain].abi;

// 		const web3 = new Web3(window.ethereum);
// 		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);

// 		const mintTransaction = await tokenContract.methods.mint().send({
// 			from: account,
// 			value: web3.utils.toWei(Fee[nftVersion][srcchain], 'ether'),
// 		});
// 		const transactionHash = mintTransaction.transactionHash;
// 		// console.log('Transaction Hash:', transactionHash);

// 		// Wait for the transaction receipt
// 		const receipt = await getTransactionReceiptAsync(transactionHash);

// 		let tokenId = null;
// 		if (!receipt) {
// 			console.log('Transaction receipt not found');
// 		}
// 		else {
// 			const foundObject = receipt.logs.find(item => item.data === '0x');
// 			tokenId = web3.utils.hexToNumber(foundObject.topics[3])
// 			// console.log('TokenId:', tokenId)
// 			return { tokenId, transactionHash, srcchain }
// 		}
// 		console.log("Mint ONFT Success");
// 	} catch (e) {
// 		console.error("Mint Error:", e);
// 		return null;
// 	}
// 	return null
// }


export async function mintONFT(account, collection, srcchain, nftVersion) {
	try {
		if (account == undefined) return;

		const tokenContractAddress = COLLECTIONS[collection][nftVersion][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][nftVersion][srcchain].abi;

		// console.log('tokenContractAddress', tokenContractAddress)
		// console.log('tokenContractABI', tokenContractABI)

		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);

		const mintTransaction = await tokenContract.methods.mint().send({
			from: account,
			value: web3.utils.toWei(Fee[nftVersion][srcchain], 'ether'),
		});
		const transactionHash = mintTransaction.transactionHash;
		// console.log('Transaction Hash:', transactionHash);

		// Wait for the transaction receipt
		const receipt = await getTransactionReceiptAsync(transactionHash);

		let tokenId = null;
		if (!receipt) {
			console.log('Transaction receipt not found');
		}
		else {
			const foundObject = receipt.logs.find(item => item.data === '0x');
			tokenId = web3.utils.hexToNumber(foundObject.topics[3])
			// console.log('TokenId:', tokenId)
			return { tokenId, transactionHash, srcchain }
		}
		console.log("Mint ONFT Success");
	} catch (e) {
		console.error("Mint Error:", e);
		return null;
	}
	return null
}



export async function estimateGas2Send(account, collection, srcchain, dstchain, tokenId, nftVersion) {
	try {
		if (account == undefined) return;

		const tokenContractAddress = COLLECTIONS[collection][nftVersion][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][nftVersion][srcchain].abi;
		const remoteChainId = CHAINS[dstchain].chainId;
		const web3 = new Web3(CHAINS[srcchain].url);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
		const adapterParams = [];
		const fees = await tokenContract.methods.estimateSendFee(remoteChainId, account, tokenId, false, adapterParams).call();
		const nativeFee = fees[0];

		console.log("Estimate Send ONFT Fee:", nativeFee);
		return nativeFee;
	} catch (e) {
		console.log("Estimate Send ONFT Error:", e);
		return -1;
	}
}

// async function getTokenId(transactionHash) {
// 	return new Promise((resolve, reject) => {
// 		const checkReceipt = async () => {
// 			try {
// 				const web3 = new Web3(window.ethereum);
// 				const receipt = await web3.eth.getTransactionReceipt(transactionHash);
// 				if (receipt) {
// 					console.log('Receipt: ', receipt)

// 					const foundObject = receipt.logs.find(item => item.data === '0x');

// 					let tokenId = web3.utils.hexToNumber(foundObject.topics[3])
// 					console.log('TokenId:', tokenId)

// 					// return {tokenId, transactionHash, srcchain}

// 					resolve(receipt);
// 				} else {
// 					setTimeout(checkReceipt, 1000);
// 				}
// 			} catch (error) {
// 				reject(error);
// 				// reject({ status: false, message: 'Transaction hash not found.' });
// 			}
// 		};
// 		checkReceipt();
// 	});
// }

// async function getTokenId(transactionHash) {
// 	try {
// 		const web3 = new Web3(window.ethereum);
// 		const receipt = await web3.eth.getTransactionReceipt(transactionHash);
// 		if (receipt) {
// 			const foundObject = receipt.logs.find(item => item.data === '0x');
// 			if (foundObject) {
// 				const tokenId = web3.utils.hexToNumber(foundObject.topics[3]);
// 				return tokenId;
// 			} else {
// 				throw new Error('TokenId not found in the transaction receipt logs.');
// 			}
// 		} else {
// 			throw new Error('Transaction receipt not found.');
// 		}
// 	} catch (error) {
// 		throw error;
// 	}
// }

async function checkIsTokenOwner(account, collection, chain, tokenId, nftVersion) {
	try {
		if (account == undefined) return;
		const tokenContractAddress = COLLECTIONS[collection][nftVersion][chain].contractAddress;
		// console.log('tokenContractAddress', tokenContractAddress)
		const tokenContractABI = COLLECTIONS[collection][nftVersion][chain].abi;
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

		const result = await tokenContract.methods.isTokenOwner(tokenContractAddress, tokenId, account).send({
	        from: account
		});
		return result;
	} catch (e) {
		console.log("Token owner checking error:", e);
		return false;
	}
}

export async function getTxDetail(transactionHash, chain, address, collection, nftVersion) {
    try {
        const web3 = new Web3(window.ethereum);
		const contractAddress = COLLECTIONS[collection][nftVersion][chain].contractAddress;

        const checkReceipt = async (hash) => {
            const receipt = await web3.eth.getTransactionReceipt(hash);
            if (receipt) {
				const foundObject = receipt.logs.find(item => item.data === '0x');
				const tokenId = web3.utils.hexToNumber(foundObject.topics[3])
				let customResult = null;
				if(nftVersion=='v1'){
					customResult = {
						status: true,
						validateWallet: receipt.from.toLowerCase() == address.toLowerCase() ,
						validateContract: receipt.to.toLowerCase() == contractAddress.toLowerCase() ,
						tokenId: tokenId,
						transactionHash: transactionHash,
						srcchain: chain
					};
				}
				else {
					const checkOwner = await checkIsTokenOwner(address, collection, chain, tokenId, nftVersion);
					customResult = {
						status: true,
						validateWallet: checkOwner,
						validateContract: checkOwner,
						tokenId: tokenId,
						transactionHash: transactionHash,
						srcchain: chain
					};
				}
                return customResult;
            } else {
                return new Promise((resolve) => {
                    setTimeout(async () => {
                        const result = await checkReceipt(hash);
                        resolve(result);
                    }, 1000);
                });
            }
        };
        return await checkReceipt(transactionHash);
    }
	catch (error) {
        throw error;
    }
}

export async function getReBridgeTxDetail(transactionHash, chain, address, collection, nftVersion) {
    try {
		const reLayerContracts = {
			"linea": "0xa658742d33ebd2ce2f0bdff73515aa797fd161d9",
			"mantle": "0xcb566e3B6934Fa77258d68ea18E931fa75e1aaAa",
			"polygon": "0x75dc8e5f50c8221a82ca6af64af811caa983b65f",
			"base": "0xcb566e3b6934fa77258d68ea18e931fa75e1aaaa",
			"optimism": "0x81e792e5a9003cc1c8bf5569a00f34b65d75b017",
			"bsc": "0xA27A2cA24DD28Ce14Fb5f5844b59851F03DCf182",
			"polygon-zkevm": "0xa658742d33ebd2ce2f0bdff73515aa797fd161d9"
		}

        const web3 = new Web3(window.ethereum);
		const contractAddress = reLayerContracts[chain]
        
		const checkReceipt = async (hash) => {
            const receipt = await web3.eth.getTransactionReceipt(hash);
            if (receipt) {
				const foundObject = receipt.logs.find(item => item.data === '0x');
				const tokenId = web3.utils.hexToNumber(foundObject.topics[3])

				let customResult = null;
				if(nftVersion=='v1'){
					customResult = {
						status: true,
						validateWallet: receipt.from.toLowerCase() =="0xe93685f3bba03016f02bd1828badd6195988d950".toLowerCase() ,
						validateContract: receipt.to.toLowerCase() ==contractAddress.toLowerCase() ,
						tokenId: tokenId,
						transactionHash: transactionHash,
						srcchain: chain
					};
				}
				else {
					const checkOwner = await checkIsTokenOwner(address, collection, chain, tokenId, nftVersion);
					customResult = {
						status: true,
						validateWallet: checkOwner,
						validateContract: checkOwner,
						tokenId: tokenId,
						transactionHash: transactionHash,
						srcchain: chain
					};
				}

                return customResult;
            } else {
                return new Promise((resolve) => {
                    setTimeout(async () => {
                        const result = await checkReceipt(hash);
                        resolve(result);
                    }, 1000);
                });
            }
        };
        return await checkReceipt(transactionHash);
    } catch (error) {
        throw error;
    }
}