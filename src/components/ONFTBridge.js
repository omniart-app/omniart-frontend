import React, { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { mintONFT, sendONFT, getTxDetail, getReBridgeTxDetail} from "../web3/module";
import Web3 from "web3";
import { useDispatch } from 'react-redux';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { fetchAuthUser } from '../store/reducers/authSlice';
import SkeletonView from './helpercomponents/SkeletonView';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useWalletClient } from "wagmi";
import { useTimer } from 'react-timer-hook';

import "./style/signinmodal.css"
import { polygon } from 'wagmi/chains'
import TimeCounter from './helpercomponents/TimeCounter';

const ONFTBridge = () => {
  const { data: walletClient } = useWalletClient({
    chainId: polygon.id,
  })

  const MySwal = withReactContent(Swal)
  const signInModalReference = useRef(null);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)

  const dispatch = useDispatch()

  const { openConnectModal } = useConnectModal();

  const [key, setKey] = useState(1)
  const [brdigeMode, setBridgeMode] = useState('single');

  const [mintStarted, setMintStarted] = useState(false);
  const [mintCompleted, setMintCompleted] = useState(false);
  const [bridgStarted, setBridgeStarted] = useState(false);

  const [currentChain, setCurrentChain] = useState(null);
  
  const { isConnected, address } = useAccount();

  const [walletSelectedChain, setWalletSelectedChain] = useState(null)

  const [destinationChainoptions, setDestinationChainoptions] = useState([])

  const [selectedSourceChain, setSelectedSourceChain] = useState(null)
  const [selectedDestinationChain, setSelectedDestinationChain] = useState(null)
  const [selectedDestinationChains, setSelectedDestinationChains] = useState([])

  const [resumeBridgeTxHash, setResumeBridgeTxHash] = useState('')
  const [resumeBridgeTxHashVerified, setResumeBridgeTxHashVerified] = useState(null)
  const [resumeBridgeTxHashVerificatioRunning, setResumeBridgeTxHashVerificatioRunning] = useState(false)

  const [recentlyMintedTokenIds, setRecentlyMintedTokenIds] = useState([])

  const [layerZeroScannerLinks, setLayerZeroScannerLinks] = useState([])

  const selectSourceChainRef = useRef(null);
  const selectDestinationRef = useRef(null);

  const [isNftDetailsLoaded, setIsNftDetailsLoaded] = useState(false)
  const [nftDetails, setNftDetails] = useState(null)
  const [sourceChainOptions, setSourceChainOptions] = useState([])

  const [allNftVersions, setAllNftVersions] = useState([])
  const [mintingCount, setMintingCount] = useState(0)
  
  const getMintingCount = () => {
    axios.get(`https://api.omniart.app/api/minting-count/${nftDetails.version}`)
    .then((result) => {
      setMintingCount(result.data)
    }).catch((err) => {
      
    });
  }

  

  // const [time, setTime] = useState(null);
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 600000); // 10 minutes time

  // const time = 'Sun Sep 24 2023 20:16:56 GMT+0530 (India Standard Time)'

  function mysqlDatetimeToReadable(mysqlDatetime) {
    const targetDateTime = new Date(mysqlDatetime);
    const now = new Date();

    const timeDifference = targetDateTime - now;
    const minutesRemaining = Math.floor(timeDifference / (1000 * 60));    
    now.setMinutes(now.getMinutes() + minutesRemaining);
    return now
  }


  useEffect(()=>{
    if(nftDetails && nftDetails.version){
      getMintingCount()
      const intervalId = setInterval(getMintingCount, 10000);
      return () => clearInterval(intervalId);
    }
  },[nftDetails])

  useEffect(()=>{
    // setRecentlyMintedTokenIds([2800001])
    // setMintStarted(true)
    // setMintCompleted(true)
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        console.log('account change....')
      })

      if(!isConnected){
        localStorage.clear()
        setTimeout(()=>{
          dispatch(fetchAuthUser({address: null, ref_by: null}))
        },500)
      }
      else {
        console.log('wallet connected')
      }
    }
  },[isConnected])

  const getChainName = (chain) => {
    // console.log(chain)
    let temp = sourceChainOptions.find((ch)=>{
      return ch.value == chain
    })
    // console.log('temp', temp)
    return temp.label
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  const IconOption = ({ innerProps, label, data }) => (
    <div {...innerProps}>
      <img src={data.icon} alt={`${label} icon`} width="24" height="24" style={{ marginRight: 10 }} />
      {label}
    </div>
  );
  
  const login = async () => {
    // if (window.ethereum) {
    //   console.log(window.ethereum)
    //   return window.ethereum;
    // }
    // if (window.web3 && window.web3.currentProvider) {
    //   console.log(window.web3.currentProvider)
    //   return window.web3.currentProvider;
    // }

    // if (typeof window.ethereum !== 'undefined') {
    //   try {
    //     const web3 = new Web3(window.ethereum);

    //     await window.ethereum.enable();
    //     const accounts = await web3.eth.getAccounts();
    //     const userAddress = accounts[0];

    //     const signature = await web3.eth.personal.sign(`Login to our app as ${userAddress}`, userAddress, '')
    //     const recoveredAddress = web3.eth.accounts.recover(`Login to our app as ${userAddress}`, signature);
    //     const ref_by = queryParams.get('ref_by');

    //     const response = await axios.post('https://api.omniart.app/api/web3/login', {
    //       ref_by: ref_by,
    //       signature: signature,
    //       message: `Login to our app as ${userAddress}`,
    //       recoveredAddress: recoveredAddress
    //     });

    //     const data = response.data;
    //     localStorage.setItem('auth_token', data.token);
    //     dispatch(fetchAuthUser({address: null, ref_by: null}))
    //     // closeModal()
    //     window.location.reload();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    // }
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum;
    
      // Request permission to access the user's Ethereum accounts
      ethereum.request({ method: 'eth_requestAccounts' })
        .then(async (accounts) => {
          const address = accounts[0]; // The user's Ethereum address
    
          // The message you want to sign
          const message = `Login to our app as ${address}`;
    
          try {
            // Sign the message
            const signature = await ethereum.request({
              method: 'personal_sign',
              params: [message, address],
            });
    
            // console.log('Signature:', signature);

            const ref_by = queryParams.get('ref_by');

            const response = await axios.post('https://api.omniart.app/api/web3/login', {
              ref_by: ref_by,
              signature: signature,
              message: `Login to our app as ${address}`,
              recoveredAddress: address
            });

            const data = response.data;
            localStorage.setItem('auth_token', data.token);
            dispatch(fetchAuthUser({ address: null, ref_by: null }))
            // closeModal()
            window.location.reload();

          } catch (error) {
            console.error('Error signing message:', error);
          }
        })
        .catch((error) => {
          console.error('Error requesting accounts:', error);
        });
    } else {
        // console.error('MetaMask is not installed or not connected.');
        
        if(walletClient){
          const add = walletClient.account.address;
      
          let result = '0x';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
          for (let i = 0; i < 126; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
          }
  
          const ref_by = queryParams.get('ref_by');
          const response = await axios.post('https://api.omniart.app/api/web3/login', {
            ref_by: ref_by,
            signature: result,
            message: `Login to our app as ${add}`,
            recoveredAddress: add
          });
  
          const data = response.data;
          localStorage.setItem('auth_token', data.token);
          dispatch(fetchAuthUser({ add: null, ref_by: null }))
          window.location.reload();
        }
        
    }
    
  }
  
  useEffect(() => {
    // setSourceChainOptions(sourceChainOptions1)
    const fetchInitialNft = async () => {
      try {
        let data = null;
        // if (localStorage.getItem('version') !== null) {
        //   data = {version: localStorage.getItem('version')}
        // }

        axios.post('https://api.omniart.app/api/loadNftDetails', data)
        .then((result) => {
          // const newArray = ;        
          setSourceChainOptions([...result.data.nft_detail.chain_options])
          setNftDetails(result.data.nft_detail)
          setAllNftVersions([...result.data.all_active_nfts])
          setIsNftDetailsLoaded(true)
          // setTimeout(()=>{
          //   const web3 = new Web3(window.ethereum);
          //   web3.eth.getChainId()
          //   .then(chainId => {
          //     const selectedNetwork = result.data.nft_detail.chain_options.find((ch)=>{
          //       return ch.id == chainId
          //     });
          
          //     let tempOptions = result.data.nft_detail.chain_options.filter((ch)=>{
          //       return ch.value != selectedNetwork.value
          //     })
          //     const filteredChains = tempOptions.filter(chain => selectedNetwork.supported_destination_chains.includes(chain.value));

          //     setDestinationChainoptions([...filteredChains])
          //     setDefaultSelectedChain(false, selectedNetwork, filteredChains)

          //   });
          // },1000)
          if(!address){
            openConnectModal()
            return;
          }
        }).catch((err) => {
          console.log(err)
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchInitialNft();

    const initializeWeb3 = async () => {
      if (window.ethereum) {
        // const web3 = new Web3(window.ethereum);

        try {
          // Request account access if needed
          // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get initial network ID
          // const networkId = await web3.eth.net.getId();
          // console.log('Previous networkId', networkId)
          // setCurrentNetwork(networkId);

          // Listen for network changes
          window.ethereum.on('chainChanged', (newNetworkId) => {
            const ch = sourceChainOptions.find((chain)=>{
              return chain.id == newNetworkId
            })
            setWalletSelectedChain(ch)
            setKey(key+1)
            // window.location.reload()
            toast.success('Successfully switch the chain!', {
              id: 'success',
              style: {
                borderRadius: '5px',
                background: '#222',
                color: '#fff',
              },
            })

          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Web3 provider not found');
      }
    };

    initializeWeb3();

    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);

      // Get current chain ID
      web3.eth.getChainId()
      .then(chainId => {
        setCurrentChain(chainId)
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    web3.eth.getChainId()
      .then(chainId => {
        // if(nftDetails){
        //   console.log(nftDetails.version)
        // }
        configInitialChainSetup(chainId)
      })
      .catch(error => {
        console.error('Error b:', error);
      });

    if(isConnected){
      const ref_by = queryParams.get('ref_by');
      const requestData = {
        address: address,
        ref_by: ref_by
      }
      const authToken = localStorage.getItem('auth_token');
      if(authToken){
        axios
        .post('https://api.omniart.app/api/self', requestData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then(response => {
          if(!response.data.status){
            openModal()
            setShowSignInModal(true)
          }
          else {
            dispatch(fetchAuthUser({address, ref_by}))
          }
        })
        .catch(error => {
          // Handle errors
          if (error.response && error.response.status === 401) {
            // Handle the 401 error for this specific request
            console.log('Unauthorized request. Redirecting to login...');
            openModal()
            setShowSignInModal(true)
          } else {
            console.error('An error occurred:', error);
          }
        });
      }
      else {
        openModal()
        setShowSignInModal(true)
      }

    }
  }, [address, isNftDetailsLoaded])

  const loadNextNft = () => {
    setIsNftDetailsLoaded(false)

    resetApp()

    const currentIndex = allNftVersions.indexOf(nftDetails.version);
    if (currentIndex === -1) {
      return null;
    }
    const nextIndex = (currentIndex + 1) % allNftVersions.length;
    const nextElement = allNftVersions[nextIndex];

      axios.post('https://api.omniart.app/api/loadNftDetails', {version: nextElement})
      .then((result) => {
        localStorage.setItem('version', nextElement);
        setSourceChainOptions([...result.data.nft_detail.chain_options])
        setNftDetails(result.data.nft_detail)
        setAllNftVersions([...result.data.all_active_nfts])
        if(result.data.nft_detail.version=='v1'){
          if(![10n,5000n,1101n,137n,324n,56n,8453n,59144n].includes(currentChain)){
            handleSelectSourceChange({id: 137, label : 'Polygon', value : 'polygon', icon: './assets/img/chain/Polygon.png', backgroundColor: '#8247E5', supported_destination_chains: ['optimism', 'bsc', 'base', 'polygon-zkevm', 'linea', 'mantle']})
          }
        }
        setTimeout(()=>{
          setIsNftDetailsLoaded(true)
        }, 1000)
      }).catch((err) => {
        
      });
  }

  const loadPreviousNft = () => {
    setIsNftDetailsLoaded(false)

    resetApp()
    const currentIndex = allNftVersions.indexOf(nftDetails.version);
    if (currentIndex === -1) {
      return null;
    }
    let prevIndex = (currentIndex - 1) % allNftVersions.length;
    if(prevIndex<0){
      prevIndex = allNftVersions.length-1;
    }
    const prevElement = allNftVersions[prevIndex];
    console.log(prevIndex)

    axios.post('https://api.omniart.app/api/loadNftDetails', {version: prevElement})
    .then((result) => {
      localStorage.setItem('version', prevElement);
      setSourceChainOptions([...result.data.nft_detail.chain_options])
      setNftDetails(result.data.nft_detail)
      setAllNftVersions([...result.data.all_active_nfts])
      if(result.data.nft_detail.version=='v1'){
        if(![10n,5000n,1101n,137n,324n,56n,8453n,59144n].includes(currentChain)){
          handleSelectSourceChange({id: 137, label : 'Polygon', value : 'polygon', icon: './assets/img/chain/Polygon.png', backgroundColor: '#8247E5', supported_destination_chains: ['optimism', 'bsc', 'base', 'polygon-zkevm', 'linea', 'mantle']})
        }
      }
      setTimeout(()=>{
        setIsNftDetailsLoaded(true)
      }, 1000)
    }).catch((err) => {
      
    });
  }

  const toogleDestinationChain = (chain) => {
    if(brdigeMode==='turbo'){
      if(mintCompleted){
        if(selectedDestinationChains.length>=recentlyMintedTokenIds.length){
          toast.error(`You have already selected ${recentlyMintedTokenIds.length} chains.`, {
            id: 'error',
            style: {
              borderRadius: '5px',
              background: '#222',
              color: '#fff',
            },
          })
          return;
        }
      }
      if (selectedDestinationChains.includes(chain)) {
        setSelectedDestinationChains(selectedDestinationChains.filter(item => item !== chain));
      } else {
        setSelectedDestinationChains([...selectedDestinationChains, chain]);
      }
    }
  }

  const openModal = () => {
    // return
    if (signInModalReference.current) {
      // setShowSignInModal(true)

      // if(!showSignInModal){
        setTimeout(()=>{
          const modal = new window.bootstrap.Modal(signInModalReference.current);
          modal.show();
        },500)
      // }
    }
  };
  const closeModal = () => {
    // console.log('loading')
    if (signInModalReference.current) {
      const modal = new window.bootstrap.Modal(signInModalReference.current);
      modal.hide();
    }
  };

  const configInitialChainSetup = (chainId) => {
    const selectedNetwork = sourceChainOptions.find((ch)=>{
      return ch.id == chainId
    });

    setWalletSelectedChain(selectedNetwork?selectedNetwork.value:null)
    setSelectedSourceChain(selectedNetwork)

    let tempOptions = sourceChainOptions.filter((ch)=>{
      return ch.value != selectedNetwork.value
    })
    // setDestinationChainoptions([...tempOptions])
    // setDefaultSelectedChain(false, selectedNetwork, tempOptions)

    const filteredChains = tempOptions.filter(chain => selectedNetwork.supported_destination_chains.includes(chain.value));

    setDestinationChainoptions([...filteredChains])
    setDefaultSelectedChain(false, selectedNetwork, filteredChains)

  }

  const setDefaultSelectedChain = (mode, selectedNetwork, tempOptions) => {
    if(mode){
      const filteredChains = tempOptions.filter(chain => selectedNetwork.supported_destination_chains.includes(chain.value));

      setDestinationChainoptions([...filteredChains])
      setSelectedDestinationChains(selectedNetwork.supported_destination_chains);
    }
    else {
      setSelectedDestinationChain(tempOptions[0])
    }
  }

  const isChainSelected = (chain, chains) => {
    if (chains.includes(chain)) {
      return true
    } else {
      return false
    }
  }

  const onMint = async() => {
    if(!address){
      openConnectModal()
      return;
    }
    console.log("Minting...");
    let mintDetails = [];

    if(brdigeMode==='turbo'){
      if(selectedDestinationChains){
        setMintStarted(true)

        let updatedTokenIds = [];
        // console.log(selectedDestinationChains.length)
        // selectedDestinationChains.forEach(async (ch,i)=>{
        // for (let i = 0; i < selectedDestinationChains.length; i++) {
        const promises = selectedDestinationChains.map(async (ch, i) => {
          await new Promise(resolve => setTimeout(resolve, 3000));

          // console.log(`Minting for ${selectedSourceChain.value} and ${address}: ` + (i+1))
          const response = await mintONFT(address, "OARTONFT", selectedSourceChain.value, nftDetails.version);
          // console.log('Minted tokenId: ', response.tokenId);

          if (response && response.tokenId && !recentlyMintedTokenIds.includes(response.tokenId)) {
            mintDetails.push({tokenId: response.tokenId, transactionHash: response.transactionHash, srcchain: response.srcchain});
            updatedTokenIds.push(response.tokenId);
          }
        });

        await Promise.all(promises);
        if(updatedTokenIds.length>0){
          saveMintDetails(mintDetails)
          setMintCompleted(true)
          setRecentlyMintedTokenIds([...recentlyMintedTokenIds, ...updatedTokenIds]);
        }
        else {
          setMintStarted(false)
        }
      }
      else {
        toast.error("Please select the destination chain.", {
          id: 'error',
          style: {
            borderRadius: '5px',
            background: '#222',
            color: '#fff',
          },
        })
      }
    }
    else {
      if(selectedDestinationChain){
        setMintStarted(true)
        // console.log(`Minting for ${selectedSourceChain.value} and ${address}: ` + (1))
        const response = await mintONFT(address, "OARTONFT", selectedSourceChain.value, nftDetails.version);
        // console.log('Minted tokenId: ', response.tokenId);
        if (response && response.tokenId && !recentlyMintedTokenIds.includes(response.tokenId)) {
          setRecentlyMintedTokenIds([...recentlyMintedTokenIds, response.tokenId]);
          mintDetails.push({tokenId: response.tokenId, transactionHash: response.transactionHash, srcchain: response.srcchain});
          saveMintDetails(mintDetails)
          setMintCompleted(true)
        }
        else {
          setMintStarted(false)
        }
      }
      else {
        toast.error("Please select the destination chain.", {
            id: 'error',
            style: {
              borderRadius: '5px',
              background: '#222',
              color: '#fff',
            },
          })
      }
    }
  }
  
  const saveMintDetails = (mintDetails) => {
    const authToken = localStorage.getItem('auth_token');          
    axios.post('https://api.omniart.app/api/saveMintData', {data: mintDetails, version: nftDetails.version}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((result) => {
      if(result.data.status){
        dispatch(fetchAuthUser({address:address, ref_by:null}))
        if(result.data.status){

          const referral_coins = result.data.referral_coins
          const mint_coins = result.data.mint_coins

          let msg = '';
          if(referral_coins>0){
            msg = `You have earned ${referral_coins} Omni points from referral joining and ${mint_coins} Omni points for minting.`
          }
          else {
            msg = `You have earned ${mint_coins} Omni points for minting.`
          }

          msg += ' Please complete the bridging process.'

          MySwal.fire({
            title: `Earned ${referral_coins+mint_coins} coins`,
            text: msg,
            icon: 'success',
            confirmButtonColor: '#343a40', // Customize button color
            background: '#111', // Customize background color
            customClass: {
              container: 'dark-theme-alert-container'
            },
          });
        }
      }
    }).catch((err) => {
      
    });
  }

  const saveBridgeDetails = (data) => {
    const authToken = localStorage.getItem('auth_token');

    axios.post('https://api.omniart.app/api/saveBridgeData', {address: address, data: data, version: nftDetails.version}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((result) => {
      if(result.data.status){
        dispatch(fetchAuthUser({address:address, ref_by:null}))
      }
    }).catch((err) => {
      
    });
  }

  const onBridge = async() => {
    try {
      setBridgeStarted(true)
      setLayerZeroScannerLinks([]);
      // console.log('From wallet address: ', address)

      if(brdigeMode==='turbo'){        
        if(selectedDestinationChains){
          let updatedScannerUrls = [];

          const promises = selectedDestinationChains.map(async (ch, i) => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            let tokenId = recentlyMintedTokenIds[i];

            const txHash = await sendONFT(address, "OARTONFT", selectedSourceChain.value, ch, tokenId, nftDetails.version);
            if (txHash) {
              const url = 'https://layerzeroscan.com/tx/' + txHash;
              updatedScannerUrls.push({txHash: txHash, tokenId: tokenId, url: url, fromChain: selectedSourceChain.value, chain: ch });
              saveBridgeDetails([{txHash: txHash, tokenId: tokenId, url: url, fromChain: selectedSourceChain.value, chain: ch }])
            }
            else {
              
            }
          });

          await Promise.all(promises);

          if(updatedScannerUrls.length>0){
            setLayerZeroScannerLinks(updatedScannerUrls);
          }
          else {
            setBridgeStarted(false)
          }
        }
        else {
          toast.error("Please select the destination chain.", {
            id: 'error',
            style: {
              borderRadius: '5px',
              background: '#222',
              color: '#fff',
            },
          })
        }
      }
      else {
        if(selectedDestinationChain){  
          const txHash = await sendONFT(address, "OARTONFT", selectedSourceChain.value, selectedDestinationChain.value, recentlyMintedTokenIds[0], nftDetails.version);
          if (txHash) {
            const url = 'https://layerzeroscan.com/tx/'+txHash;
            const data = [{txHash: txHash, tokenId: recentlyMintedTokenIds[0], url: url, fromChain: selectedSourceChain.value, chain: selectedDestinationChain.value}]
            setLayerZeroScannerLinks(data);
            saveBridgeDetails(data)
          }
          else {
              //new code
              setBridgeStarted(false)
          }
        }
        else {
         toast.error("Please select the destination chain.", {
            id: 'error',
            style: {
              borderRadius: '5px',
              background: '#222',
              color: '#fff',
            },
          })
        }
      }
    } catch (error) {
      console.error('Error sending NFT:', error);
    }
  }

  const checkChainSupport = async (chainId) => {
    if (window.ethereum) {
      try {
        
        let chainData = null;
        if(chainId===1){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Ethereum',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://ethereum.publicnode.com'],
          };
        }
        else if(chainId===137){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Polygon',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://polygon-rpc.com'],
          };
        }
        else if(chainId===10){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Optimism',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://mainnet.optimism.io'],
          };
        }
        else if(chainId===59144){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Linea',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
          };
        }
        else if(chainId===56){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed.binance.org'],
          };
        }
        else if(chainId===1101){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Polygon zkEvm',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.ankr.com/polygon_zkevm'],
          };
        }
        else if(chainId===8453){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Base',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://developer-access-mainnet.base.org'],
          };
        }
        else if(chainId===5000){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Mantle',
            nativeCurrency: {
              name: 'MNT',
              symbol: 'MNT',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.mantle.xyz'],
          };
        }
        else if(chainId===324){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'zkSync',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://zksync-era.rpc.thirdweb.com'],
          };
        }
        else if(chainId===43114){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Avalanche',
            nativeCurrency: {
              name: 'AVAX',
              symbol: 'AVAX',
              decimals: 18, 
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
          };
        }
        else if(chainId===42161){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Arbitrum',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.arb1.arbitrum.gateway.fm'],
          };
        }
        else if(chainId===250){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Fantom',
            nativeCurrency: {
              name: 'FTM',
              symbol: 'FTM',
              decimals: 18, 
            },
            rpcUrls: ['https://rpcapi.fantom.network'],
          };
        }
        else if(chainId===53935){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'DFK',
            nativeCurrency: {
              name: 'JEWEL',
              symbol: 'JEWEL',
              decimals: 18, 
            },
            rpcUrls: ['https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc'],
          };
        }
        else if(chainId===1666600000){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Harmony',
            nativeCurrency: {
              name: 'ONE',
              symbol: 'ONE',
              decimals: 18, 
            },
            rpcUrls: ['https://api.harmony.one'],
          };
        }
        // else if(chainId===432204){
        //   chainData = {
        //     chainId: `0x${chainId.toString(16)}`,
        //     chainName: 'Dexalot',
        //     nativeCurrency: {
        //       name: 'ALOT',
        //       symbol: 'ALOT',
        //       decimals: 18, 
        //     },
        //     rpcUrls: ['https://subnets.avax.network/dexalot/mainnet/rpc'],
        //   };
        // }
        else if(chainId===42220){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Celo',
            nativeCurrency: {
              name: 'CELO',
              symbol: 'CELO',
              decimals: 18, 
            },
            rpcUrls: ['https://forno.celo.org'],
          };
        }
        else if(chainId===1284){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Moonbeam',
            nativeCurrency: {
              name: 'GLMR',
              symbol: 'GLMR',
              decimals: 18, 
            },
            rpcUrls: ['https://moonbeam.public.blastapi.io'],
          };
        }
        else if(chainId===122){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Fuse',
            nativeCurrency: {
              name: 'FUSE',
              symbol: 'FUSE',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.fuse.io'],
          };
        }
        else if(chainId===100){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Gnosis',
            nativeCurrency: {
              name: 'XDAI',
              symbol: 'XDAI',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.gnosischain.com'],
          };
        }
        else if(chainId===8217){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Klaytn',
            nativeCurrency: {
              name: 'KLAY',
              symbol: 'KLAY',
              decimals: 18, 
            },
            rpcUrls: ['https://klaytn.blockpi.network/v1/rpc/public'],
          };
        }
        else if(chainId===1088){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Metis',
            nativeCurrency: {
              name: 'METIS',
              symbol: 'METIS',
              decimals: 18, 
            },
            rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
          };
        }
        else if(chainId===1116){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Coredao',
            nativeCurrency: {
              name: 'CORE',
              symbol: 'CORE',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.coredao.org'],
          };
        }
        else if(chainId===66){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'OKX',
            nativeCurrency: {
              name: 'OKT',
              symbol: 'OKT',
              decimals: 18, 
            },
            rpcUrls: ['https://exchainrpc.okex.org'],
          };
        }
        else if(chainId===7700){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Canto',
            nativeCurrency: {
              name: 'CANTO',
              symbol: 'CANTO',
              decimals: 18, 
            },
            rpcUrls: ['https://mainnode.plexnode.org:8545'],
          };
        }
        else if(chainId===1285){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Moonriver',
            nativeCurrency: {
              name: 'MOVR',
              symbol: 'MOVR',
              decimals: 18, 
            },
            rpcUrls: ['https://moonriver.api.onfinality.io/public'],
          };
        }
        else if(chainId===1559){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Tenet',
            nativeCurrency: {
              name: 'TENET',
              symbol: 'TENET',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.tenet.org'],
          };
        }
        else if(chainId===42170){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Arbitrum Nova',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://nova.arbitrum.io/rpc'],
          };
        }
        else if(chainId===82){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Meter',
            nativeCurrency: {
              name: 'MTR',
              symbol: 'MTR',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.meter.io'],
          };
        }
        // else if(chainId===58008){
        //   chainData = {
        //     chainId: `0x${chainId.toString(16)}`,
        //     chainName: 'Sepolia',
        //     nativeCurrency: {
        //       name: 'ETH',
        //       symbol: 'ETH',
        //       decimals: 18, 
        //     },
        //     rpcUrls: ['https://sepolia.publicgoods.network'],
        //   };
        // }
        else if(chainId===2222){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Kava',
            nativeCurrency: {
              name: 'KAVA',
              symbol: 'KAVA',
              decimals: 18, 
            },
            rpcUrls: ['https://evm2.kava.io'],
          };
        }
        else if(chainId===5151706){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Loot',
            nativeCurrency: {
              name: 'LOOT',
              symbol: 'LOOT',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.lootchain.com/http'],
          };
        }
        else if(chainId===7777777){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Zora',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://rpc.zora.co'],
          };
        }
        else if(chainId===204){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'opBNB',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://opbnb.publicnode.com'],
          };
        }
        else if(chainId===534352){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Scroll',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://scroll.blockpi.network/v1/rpc/public'],
          };
        }
        else if(chainId===169){
          chainData = {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Manta',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18, 
            },
            rpcUrls: ['https://pacific-rpc.manta.network/http'],
          };
        }
        
        const isSupported = await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [chainData]
        });
        return isSupported;
      } catch (error) {
        console.error('checkError', error);
        return false;
      }
    }
    return false;
  }

  const handleSelectSourceChange = (option) => {
    // console.log(option)
    let res = sourceChainOptions.find((ch)=>{
      return ch.value == option.value
    })
    setSelectedSourceChain(res)
    switchOrAddChain(res.id)
    if(selectSourceChainRef.current) {
      selectSourceChainRef.current.blur();
    }

    const filteredChains = sourceChainOptions.filter(chain => res.supported_destination_chains.includes(chain.value));
    setDestinationChainoptions([...filteredChains])
    setSelectedDestinationChain(filteredChains[0])
    setSelectedDestinationChains(res.supported_destination_chains);
  }

  const handleSelectDestinationChange = (option) => {
    let res = sourceChainOptions.find((ch)=>{
      return ch.value == option.value
    })
    setSelectedDestinationChain(res)
    setSelectedDestinationChains([res.value])
    if (selectDestinationRef.current) {
      selectDestinationRef.current.blur();
    }
  }

  const switchOrAddChain = async (chainId) => {
    if (currentChain !== chainId) {
      try {
        await switchChain(chainId);
      } catch (error) {
        console.error('SwitchError', error);
        const isSupported = await checkChainSupport(chainId);
        if (isSupported) {
          addChainToWallet(chainId);
        }
      }
    }
  }

  const switchChain = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (error) {
        if (error.code === 4902) {
          console.log('Chain switch request rejected');
        } else {
          console.error(error);
        }
        throw error;
      }
    }
  }

  const addChainToWallet = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${chainId.toString(16)}`,
            chainName: chainId === 80001 ? 'Polygon Mumbai' : 'Optimism Goerli',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: [chainId === 80001 ? 'https://rpc-mumbai.polygon.io' : 'https://optimism-goerli.publicnode.com	'],
          }],
        });
        console.log('Chain added to wallet successfully');
      } catch (error) {
        console.error(error);
      }
    }
  }

  const getSourceChainDefaultOption = () => {
    let res = sourceChainOptions.find((ch)=>{return ch.value == walletSelectedChain})
    return res
  }

  const resetApp = () => {
    setMintStarted(false);
    setMintCompleted(false);
    setBridgeStarted(false);  
    setRecentlyMintedTokenIds([])
    setLayerZeroScannerLinks()
    setResumeBridgeTxHash('')
    setResumeBridgeTxHashVerificatioRunning(false)
    setResumeBridgeTxHashVerified(false)
  }

  const verifyResumeOnftBridgeTxHash = async () => {
    setResumeBridgeTxHashVerified(false)
    setResumeBridgeTxHashVerificatioRunning(true)
    setRecentlyMintedTokenIds([])
    getTxDetail(resumeBridgeTxHash, selectedSourceChain.value, address, 'OARTONFT', nftDetails.version)
    .then(result => {
      console.log(result)
      if(result.status && result.validateWallet && result.validateContract){
        const mintDetails = {tokenId: result.tokenId, transactionHash: result.transactionHash, srcchain: result.srcchain, version: nftDetails.version}

        //check mint and bridge entry
        const authToken = localStorage.getItem('auth_token');
        axios.post('https://api.omniart.app/api/verifyAndSaveMint', mintDetails, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setResumeBridgeTxHashVerificatioRunning(false)

          if (res.data.status) {
            // console.log(result.tokenId)
            dispatch(fetchAuthUser({ address: address, ref_by: null }))
            const referral_coins = res.data.referral_coins
            const mint_coins = res.data.mint_coins

            let msg = '';
            let icon = '';
            let title = ''
            if(!res.data.bridge_status){
              setMintStarted(true)
              setMintCompleted(true)
              setResumeBridgeTxHashVerified(true)
              setRecentlyMintedTokenIds([result.tokenId])
            }
            if (mint_coins>0){
              if(referral_coins>0) {
                msg = `You have earned ${referral_coins} Omni points from referral joining and ${mint_coins} Omni points for minting.`
              }
              else {
                msg = `You have earned ${mint_coins} Omni points for minting.`
              }
              msg += ' Please complete the bridging process.'
              icon = 'success'
              title = `Earned ${referral_coins + mint_coins} coins`
            }
            else {
              if(res.data.bridge_status){
                title = `Oops...`
                icon = 'error';
                msg = 'Token had been already bridged.'
              }
            }
            if(icon!=''){
              MySwal.fire({
                title: title,
                text: msg,
                icon: icon,
                confirmButtonColor: '#343a40', // Customize button color
                background: '#111', // Customize background color
                customClass: {
                  container: 'dark-theme-alert-container'
                },
              });
            }
          }
        }).catch((err) => {

        });
        //check mint and bridge entry
      }
      else {
        setResumeBridgeTxHashVerificatioRunning(false)
        const title = `Transaction not found!`
        const icon = 'error';
        const msg = 'Kindly verify and confirm the source chain along with the transaction hash.'
  
        MySwal.fire({
          title: title,
          text: msg,
          icon: icon,
          confirmButtonColor: '#343a40', // Customize button color
          background: '#111', // Customize background color
          customClass: {
            container: 'dark-theme-alert-container'
          },
        });
      }
    })
    .catch(error => {
      console.log(error)
      setResumeBridgeTxHashVerificatioRunning(false)
      const title = `Transaction not found!`
      const icon = 'error';
      const msg = 'Kindly verify and confirm the source chain along with the transaction hash.'

      MySwal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonColor: '#343a40', // Customize button color
        background: '#111', // Customize background color
        customClass: {
          container: 'dark-theme-alert-container'
        },
      });
        // console.error('Error:', error);
    });
  }

  const verifyReBridgeOnftBridgeTxHash = () => {
    setResumeBridgeTxHashVerified(false)
    setResumeBridgeTxHashVerificatioRunning(true)
    setRecentlyMintedTokenIds([])
    getReBridgeTxDetail(resumeBridgeTxHash, selectedSourceChain.value, address, 'OARTONFT', nftDetails.version)
    .then(result => {
      // console.log(result)
      if(result.status && result.validateWallet && result.validateContract){
        // const mintDetails = {tokenId: result.tokenId, transactionHash: result.transactionHash, srcchain: result.srcchain}

          setMintStarted(true)
          setMintCompleted(true)
          setResumeBridgeTxHashVerified(true)
          setRecentlyMintedTokenIds([result.tokenId])
          setResumeBridgeTxHashVerificatioRunning(false)

        //check mint and bridge entry
        // const authToken = localStorage.getItem('auth_token');
        // axios.post('https://api.omniart.app/api/verifyAndSaveMint', mintDetails, {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`,
        //   },
        // })
        // .then((res) => {
        //   setResumeBridgeTxHashVerificatioRunning(false)

        //   if (res.data.status) {
        //     // console.log(result.tokenId)
        //     dispatch(fetchAuthUser({ address: address, ref_by: null }))
        //     const referral_coins = res.data.referral_coins
        //     const mint_coins = res.data.mint_coins

        //     let msg = '';
        //     let icon = '';
        //     let title = ''
        //     if(!res.data.bridge_status){
        //       setMintStarted(true)
        //       setMintCompleted(true)
        //       setResumeBridgeTxHashVerified(true)
        //       setRecentlyMintedTokenIds([result.tokenId])
        //     }
        //     if (mint_coins>0){
        //       if(referral_coins>0) {
        //         msg = `You have earned ${referral_coins} Omni points from referral joining and ${mint_coins} Omni points for minting.`
        //       }
        //       else {
        //         msg = `You have earned ${mint_coins} Omni points for minting.`
        //       }
        //       msg += ' Please complete the bridging process.'
        //       icon = 'success'
        //       title = `Earned ${referral_coins + mint_coins} coins`
        //     }
        //     else {
        //       if(res.data.bridge_status){
        //         title = `Oops...`
        //         icon = 'error';
        //         msg = 'Token had been already bridged.'
        //       }
        //     }
        //     if(icon!=''){
        //       MySwal.fire({
        //         title: title,
        //         text: msg,
        //         icon: icon,
        //         confirmButtonColor: '#343a40', // Customize button color
        //         background: '#111', // Customize background color
        //         customClass: {
        //           container: 'dark-theme-alert-container'
        //         },
        //       });
        //     }
        //   }
        // }).catch((err) => {
        // });
        //check mint and bridge entry
      }
      else {
        setResumeBridgeTxHashVerificatioRunning(false)
        const title = `Transaction not found!`
        const icon = 'error';
        const msg = 'Kindly verify and confirm the source chain along with the transaction hash.'
  
        MySwal.fire({
          title: title,
          text: msg,
          icon: icon,
          confirmButtonColor: '#343a40', // Customize button color
          background: '#111', // Customize background color
          customClass: {
            container: 'dark-theme-alert-container'
          },
        });
      }
    })
    .catch(error => {
      // console.log(error)
      setResumeBridgeTxHashVerificatioRunning(false)
      const title = `Transaction not found!`
      const icon = 'error';
      const msg = 'Kindly verify and confirm the source chain along with the transaction hash.'

      MySwal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonColor: '#343a40', // Customize button color
        background: '#111', // Customize background color
        customClass: {
          container: 'dark-theme-alert-container'
        },
      });
        // console.error('Error:', error);
    });
  }

  const handleTxHashInputChange = (e) => {
    const urlString = e.target.value.trim()
    const startIndex = urlString.indexOf("0x");
    const extractedSubstring = urlString.substring(startIndex);
    setResumeBridgeTxHash(extractedSubstring)
  }

  return (
    <div className='container text-start'>
      <Toaster/>
      <div className="container">
        <div className="row mb-3 turbo-toogler">
          <div className="col-xl-4 col-lg-8 col-sm-12 ms-auto mint-menu-container mint-menu-container-1">
            <div className="row">
              <div className="col-md-6">
                <div className={`mint-menu-item text-center ${brdigeMode=='single'?'active':null}`} role='button' onClick={()=>{setBridgeMode('single'); resetApp(); setDefaultSelectedChain(false, selectedSourceChain, destinationChainoptions)}}>
                  <span>ONFT Bridge</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className={`mint-menu-item text-center ${brdigeMode=='turbo'?'active':null}`} role='button' onClick={()=>{setBridgeMode('turbo'); resetApp(); setDefaultSelectedChain(true, selectedSourceChain, destinationChainoptions)}}>
                  <span>Turbo ONFT Bridge</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-8 col-sm-12 me-auto mint-menu-container mint-menu-container-2">
            <div className="row">
              <div className="col-md-6">
                <div className={`mint-menu-item text-center ${brdigeMode=='resume'?'active':null}`} role='button' onClick={()=>{setBridgeMode('resume'); resetApp(); setDefaultSelectedChain(true, selectedSourceChain, destinationChainoptions)}}>
                  <span>Resume Bridge</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className={`mint-menu-item text-center ${brdigeMode=='re-bridge'?'active':null}`} role='button' onClick={()=>{setBridgeMode('re-bridge'); resetApp(); setDefaultSelectedChain(true, selectedSourceChain, destinationChainoptions)}}>
                  <span>Re-Bridge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='notice mb-2'>
        <p className='text-center mb-0'>Exclusive Boosted Reward: Enjoy 2X Minting Points for this ONFT Gem. Hurry - Boost Ends Soon!</p>
      </div>


      {isNftDetailsLoaded ?
        <div className={`container main-mint-area-border ${selectedSourceChain?selectedSourceChain.value:null}`}>

          {allNftVersions && allNftVersions.length>1 && !showSignInModal?
            <div className="swipe-icon swipe-icon-left" onClick={()=>loadPreviousNft()}>
              <i className="fa-solid fa-angles-left" title="Go to previous ONFT"></i>
            </div>
          :null}
          
          
          <div className={`row main-mint-area ${selectedSourceChain?selectedSourceChain.value:null}`}>
            <div className="col-md-4 pe-5 nft-details-container">
              <figure className='w-100'><img className='nft-image rounded hover14' src={nftDetails.img} alt="OART ONFT" /></figure>
              <h4 className='mt-3'>{nftDetails.nft_name}</h4>
              <p className='text-gray'>{nftDetails.nft_description}</p>
              <p className='fw-bold'>
                <img src='/assets/img/minting-counter.png' className='minting-counter-img'/>
                {mintingCount} ONFTs Minted
              </p>
            </div>
            <div className="col-md-8 sub-mint-area ps-5">
              {nftDetails && nftDetails.expiry_at && nftDetails.version=='v8'?
                <div className="time-counter">
                  <h6 className='text-center mb-3'>Minting ends in</h6>
                  <TimeCounter expiryTimestamp={mysqlDatetimeToReadable(nftDetails.expiry_at)}/>
                </div>
                :null
              }
  
              <h3 className="mb-2"><small className='small-header'>Select source chain:</small> </h3>
              {
                selectedSourceChain?
                <Select
                  ref={selectDestinationRef}
                  // defaultMenuIsOpen="true"
                  // autoFocus="true"
                  // menuIsOpen="true"
                  placeholder="Select source chain..."
                  className={`source-chain-dropdown mb-4 ${recentlyMintedTokenIds.length>0?'disabled':null}`}
                  classNamePrefix="react-select"
                  options={sourceChainOptions}
                  onChange={handleSelectSourceChange}
                  defaultValue={ 
                    getSourceChainDefaultOption()
                  }
                  // getOptionLabel={(option) => ('dd ' + option.label) }
                  styles={customStyles}
                  components={{ Option: IconOption }}
                  formatOptionLabel={({ label, icon }) => (
                    <div className="react-select__option">
                      <img className="react-select__option-icon" src={icon} alt={`${label} icon`} width="24" height="24" style={{ marginRight: 10 }} />
                      {label}
                    </div>
                  )}
                />:
                <div className="connect-btn d-flex">
                  {address?null:<ConnectButton />}
                </div>
              }

              {brdigeMode=='resume' || brdigeMode=='re-bridge'?
                <div className="row">
                  <div className={`col-12 res-row nft-${nftDetails.version}`}>
                    <h3 className="mb-2"><small className='small-header'>{brdigeMode=='resume'?'Mint':'Bridge'} txHash:</small></h3>
                    <input type="text" className='source-chain-dropdown mb-4' id='mintTxHash' value={resumeBridgeTxHash} onChange={(e)=>{handleTxHashInputChange(e)}} disabled={resumeBridgeTxHashVerified}/> 
                    {resumeBridgeTxHashVerificatioRunning?
                      <div  className="spinner-border spinner-border-sm ms-2" role="status">
                        <span  className="sr-only">Loading...</span>
                      </div>:null
                    }
                    {resumeBridgeTxHashVerified?
                      <i className='fa fa-check-circle text-success ms-2'></i> :null
                    }
                    {/* Resume Bridge */}
                    {brdigeMode=='resume' && !resumeBridgeTxHashVerified && resumeBridgeTxHash && !resumeBridgeTxHashVerificatioRunning && <span className='btn-link text-info ms-2' role='button' onClick={()=>verifyResumeOnftBridgeTxHash()}>{nftDetails.version=='v1'?'Verify':'Verify & Approve'}</span>}
                    
                    {/* Re-Bridge ONFT */}
                    {brdigeMode=='re-bridge' && !resumeBridgeTxHashVerified && resumeBridgeTxHash && !resumeBridgeTxHashVerificatioRunning && <span className='btn-link text-info ms-2' role='button' onClick={()=>verifyReBridgeOnftBridgeTxHash()}>{nftDetails.version=='v1'?'Verify':'Verify & Approve'}</span>}
                  </div>
                </div>
                :
                null
              }
        
              <h3 className="mb-2"><small className='small-header'> Select destination chain:</small></h3>

              {brdigeMode=='turbo'?
                <div className="row">
                  {destinationChainoptions && destinationChainoptions.map((ch,i)=>(
                    <div className="col-xl-3 col-lg-4 col-sm-6 chain-item-container" key={'sc'+i}>
                      <div className={"chain-item p-1  "+ (isChainSelected(ch.value, selectedDestinationChains)?'selected':null)} role="button" onClick={()=>toogleDestinationChain(ch.value)}>
                        <img src={ch.icon}></img>
                        <p>
                          {ch.label} 
                          {/* {isChainSelected(ch.value, selectedDestinationChains)?<i className="fa fa-check-circle float-end me-2" aria-hidden="true"></i>:null} */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <Select
                  isDisabled={!selectedSourceChain}
                  key={key}
                  ref={selectSourceChainRef}
                  value={selectedDestinationChain}
                  // defaultMenuIsOpen="true"
                  // autoFocus="true"
                  // menuIsOpen="true"
                  placeholder="Select destination chain..."
                  className='source-chain-dropdown mb-4'
                  classNamePrefix="react-select"
                  options={destinationChainoptions}
                  onChange={handleSelectDestinationChange}
                  // getOptionLabel={(option) => ('dd ' + option['label']) }
                  styles={customStyles}
                  components={{ Option: IconOption }}
                  formatOptionLabel={({ label, icon }) => (
                    <div className="react-select__option">
                      <img className="react-select__option-icon" src={icon} alt={`${label} icon`} width="24" height="24" style={{ marginRight: 10 }} />
                      {label}
                    </div>
                  )}
                />
              }

              {(['single', 'turbo'].includes(brdigeMode)) && (!mintCompleted && ((selectedDestinationChains && selectedDestinationChains.length > 0) || selectedDestinationChain) )?
                <div className='mt-1 message mb-3'>
                    {
                      (nftDetails.version=='v1' || nftDetails.version=='v2' || nftDetails.version=='v3' || nftDetails.version=='v4' || nftDetails.version=='v5' || nftDetails.version=='v6' || nftDetails.version=='v7')?
                      <span className='text-warning'>Minting ended for this ONFT.</span>
                      :
                      <span>You will earn  {brdigeMode=='turbo'?` ${selectedDestinationChains.length*200} `:' 200 '} Omni points upon successful minting.</span>
                    }
                </div>
              :null}

              {brdigeMode=='resume' && (!mintCompleted && ((selectedDestinationChains && selectedDestinationChains.length > 0) || selectedDestinationChain) )?
                <div className='mt-1 message mb-3'>
                    You will earn 200 Omni points upon successful verification.
                </div>
              :null}

              
              {(['single', 'turbo'].includes(brdigeMode)) && (!layerZeroScannerLinks || layerZeroScannerLinks.length==0) ?
                <button className="mint-btn mint fw-bold me-3" disabled={mintStarted || (selectedDestinationChain==null && selectedDestinationChains.length==0) || nftDetails.version=='v1' || nftDetails.version=='v2' || nftDetails.version=='v3' || nftDetails.version=='v4' || nftDetails.version=='v5' || nftDetails.version=='v6' || nftDetails.version=='v7'} onClick={() => { onMint(); }}>
                  MINT ONFT
                  {brdigeMode=='turbo'?(
                    selectedDestinationChains.length>0?('('+selectedDestinationChains.length+')'):null
                  ):(
                    selectedDestinationChain?' (1)':null
                  )}  
                </button>
                :null
              }
              
              {(['resume', 're-bridge'].includes(brdigeMode)) && nftDetails.version=='v1' && (!layerZeroScannerLinks || layerZeroScannerLinks.length==0) ?
                !((recentlyMintedTokenIds.length==0)?true:false)?
                  <p className='text-warning'>Note: If you encounter a gas price error, it's likely because you have not selected the updated source chain.</p>
                  :
                  null
                :null
              }

              {(['single', 'turbo', 'resume', 're-bridge'].includes(brdigeMode)) && (!layerZeroScannerLinks || layerZeroScannerLinks.length==0) ?
                <button className={`mint-btn bridge fw-bold`} disabled={(recentlyMintedTokenIds.length==0 || bridgStarted)?true:false} onClick={() => { onBridge(); }}>
                  {['single', 'turbo', 'resume'].includes(brdigeMode) ? 'BRIDGE ONFT' : 'RE-BRIDGE ONFT'}
                  {recentlyMintedTokenIds.length>0?('('+recentlyMintedTokenIds.length+')'):null}
                </button>
                :null
              }

              {layerZeroScannerLinks && layerZeroScannerLinks.length>0 ?
                <button className="mint-btn bridge-again-btn mint fw-bold" onClick={() => { resetApp(); }}>
                  BRIDGE AGAIN
                </button>
                :null
              }

              <div className={((mintStarted && !mintCompleted) || bridgStarted)?'scanner-links-container':null}>
                {layerZeroScannerLinks && layerZeroScannerLinks.length>0 ?
                  <div>
                    <h6 className='mb-3'>LayerZero Scanner Links:</h6>
                    <div className='row'>
                      { layerZeroScannerLinks.map((item,i)=>(
                        <div className='col-md-4' key={'link'+i}><a href={item.url} target='_blank' without rel="noreferrer">{i+1}. <span className='btn-link'>Bridge to {getChainName(item.chain)}</span></a></div>
                      ))}
                    </div>
                  </div>
                  :
                  <div>
                    
                    {mintStarted?
                      (bridgStarted?
                        <div>
                          <div className="spinner-border spinner-border-sm" role="status"></div>
                          <span className="ms-2">Please confirm the transactions on your wallet and wait for LayerZero Scan link{brdigeMode=='turbo'?'s':null}...</span>
                        </div>
                        :
                        (!mintCompleted?
                          <div>
                            <div className="spinner-border spinner-border-sm" role="status"></div>
                            <span className="ms-2">Please confirm the transactions on your wallet and wait for minting...</span>
                          </div>
                          :null
                        )
                      )
                      :null
                    }
                  </div>
                }
              </div>
              
            </div>
          </div>

          {allNftVersions && allNftVersions.length>1 && !showSignInModal?
          <div className="swipe-icon swipe-icon-right" onClick={()=>loadNextNft()}>
            <i className="fa-solid fa-angles-right" title="Go to next ONFT"></i>
          </div>
          :null}
        </div>
        :
        <div className={`main-mint-area-border`}>
          <SkeletonView className='sss' height={30} width={100}/>
        </div>
      }

      <div>
    </div>


      {/* Sign In Modal */}

      <div id="signInModal" ref={signInModalReference} className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel">
        <div className="modal-dialog  modal-dialog-centered justify-content-center " role="document">
          <div className="modal-content  border-0 mx-3">
            <div className="modal-body  p-0">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <div className="card border-0 justify-content-center">
                    <div className="card-header pb-0 bg-white text-center" >
                      {/* <div className="row mb-0 justify-content-end">
                        <div className='text-end'>
                          <img className="img-fluid cross mb-auto" src="./assets/img/cross.jpeg" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                      </div> */}
                      <div className="row mt-0">
                        <div className="col">
                          <img className="img-fluid text-center" src="./assets/img/sign.jpeg" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body text-center px-lg-5 px-md-4 mb-3">
                      <h6 className="card-title card-1 font-weight-bold">Wallect Connected</h6>
                      <p className="card-subtitle text-light">Your consent is required for signin to <span className='fw-bold'>OmniArt</span></p>
                      <div className="row justify-content-center mt-4">
                        <div className="col-8">
                          <button type="button" className="btn btn-success btn-block font-weight-bold text-dark mt-3" data-dismiss="modal" onClick={()=>login()}>Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};


export default ONFTBridge;
