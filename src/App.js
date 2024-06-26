import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import devtools from './../node_modules/devtools-detect/index.js';

import './App.css';
import { Chain } from '@wagmi/core'
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ONFTBridge from './components/ONFTBridge';
import History from './components/History';
import { Provider } from 'react-redux'
import store from './store/index.js'
import Coins from './components/helpercomponents/Coins';
import axios from 'axios';
import NotFoundPage from './components/NotFoundPage';

import {
  // polygonMumbai,
  // optimismGoerli,
  // linea Testnet,
  // mantleTestnet,
  // polygonZkEvmTestnet,
  // bscTestnet,
  // baseGoerli,

  mainnet, avalanche, arbitrum, fantom,
  dfk, harmonyOne, celo, moonbeam, gnosis,
  klaytn, metis, canto, moonriver,
  zora, polygon, optimism, base, zkSync, polygonZkEvm, bsc

  //  sepolia
} from 'wagmi/chains';

export const linea: Chain = {
  id: 59_144,
  name: 'Linea',
  network: 'linea',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: ['https://linea.blockpi.network/v1/rpc/public'] },
    default: { http: ['https://linea.blockpi.network/v1/rpc/public'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://lineascan.build/' },
    default: { name: 'SnowTrace', url: 'https://lineascan.build/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const mantle: Chain = {
  id: 5000,
  name: 'Mantle',
  network: 'mantle',
  nativeCurrency: {
    decimals: 18,
    name: 'MNT',
    symbol: 'MNT'
  },
  rpcUrls: {
    public: { http: ['https://rpc.mantle.xyz'] },
    default: { http: ['https://rpc.mantle.xyz'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://explorer.mantle.xyz/' },
    default: { name: 'SnowTrace', url: 'https://explorer.mantle.xyz/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const fuse: Chain = {
  id: 122,
  name: 'Fuse',
  network: 'fuse',
  nativeCurrency: {
    decimals: 18,
    name: 'FUSE',
    symbol: 'FUSE'
  },
  rpcUrls: {
    public: { http: ['https://fuse-rpc.gateway.pokt.network'] },
    default: { http: ['https://fuse-rpc.gateway.pokt.network'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://explorer.fuse.io/' },
    default: { name: 'SnowTrace', url: 'https://explorer.fuse.io/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const arbitrumNova: Chain = {
  id: 42170,
  name: 'Arbitrum Nova',
  network: 'arbitrumNova',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: ['https://arbitrum-nova.publicnode.com'] },
    default: { http: ['https://arbitrum-nova.publicnode.com'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://nova.arbiscan.io/' },
    default: { name: 'SnowTrace', url: 'https://nova.arbiscan.io/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const kava: Chain = {
  id: 2222,
  name: 'Kava',
  network: 'kava',
  nativeCurrency: {
    decimals: 18,
    name: 'KAVA',
    symbol: 'KAVA'
  },
  rpcUrls: {
    public: { http: ['https://kava-evm.publicnode.com'] },
    default: { http: ['https://kava-evm.publicnode.com'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://kavascan.com/' },
    default: { name: 'SnowTrace', url: 'https://kavascan.com/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}
	
export const meter: Chain = {
  id: 82,
  name: 'Meter',
  network: 'meter',
  nativeCurrency: {
    decimals: 18,
    name: 'MTR',
    symbol: 'MTR'
  },
  rpcUrls: {
    public: { http: ['https://rpc.meter.io'] },
    default: { http: ['https://rpc.meter.io'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://scan.meter.io/' },
    default: { name: 'SnowTrace', url: 'https://scan.meter.io/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const tenet: Chain = {
  id: 1559,
  name: 'Tenet',
  network: 'tenet',
  nativeCurrency: {
    decimals: 18,
    name: 'TENET',
    symbol: 'TENET'
  },
  rpcUrls: {
    public: { http: ['https://tenet-evm.publicnode.com'] },
    default: { http: ['https://tenet-evm.publicnode.com'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://tenetscan.io/' },
    default: { name: 'SnowTrace', url: 'https://tenetscan.io/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const core: Chain = {
  id: 1116,
  name: 'Core',
  network: 'core',
  nativeCurrency: {
    decimals: 18,
    name: 'CORE',
    symbol: 'CORE'
  },
  rpcUrls: {
    public: { http: ['https://rpc.coredao.org'] },
    default: { http: ['https://rpc.coredao.org'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://scan.coredao.org/' },
    default: { name: 'SnowTrace', url: 'https://scan.coredao.org/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}
	
export const okc: Chain = {
  id: 66,
  name: 'OKC',
  network: 'okc',
  nativeCurrency: {
    decimals: 18,
    name: 'OKT',
    symbol: 'OKT'
  },
  rpcUrls: {
    public: { http: ['https://oktc-mainnet.public.blastapi.io'] },
    default: { http: ['https://oktc-mainnet.public.blastapi.io'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://www.okx.com/explorer/oktc' },
    default: { name: 'SnowTrace', url: 'https://www.okx.com/explorer/oktc' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}
	
export const loot: Chain = {
  id: 5151706,
  name: 'Loot',
  network: 'loot',
  nativeCurrency: {
    decimals: 18,
    name: 'LOOT',
    symbol: 'LOOT'
  },
  rpcUrls: {
    public: { http: ['https://rpc.lootchain.com/http'] },
    default: { http: ['https://rpc.lootchain.com/http'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://explorer.lootchain.com/' },
    default: { name: 'SnowTrace', url: 'https://explorer.lootchain.com/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const opbnb: Chain = {
  id: 204,
  name: 'opBNB',
  network: 'opbnb',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB'
  },
  rpcUrls: {
    public: { http: ['https://opbnb-mainnet-rpc.bnbchain.org'] },
    default: { http: ['https://opbnb-mainnet-rpc.bnbchain.org'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://opbnbscan.com/' },
    default: { name: 'SnowTrace', url: 'https://opbnbscan.com/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const scroll: Chain = {
  id: 534352,
  name: 'Scroll',
  network: 'scroll',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: ['https://rpc.scroll.io'] },
    default: { http: ['https://rpc.scroll.io'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://blockscout.scroll.io/' },
    default: { name: 'SnowTrace', url: 'https://blockscout.scroll.io/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

export const manta: Chain = {
  id: 169,
  name: 'Manta',
  network: 'manta',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: ['https://pacific-rpc.manta.network/http'] },
    default: { http: ['https://pacific-rpc.manta.network/http'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://explorer.publicgoods.network/' },
    default: { name: 'SnowTrace', url: 'https://explorer.publicgoods.network/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}
function App() {
  // const account = useAccount()
  const { chains, publicClient } = configureChains(
    [
      // Testnet
      // mainnet, polygonMumbai, optimismGoerli, lineaTestnet, mantleTestnet, polygonZkEvmTestnet, bscTestnet, baseGoerli,

      // Mainnet
      // mainnet,
      // dexalot
      bsc, avalanche, polygon, arbitrum,  optimism, fantom, dfk,
      harmonyOne, celo, moonbeam, fuse, gnosis,
      klaytn, metis, core, okc, polygonZkEvm, canto, moonriver, tenet,
      arbitrumNova, meter, kava, linea, base, mantle, loot, zora,
      zkSync, opbnb, scroll, manta
      // sepolia
    ],
    [
      alchemyProvider({ apiKey: "eErafqfM6rYtBzJqFeVQp9pH8Lcr_ZYm" }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: "8e54f53909f1aa426580d5e1e75dfdf5",
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    useConfig: true
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const [refLink, setRefLink] = useState(null)
  const [refCount, setRefCount] = useState(0)
  const [mintedRefCount, setMintedRefCount] = useState(0)

  const [firstMintDone, setFirstMintDone] = useState(false)
  const [message, setMessage] = useState(null)
  


  const handleCopyClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      // setCopied(true);

      toast.success('Referral link copied to clipboard.', {
        id: 'success',
        style: {
          borderRadius: '5px',
          background: '#222',
          color: '#fff',
        }
      })
    }
  };

  const getReferralLink = () => {
    const authToken = localStorage.getItem('auth_token');
    if(authToken){
      axios.get('https://api.omniart.app/api/refDetails',{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        if(result.data.status){
          setRefLink('https://omniart.app?ref_by='+result.data.ref_code)
          setRefCount(result.data.ref_count)
          setMintedRefCount(result.data.minted_ref_count)
          setFirstMintDone(true)
          setMessage("")
        }
        else {
          setRefLink('https://omniart.app')
          setRefCount(0)
          setMintedRefCount(0)
          setFirstMintDone(false)
          setMessage("Please comple your first mint to generate your referral link.")
        }
      }).catch((err) => {
        
      });
    }
    else {
      setRefLink('https://omniart.app')
      setFirstMintDone(false)
      setMessage("Please connect your wallet first to get your referral link.")
    }
  }

  const [devToolsOpened, setDevToolsOpened] = useState(false);


  useEffect(() => {

    // const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);


    // Check if it's open
    // if(devtools.isOpen){
    //   setDevToolsOpened(true)
    // }
    // else {
    //   setDevToolsOpened(false)
    // }

    // Check it's orientation, `undefined` if not open
    // console.log('DevTools orientation:', devtools.orientation);
    // Get notified when it's opened/closed or orientation changes
    // window.addEventListener('devtoolschange', event => {
    //   try {
    //     console.log('Is DevTools open:', event.detail.isOpen);
    //     // console.log('DevTools orientation:', event.detail.orientation);
    //     if(event.detail.isOpen){
    //       setDevToolsOpened(true)
    //     }
    //     else {
    //       setDevToolsOpened(false)
    //     }
    //   }
    //   catch (e) {
    //     console.log("Error", e);
    //   }
    // });

  }, []);

  const validateConnection = () => {
    console.log('ddd')
  }


  return (
    !devToolsOpened?
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <Router>

            <Toaster/>


            <nav className="navbar navbar-expand-lg">
              <div className="container">
                <Link className="navbar-brand" to="/">
                  <img className='logo' src="./assets/img/omniart.png" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  </ul>
                  <form className="d-flex connect-btn">
                    <span className='wallet-coins' role='button' data-bs-toggle="modal" data-bs-target="#referralModal" onClick={()=>getReferralLink()}>
                      {/* <img src="../assets/img/wallet-icon.png"></img> */}
                      <i className="fa fa-user-plus me-2" aria-hidden="true"></i>
                      <span style={{ display: 'inline-block', marginTop: '2px' }}>
                        Referral
                      </span>
                    </span>
                    <Coins />
                    <div onClick={()=>validateConnection()}>
                      <ConnectButton className="" showBalance={false} />
                    </div>
                  </form>
                </div>
              </div>
            </nav>

            <div className="App">
              <nav className='mb-3'>
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/">Bridge</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/history">History</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href='https://omniart.gitbook.io/about' target='_blank'>Documentation</a>
                  </li>
                </ul>
              </nav>



              <Routes>
                <Route path="/" element={<ONFTBridge />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<NotFoundPage />} />                
              </Routes>

              <p className='mt-4'>
                <a href="https://layerzero.network/" target='_blank'><svg width="225" height="30" viewBox="0 0 150 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.08416 14V5.27273H4.03303C4.71768 5.27273 5.27734 5.39631 5.712 5.64347C6.1495 5.88778 6.47337 6.21875 6.68359 6.63636C6.89382 7.05398 6.99893 7.51989 6.99893 8.03409C6.99893 8.5483 6.89382 9.01562 6.68359 9.43608C6.47621 9.85653 6.15519 10.1918 5.72053 10.4418C5.28587 10.6889 4.72905 10.8125 4.05007 10.8125H1.93643V9.875H4.01598C4.48473 9.875 4.86115 9.79403 5.14524 9.6321C5.42933 9.47017 5.6353 9.25142 5.76314 8.97585C5.89382 8.69744 5.95916 8.38352 5.95916 8.03409C5.95916 7.68466 5.89382 7.37216 5.76314 7.09659C5.6353 6.82102 5.42791 6.60511 5.14098 6.44886C4.85405 6.28977 4.47337 6.21023 3.99893 6.21023H2.14098V14H1.08416ZM11.1538 14.1364C10.5629 14.1364 10.0444 13.9957 9.59837 13.7145C9.15518 13.4332 8.80859 13.0398 8.55859 12.5341C8.31143 12.0284 8.18786 11.4375 8.18786 10.7614C8.18786 10.0795 8.31143 9.48437 8.55859 8.97585C8.80859 8.46733 9.15518 8.07244 9.59837 7.79119C10.0444 7.50994 10.5629 7.36932 11.1538 7.36932C11.7447 7.36932 12.2617 7.50994 12.7049 7.79119C13.1509 8.07244 13.4975 8.46733 13.7447 8.97585C13.9947 9.48437 14.1197 10.0795 14.1197 10.7614C14.1197 11.4375 13.9947 12.0284 13.7447 12.5341C13.4975 13.0398 13.1509 13.4332 12.7049 13.7145C12.2617 13.9957 11.7447 14.1364 11.1538 14.1364ZM11.1538 13.233C11.6026 13.233 11.9719 13.1179 12.2617 12.8878C12.5515 12.6577 12.766 12.3551 12.9052 11.9801C13.0444 11.6051 13.114 11.1989 13.114 10.7614C13.114 10.3239 13.0444 9.91619 12.9052 9.53835C12.766 9.16051 12.5515 8.85511 12.2617 8.62216C11.9719 8.3892 11.6026 8.27273 11.1538 8.27273C10.7049 8.27273 10.3356 8.3892 10.0458 8.62216C9.75604 8.85511 9.54155 9.16051 9.40234 9.53835C9.26314 9.91619 9.19354 10.3239 9.19354 10.7614C9.19354 11.1989 9.26314 11.6051 9.40234 11.9801C9.54155 12.3551 9.75604 12.6577 10.0458 12.8878C10.3356 13.1179 10.7049 13.233 11.1538 13.233ZM16.9151 14L14.9208 7.45455H15.9776L17.3924 12.4659H17.4606L18.8583 7.45455H19.9322L21.3129 12.4489H21.381L22.7958 7.45455H23.8526L21.8583 14H20.8697L19.4379 8.97159H19.3356L17.9038 14H16.9151ZM27.7038 14.1364C27.0732 14.1364 26.5291 13.9972 26.0717 13.7188C25.6172 13.4375 25.2663 13.0455 25.0192 12.5426C24.7749 12.0369 24.6527 11.4489 24.6527 10.7784C24.6527 10.108 24.7749 9.51705 25.0192 9.00568C25.2663 8.49148 25.6101 8.09091 26.0504 7.80398C26.4936 7.5142 27.0107 7.36932 27.6016 7.36932C27.9425 7.36932 28.2791 7.42614 28.6115 7.53977C28.9439 7.65341 29.2464 7.83807 29.5192 8.09375C29.7919 8.34659 30.0092 8.68182 30.1712 9.09943C30.3331 9.51705 30.4141 10.0312 30.4141 10.642V11.0682H25.3686V10.1989H29.3913C29.3913 9.82955 29.3175 9.5 29.1697 9.21023C29.0249 8.92045 28.8175 8.69176 28.5476 8.52415C28.2805 8.35653 27.9652 8.27273 27.6016 8.27273C27.201 8.27273 26.8544 8.37216 26.5618 8.57102C26.272 8.76705 26.049 9.02273 25.8928 9.33807C25.7365 9.65341 25.6584 9.99148 25.6584 10.3523V10.9318C25.6584 11.4261 25.7436 11.8452 25.9141 12.1889C26.0874 12.5298 26.3274 12.7898 26.6342 12.9688C26.9411 13.1449 27.2976 13.233 27.7038 13.233C27.968 13.233 28.2067 13.196 28.4197 13.1222C28.6357 13.0455 28.8217 12.9318 28.978 12.7812C29.1342 12.6278 29.255 12.4375 29.3402 12.2102L30.3118 12.483C30.2095 12.8125 30.0376 13.1023 29.7962 13.3523C29.5547 13.5994 29.2564 13.7926 28.9013 13.9318C28.5462 14.0682 28.147 14.1364 27.7038 14.1364ZM31.9439 14V7.45455H32.9155V8.44318H32.9837C33.103 8.11932 33.3189 7.85653 33.6314 7.65483C33.9439 7.45312 34.2962 7.35227 34.6882 7.35227C34.7621 7.35227 34.8544 7.35369 34.9652 7.35653C35.076 7.35937 35.1598 7.36364 35.2166 7.36932V8.39205C35.1825 8.38352 35.1044 8.37074 34.9822 8.35369C34.8629 8.33381 34.7365 8.32386 34.603 8.32386C34.2848 8.32386 34.0007 8.39062 33.7507 8.52415C33.5036 8.65483 33.3075 8.83665 33.1626 9.0696C33.0206 9.29972 32.9496 9.5625 32.9496 9.85795V14H31.9439ZM38.9538 14.1364C38.3232 14.1364 37.7791 13.9972 37.3217 13.7188C36.8672 13.4375 36.5163 13.0455 36.2692 12.5426C36.0249 12.0369 35.9027 11.4489 35.9027 10.7784C35.9027 10.108 36.0249 9.51705 36.2692 9.00568C36.5163 8.49148 36.8601 8.09091 37.3004 7.80398C37.7436 7.5142 38.2607 7.36932 38.8516 7.36932C39.1925 7.36932 39.5291 7.42614 39.8615 7.53977C40.1939 7.65341 40.4964 7.83807 40.7692 8.09375C41.0419 8.34659 41.2592 8.68182 41.4212 9.09943C41.5831 9.51705 41.6641 10.0312 41.6641 10.642V11.0682H36.6186V10.1989H40.6413C40.6413 9.82955 40.5675 9.5 40.4197 9.21023C40.2749 8.92045 40.0675 8.69176 39.7976 8.52415C39.5305 8.35653 39.2152 8.27273 38.8516 8.27273C38.451 8.27273 38.1044 8.37216 37.8118 8.57102C37.522 8.76705 37.299 9.02273 37.1428 9.33807C36.9865 9.65341 36.9084 9.99148 36.9084 10.3523V10.9318C36.9084 11.4261 36.9936 11.8452 37.1641 12.1889C37.3374 12.5298 37.5774 12.7898 37.8842 12.9688C38.1911 13.1449 38.5476 13.233 38.9538 13.233C39.218 13.233 39.4567 13.196 39.6697 13.1222C39.8857 13.0455 40.0717 12.9318 40.228 12.7812C40.3842 12.6278 40.505 12.4375 40.5902 12.2102L41.5618 12.483C41.4595 12.8125 41.2876 13.1023 41.0462 13.3523C40.8047 13.5994 40.5064 13.7926 40.1513 13.9318C39.7962 14.0682 39.397 14.1364 38.9538 14.1364ZM45.6655 14.1364C45.12 14.1364 44.6385 13.9986 44.2209 13.723C43.8033 13.4446 43.4766 13.0526 43.2408 12.5469C43.005 12.0384 42.8871 11.4375 42.8871 10.7443C42.8871 10.0568 43.005 9.46023 43.2408 8.95455C43.4766 8.44886 43.8047 8.05824 44.2251 7.78267C44.6456 7.5071 45.1314 7.36932 45.6825 7.36932C46.1087 7.36932 46.4453 7.44034 46.6925 7.58239C46.9425 7.72159 47.1328 7.88068 47.2635 8.05966C47.397 8.2358 47.5007 8.38068 47.5746 8.49432H47.6598V5.27273H48.6655V14H47.6939V12.9943H47.5746C47.5007 13.1136 47.3956 13.2642 47.2592 13.446C47.1229 13.625 46.9283 13.7855 46.6754 13.9276C46.4226 14.0668 46.0859 14.1364 45.6655 14.1364ZM45.8018 13.233C46.2053 13.233 46.5462 13.1278 46.8246 12.9176C47.103 12.7045 47.3146 12.4105 47.4595 12.0355C47.6044 11.6577 47.6768 11.2216 47.6768 10.7273C47.6768 10.2386 47.6058 9.81108 47.4638 9.4446C47.3217 9.07528 47.1115 8.78835 46.8331 8.58381C46.5547 8.37642 46.2109 8.27273 45.8018 8.27273C45.3757 8.27273 45.0206 8.3821 44.7365 8.60085C44.4553 8.81676 44.2436 9.1108 44.1016 9.48295C43.9624 9.85227 43.8928 10.267 43.8928 10.7273C43.8928 11.1932 43.9638 11.6165 44.1058 11.9972C44.2507 12.375 44.4638 12.6761 44.745 12.9006C45.0291 13.1222 45.3814 13.233 45.8018 13.233ZM54.1584 14V5.27273H55.1641V8.49432H55.2493C55.3232 8.38068 55.4254 8.2358 55.5561 8.05966C55.6896 7.88068 55.88 7.72159 56.1271 7.58239C56.3771 7.44034 56.7152 7.36932 57.1413 7.36932C57.6925 7.36932 58.1783 7.5071 58.5987 7.78267C59.0192 8.05824 59.3473 8.44886 59.5831 8.95455C59.8189 9.46023 59.9368 10.0568 59.9368 10.7443C59.9368 11.4375 59.8189 12.0384 59.5831 12.5469C59.3473 13.0526 59.0206 13.4446 58.603 13.723C58.1854 13.9986 57.7038 14.1364 57.1584 14.1364C56.7379 14.1364 56.4013 14.0668 56.1484 13.9276C55.8956 13.7855 55.701 13.625 55.5646 13.446C55.4283 13.2642 55.3232 13.1136 55.2493 12.9943H55.13V14H54.1584ZM55.147 10.7273C55.147 11.2216 55.2195 11.6577 55.3643 12.0355C55.5092 12.4105 55.7209 12.7045 55.9993 12.9176C56.2777 13.1278 56.6186 13.233 57.022 13.233C57.4425 13.233 57.7933 13.1222 58.0746 12.9006C58.3587 12.6761 58.5717 12.375 58.7138 11.9972C58.8587 11.6165 58.9311 11.1932 58.9311 10.7273C58.9311 10.267 58.8601 9.85227 58.718 9.48295C58.5788 9.1108 58.3672 8.81676 58.0831 8.60085C57.8018 8.3821 57.4482 8.27273 57.022 8.27273C56.6129 8.27273 56.2692 8.37642 55.9908 8.58381C55.7124 8.78835 55.5021 9.07528 55.3601 9.4446C55.218 9.81108 55.147 10.2386 55.147 10.7273ZM61.8885 16.4545C61.718 16.4545 61.5661 16.4403 61.4325 16.4119C61.299 16.3864 61.2067 16.3608 61.1555 16.3352L61.4112 15.4489C61.6555 15.5114 61.8714 15.5341 62.0589 15.517C62.2464 15.5 62.4126 15.4162 62.5575 15.2656C62.7053 15.1179 62.8402 14.8778 62.9624 14.5455L63.1499 14.0341L60.7294 7.45455H61.8203L63.6271 12.6705H63.6953L65.5021 7.45455H66.593L63.8146 14.9545C63.6896 15.2926 63.5348 15.5724 63.3501 15.794C63.1655 16.0185 62.951 16.1847 62.7067 16.2926C62.4652 16.4006 62.1925 16.4545 61.8885 16.4545Z" fill="#7D7D7D"></path><path d="M80.7171 4.97185e-07C79.9625 0.00374619 79.216 0.156195 78.5203 0.448667C77.8245 0.741139 77.1932 1.16793 76.6623 1.70459C76.1314 2.24125 75.7114 2.87731 75.4262 3.57644C75.141 4.27557 74.9962 5.02407 75.0001 5.7792V7.68811H79.6452V4.92249C79.6451 4.79261 79.6706 4.66399 79.7203 4.54398C79.7699 4.42397 79.8427 4.31493 79.9345 4.22308C80.0262 4.13123 80.1352 4.0584 80.2551 4.0087C80.375 3.95901 80.5035 3.93344 80.6333 3.93347H80.8008C80.9306 3.93344 81.0591 3.95901 81.1791 4.0087C81.299 4.0584 81.408 4.13123 81.4997 4.22308C81.5915 4.31493 81.6643 4.42397 81.714 4.54398C81.7636 4.66399 81.7892 4.7926 81.7892 4.92249V12.3365C82.3992 12.3365 83.0032 12.2163 83.5668 11.9827C84.1304 11.7491 84.6425 11.4067 85.0738 10.975C85.5052 10.5434 85.8473 10.031 86.0807 9.46701C86.3142 8.90303 86.4343 8.29855 86.4343 7.68811V5.7792C86.4376 4.24921 85.8355 2.7801 84.7597 1.69297C84.2318 1.1565 83.6025 0.730534 82.9084 0.439879C82.2144 0.149224 81.4694 -0.000314683 80.7171 4.97185e-07Z" fill="#7D7D7D"></path><path d="M80.801 16.0903H80.6336C80.5038 16.0903 80.3753 16.0648 80.2554 16.0151C80.1355 15.9654 80.0265 15.8925 79.9348 15.8007C79.843 15.7089 79.7702 15.5999 79.7206 15.4799C79.6709 15.3599 79.6454 15.2313 79.6454 15.1014V7.6875C79.0354 7.68745 78.4313 7.80763 77.8677 8.04121C77.3041 8.27479 76.7921 8.61718 76.3607 9.04883C75.9294 9.48048 75.5872 9.99293 75.3538 10.5569C75.1204 11.1209 75.0002 11.7254 75.0003 12.3358V14.2182C74.9926 14.9744 75.1347 15.7246 75.4186 16.4256C75.7024 17.1265 76.1223 17.7641 76.6539 18.3016C77.1856 18.8391 77.8184 19.2658 78.5159 19.557C79.2134 19.8482 79.9616 19.9981 80.7174 19.9981C81.4731 19.9981 82.2214 19.8482 82.9189 19.557C83.6163 19.2658 84.2492 18.8391 84.7808 18.3016C85.3125 17.7641 85.7324 17.1265 86.0162 16.4256C86.3001 15.7246 86.4422 14.9744 86.4345 14.2182V12.3358H81.7894V15.1014C81.7894 15.2313 81.7638 15.3599 81.7141 15.4799C81.6645 15.5999 81.5917 15.7089 81.4999 15.8007C81.4081 15.8926 81.2991 15.9654 81.1792 16.0151C81.0593 16.0648 80.9308 16.0903 80.801 16.0903Z" fill="#7D7D7D"></path><path d="M94.3741 5.86719H92.7461V14.132H97.5245V12.5738H94.3743L94.3741 5.86719Z" fill="#7D7D7D"></path><path d="M102.74 8.92741C102.51 8.64184 102.216 8.41482 101.882 8.265C101.547 8.11518 101.182 8.04682 100.816 8.06552C100.434 8.06251 100.056 8.14161 99.7066 8.29747C99.3575 8.45333 99.0459 8.68233 98.7928 8.969C98.2495 9.57826 97.9492 10.3663 97.9492 11.1828C97.9492 11.9994 98.2495 12.7875 98.7928 13.3967C99.046 13.6833 99.3576 13.9122 99.7067 14.068C100.056 14.2238 100.434 14.3028 100.816 14.2998C101.642 14.2998 102.283 14.0125 102.74 13.4379V14.1346H104.262V8.23127H102.74V8.92741ZM102.274 12.3811C102.12 12.5349 101.937 12.6556 101.735 12.7358C101.533 12.8159 101.317 12.8539 101.1 12.8474C100.883 12.8543 100.668 12.8165 100.467 12.7363C100.266 12.656 100.084 12.5351 99.9315 12.3811C99.6352 12.0523 99.4713 11.6253 99.4713 11.1826C99.4713 10.7398 99.6352 10.3128 99.9315 9.98405C100.084 9.83016 100.266 9.70932 100.467 9.62912C100.668 9.54891 100.883 9.51106 101.1 9.5179C101.317 9.51145 101.533 9.54949 101.735 9.62965C101.937 9.70981 102.12 9.8304 102.274 9.98405C102.573 10.3112 102.74 10.7388 102.74 11.1826C102.74 11.6263 102.573 12.054 102.274 12.3811Z" fill="#7D7D7D"></path><path d="M108.183 12.1983L106.644 8.23047H104.98L107.398 13.9452C107.297 14.2862 107.098 14.59 106.826 14.8189C106.54 15.013 106.197 15.1046 105.853 15.0789V16.4959C106.524 16.5581 107.196 16.3755 107.744 15.9818C108.25 15.5994 108.657 14.9868 108.964 14.144L111.115 8.23086H109.486L108.183 12.1983Z" fill="#7D7D7D"></path><path d="M114.408 8.06435C113.993 8.04976 113.579 8.12144 113.193 8.27492C112.808 8.4284 112.458 8.66034 112.166 8.95602C111.603 9.5619 111.291 10.3593 111.293 11.1868C111.295 12.0143 111.611 12.8101 112.178 13.413C112.768 14.0032 113.55 14.2983 114.526 14.2985C115.658 14.2985 116.516 13.8774 117.098 13.0354L115.871 12.3267C115.715 12.5249 115.513 12.6821 115.283 12.785C115.053 12.8878 114.801 12.9331 114.549 12.9171C113.645 12.9171 113.09 12.5472 112.886 11.8074H117.334C117.372 11.6009 117.392 11.3913 117.393 11.1813C117.415 10.359 117.112 9.56117 116.549 8.96164C116.277 8.66818 115.945 8.4363 115.575 8.28156C115.206 8.12682 114.808 8.05278 114.408 8.06435ZM112.862 10.6266C112.93 10.2797 113.118 9.96795 113.393 9.74673C113.686 9.53011 114.044 9.41976 114.407 9.43393C114.74 9.4296 115.065 9.53324 115.334 9.7293C115.62 9.9496 115.812 10.2702 115.871 10.6264L112.862 10.6266Z" fill="#7D7D7D"></path><path d="M119.977 9.24278V8.22711H118.455V14.1307H119.977V11.3089C119.977 10.7422 120.16 10.3368 120.526 10.0927C120.892 9.84857 121.335 9.74772 121.771 9.8093V8.10955C121.388 8.10469 121.011 8.20253 120.679 8.39291C120.351 8.58328 120.102 8.88473 119.977 9.24278Z" fill="#7D7D7D"></path><path d="M129.192 7.14542V5.86719H123.779V7.4258H127.13L123.691 12.8304V14.1318H129.258V12.5736H125.754L129.192 7.14542Z" fill="#7D7D7D"></path><path d="M132.851 8.06436C132.436 8.04976 132.023 8.12144 131.637 8.27492C131.251 8.4284 130.901 8.66033 130.61 8.95603C130.046 9.56188 129.734 10.3593 129.736 11.1869C129.739 12.0144 130.055 12.8101 130.621 13.413C131.211 14.0032 131.994 14.2983 132.969 14.2985C134.102 14.2985 134.959 13.8774 135.541 13.0354L134.314 12.3267C134.158 12.5249 133.957 12.6821 133.726 12.7849C133.496 12.8878 133.245 12.9331 132.993 12.9171C132.088 12.9171 131.534 12.5472 131.329 11.8074H135.778C135.815 11.6008 135.835 11.3913 135.836 11.1813C135.859 10.359 135.556 9.56117 134.993 8.96164C134.72 8.66817 134.388 8.4363 134.019 8.28156C133.65 8.12682 133.252 8.05277 132.851 8.06436ZM131.306 10.6266C131.373 10.2797 131.561 9.96789 131.837 9.74673C132.13 9.53004 132.487 9.41968 132.851 9.43394C133.184 9.4295 133.509 9.53315 133.778 9.7293C134.064 9.94957 134.255 10.2702 134.314 10.6264L131.306 10.6266Z" fill="#7D7D7D"></path><path d="M138.421 9.24669V8.23101H136.898V14.1346H138.421V11.3128C138.421 10.7461 138.603 10.3407 138.969 10.0966C139.335 9.85249 139.778 9.75164 140.214 9.81321V8.11345C139.831 8.10863 139.454 8.20648 139.123 8.39681C138.795 8.58715 138.546 8.88862 138.421 9.24669Z" fill="#7D7D7D"></path><path d="M143.683 8.06329C142.969 8.07118 142.28 8.32617 141.732 8.78497C141.185 9.24376 140.813 9.87809 140.679 10.5802C140.546 11.2823 140.66 12.009 141.001 12.6368C141.342 13.2646 141.89 13.7548 142.552 14.0243C143.213 14.2937 143.948 14.3257 144.63 14.1149C145.312 13.904 145.901 13.4633 146.295 12.8676C146.69 12.2719 146.866 11.558 146.795 10.8469C146.723 10.1358 146.407 9.4715 145.902 8.96678C145.613 8.67219 145.268 8.43996 144.886 8.28455C144.505 8.12914 144.095 8.05383 143.683 8.06329ZM144.828 12.3493C144.679 12.5001 144.5 12.6187 144.303 12.6978C144.106 12.7769 143.896 12.8148 143.683 12.8092C143.472 12.8152 143.262 12.7775 143.066 12.6983C142.87 12.6192 142.692 12.5004 142.544 12.3493C142.252 12.0302 142.09 11.6131 142.09 11.1803C142.09 10.7476 142.252 10.3305 142.544 10.0114C142.692 9.86036 142.87 9.74158 143.066 9.66243C143.262 9.58328 143.472 9.54548 143.683 9.55146C143.896 9.54589 144.106 9.58387 144.303 9.66297C144.5 9.74207 144.679 9.86063 144.828 10.0114C145.124 10.3287 145.288 10.7464 145.288 11.1803C145.288 11.6142 145.124 12.032 144.828 12.3493Z" fill="#7D7D7D"></path><path d="M149.999 12.3125H148.146V14.1308H149.999V12.3125Z" fill="#7D7D7D"></path></svg></a>
              </p>


              <div className={`modal-container ${isModalOpen ? 'active' : ''}`}>
                <div className={'class111 ' + (isModalOpen ? "modal-background" : null)} onClick={() => toggleModal}></div>

                <div id="referralModal" className="modal fade">
                  <div className="modal-dialog modal-dialog-centered modal-lg modal-confirm">
                    <div className="modal-content">
                      <div className="modal-body text-white text-start">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => toggleModal}></button>
                        <h4 className='mb-3'>Referral Program</h4>
                        <div className="row mb-3">
                          <div className="col-lg-4 col-md-12">
                            <div className='ralert alert alert-secondary'>
                              <h1>{refCount}</h1>
                              <span>Total referral</span>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                            <div className='ralert alert alert-secondary'>
                              <h1>{mintedRefCount}</h1>
                              <span>Total minted referral</span>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-12">
                            <div className='ralert alert alert-secondary'>
                              <h1>{mintedRefCount*200}</h1>
                              <span>Referral Omni Points</span>
                            </div>
                          </div>
                        </div>
                        <p className='mb-4'>Share your referral link with friends. When they mint an ONFT, both you and your friend will receive a reward of 200 Omni points.</p>

                        {firstMintDone?
                        <div className="field d-flex align-items-center justify-content-between">
                          <span className="fa fa-link text-center"></span>
                          <input type="text" value={refLink} ref={inputRef} />
                          <button onClick={()=>handleCopyClick()}>Copy</button>
                        </div>
                        :
                        <div>
                          <h5 className='text-warning'>{message}</h5>
                        </div>
                        }

                        <p className='mt-4'>Share this link via:</p>
                        <div className="d-flex align-items-center icons mb-0">
                          {/* <a href="#" className="fs-5 d-flex align-items-center justify-content-center">
                            <span className="fa fa-facebook-f"></span>
                          </a> */}
                          <a href={`https://twitter.com/intent/tweet?text=Just%20minted%20my%20%40Omni_Art_%20ONFT,%20powered%20by%20%40LayerZero_Labs!%20%F0%9F%9A%80%0A%0AStep%20into%20the%20exciting%20world%20of%20Omnichain%20NFTs%20and%20start%20your%20journey.%0A%0AMint%20yours%20now%3A%20${refLink}%0A%0ABy%20using%20my%20referral%20link,%20we%20both%20earn%20200%20Omni%20points.%0A%0ARemember,%20these%20points%20hold%20future%20value.`} className="fs-5 d-flex align-items-center justify-content-center" target='_blank' rel="noreferrer">
                            <span className="fa-brands fa-twitter"></span>
                          </a>
                          <a href={`https://t.me/share/url?url=Just%20minted%20my%20%40Omni_Art_%20ONFT,%20powered%20by%20%40LayerZero_Labs!%20%F0%9F%9A%80%0A%0AStep%20into%20the%20exciting%20world%20of%20Omnichain%20NFTs%20and%20start%20your%20journey.%0A%0AMint%20yours%20now%3A%20${refLink}%0A%0ABy%20using%20my%20referral%20link,%20we%20both%20earn%20200%20Omni%20points.%0A%0ARemember,%20these%20points%20hold%20future%20value.`} className="fs-5 d-flex align-items-center justify-content-center" target='_blank' rel="noreferrer">
                            <span className="fa-brands fa-telegram"></span>

                          </a>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                </div>

            </div>

            <div className="container">
              <footer className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="col-md-4 d-flex align-items-center">
                  <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                        
                  </a>
                  <span className="text-muted">© 2023, Omniart.app</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                  <li className="ms-3">
                    <a className="text-muted" href="https://twitter.com/Omni_Art_" target='_blank' rel="noreferrer">
                      <i className='fa-brands fa-twitter'></i>
                    </a>
                  </li>
                  <li className="ms-3">
                    <a className="text-muted" href="https://discord.gg/kUCHQfNMYp" target='_blank' rel="noreferrer">
                      <i className="fa-brands fa-discord"></i>
                    </a>
                  </li>
                </ul>
              </footer>
            </div>

          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
    : 
    <h1>Unauthorize activity detected. Your account is in risk. All activities has been reported to OmniArt administrators.</h1>
  );
}

export default App;
