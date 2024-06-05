import v1_ENUM_Polygon from "./abis/v1/enum_polygon.json";
import v1_ENUM_Optimism from "./abis/v1/enum_optimism.json"
import v1_ENUM_ZkSync from "./abis/v1/enum_zksync.json";
import v1_ENUM_Base from "./abis/v1/enum_base.json";
import v1_ENUM_Linea from "./abis/v1/enum_linea.json";
import v1_ENUM_Mantle from "./abis/v1/enum_mantle.json";
import v1_ENUM_Polygon_Zkevm from "./abis/v1/enum_polygon_zkevm.json";
import v1_ENUM_BSC from "./abis/v1/enum_bsc.json";

import v2_ENUM_Common from "./abis/v2/common.json";
import v3_ENUM_Common from "./abis/v3/common.json";
import v4_ENUM_Common from "./abis/v4/common.json";
import v5_ENUM_Common from "./abis/v5/common.json";
import v6_ENUM_Common from "./abis/v6/common.json";
import v7_ENUM_Common from "./abis/v7/common.json";
import v8_ENUM_Common from "./abis/v8/common.json";

const Collections = {
	"OARTONFT" : {
		"v1": {
			"polygon": {
				contractAddress: "0x3DD2eDb1f60e09D0FB7b84a2cCaB2987a80aE9FF",
				abi: v1_ENUM_Polygon,
			},
			"optimism": {
				contractAddress: "0x3A584caaF4b0BfA8653895Ae8c9AfD2e309f140B",
				abi: v1_ENUM_Optimism,
			},
			"zksync": {
				contractAddress: "0x3dDF4073fE67b94c955BFe3AFFd7212E84a96112",
				abi: v1_ENUM_ZkSync,
			},
			"bsc": {
				contractAddress: "0xdfd719bfc9c52e180BA56bbc368c62d4d060C8D0",
				abi: v1_ENUM_BSC,
			},
			"base": {
				contractAddress: "0xa89c4c5D9DB28708D371A9315A777602ae321108",
				abi: v1_ENUM_Base,
			},
			"polygon-zkevm": {
				contractAddress: "0xdfd719bfc9c52e180BA56bbc368c62d4d060C8D0",
				abi: v1_ENUM_Polygon_Zkevm,
			},
			"linea": {
				contractAddress: "0xa89c4c5D9DB28708D371A9315A777602ae321108",
				abi: v1_ENUM_Linea,
			},
			"mantle": {
				contractAddress: "0x2e801D9f388b750C6Cb25c27dF5d104384Ff3daB",
				abi: v1_ENUM_Mantle,
			},
		},
		"v2": {
			"bsc": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"polygon": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"arbitrum": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"optimism": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"fantom": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"harmony": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"celo": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"metis": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"coredao": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"okx": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"canto": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"tenet": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"meter": {
				contractAddress: "0xb1bCF4A6fC0B52e0A3B365562109B5b21D13497a",
				abi: v2_ENUM_Common
			},
			"kava": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"linea": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"base": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"mantle": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"loot": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"zora": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v2_ENUM_Common
			},
			"zksync": {
				contractAddress: "0xB918A15A48B62459D6aBabd02f392Aa7d65dA8a9",
				abi: v2_ENUM_Common
			},
		},
		"v3": {
			"bsc": {
				contractAddress: "0xB8a5B058400F3e22fa4FD7A23f23D7318Db52867",
				abi: v3_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0x12ddc973Ea19693D6507c827c153a1e6bE752E67",
				abi: v3_ENUM_Common
			},
			"polygon": {
				contractAddress: "0x672725AB3fF13bC100bD20e9041957E46FC6C94c",
				abi: v3_ENUM_Common
			},
			"arbitrum": {
				contractAddress: "0x27dc6d58c00D34696B2AdeD5d9a2a06E3A740Fb7",
				abi: v3_ENUM_Common
			},
			"optimism": {
				contractAddress: "0x175860F1629583526F74123df5B25e017E238e2b",
				abi: v3_ENUM_Common
			},
			"fantom": {
				contractAddress: "0x40348cca5Efabac151275Bc24cdB86FB4CE613C9",
				abi: v3_ENUM_Common
			},
			"harmony": {
				contractAddress: "0xd4bf75DFE513299Baa6EEf64D89441304Ae6b26B",
				abi: v3_ENUM_Common
			},
			"celo": {
				contractAddress: "0x47cdAfb76d5F78AEe823A95110d1efF91ef8d1a1",
				abi: v3_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0x47cdAfb76d5F78AEe823A95110d1efF91ef8d1a1",
				abi: v3_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x5d359eC7dbb430b87b1856167E5E5E51595E1900",
				abi: v3_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0x47cdAfb76d5F78AEe823A95110d1efF91ef8d1a1",
				abi: v3_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0xF0EB70DB12281c51769b63DfeAdbb7c17fb68207",
				abi: v3_ENUM_Common
			},
			"metis": {
				contractAddress: "0x59C0dF5517B9F0BDda7530c073486C12f6F08496",
				abi: v3_ENUM_Common
			},
			"coredao": {
				contractAddress: "0x59C0dF5517B9F0BDda7530c073486C12f6F08496",
				abi: v3_ENUM_Common
			},
			"okx": {
				contractAddress: "0x5d359eC7dbb430b87b1856167E5E5E51595E1900",
				abi: v3_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0x12ddc973Ea19693D6507c827c153a1e6bE752E67",
				abi: v3_ENUM_Common
			},
			"canto": {
				contractAddress: "0x59C0dF5517B9F0BDda7530c073486C12f6F08496",
				abi: v3_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x59C0dF5517B9F0BDda7530c073486C12f6F08496",
				abi: v3_ENUM_Common
			},
			"tenet": {
				contractAddress: "0x47cdAfb76d5F78AEe823A95110d1efF91ef8d1a1",
				abi: v3_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0x47cdAfb76d5F78AEe823A95110d1efF91ef8d1a1",
				abi: v3_ENUM_Common
			},
			"meter": {
				contractAddress: "0x26c4e8ad5836F971540F90eFadbf13A211FBB09d",
				abi: v3_ENUM_Common
			},
			"kava": {
				contractAddress: "0x59C0dF5517B9F0BDda7530c073486C12f6F08496",
				abi: v3_ENUM_Common
			},
			"linea": {
				contractAddress: "0x27dc6d58c00D34696B2AdeD5d9a2a06E3A740Fb7",
				abi: v3_ENUM_Common
			},
			"base": {
				contractAddress: "0xFAEDcd8708f21dBf5e6EC04D4188a50eC432C458",
				abi: v3_ENUM_Common
			},
			"mantle": {
				contractAddress: "0xB0D9989DaE1840275FfCA995DF7AA915d58e2818",
				abi: v3_ENUM_Common
			},
			"loot": {
				contractAddress: "0x5d359eC7dbb430b87b1856167E5E5E51595E1900",
				abi: v3_ENUM_Common
			},
			"zora": {
				contractAddress: "0xaD11CF36e60c736E28A1Ae4ef898794a6f7f80b9",
				abi: v3_ENUM_Common
			},
			"zksync": {
				contractAddress: "0x771E02a79fcad9fC59AF430D56b97DF61D5cdC85",
				abi: v3_ENUM_Common
			},
		},
		"v4": {
			"bsc": {
				contractAddress: "0x97e1d5B29eDB0745e5d2508eCc7d875d3CAA0668",
				abi: v4_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0xDFb67D932E8099a49fA11E236A2ec7d5D7473d4C",
				abi: v4_ENUM_Common
			},
			"polygon": {
				contractAddress: "0x0f07487F741a0fDCAcC490d771E47B3258c99795",
				abi: v4_ENUM_Common
			},
			"arbitrum": {
				contractAddress: "0xBEA6a36D968E6b0E3E3d87C78a037609166e66dB",
				abi: v4_ENUM_Common
			},
			"optimism": {
				contractAddress: "0x5eB4c2b550d0f69f2A01D95205fb45a4a7D9708E",
				abi: v4_ENUM_Common
			},
			"fantom": {
				contractAddress: "0xb286cf2Af780BCe85720cf5E7f8c49D2CA08C41B",
				abi: v4_ENUM_Common
			},
			"harmony": {
				contractAddress: "0xA3f57c1BdD1Fc3CF804Ddd3bC6848Bd2E65445F2",
				abi: v4_ENUM_Common
			},
			"celo": {
				contractAddress: "0x672725AB3fF13bC100bD20e9041957E46FC6C94c",
				abi: v4_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0x7e0b3fa4ADA805141812753f14ec19370ab75f1F",
				abi: v4_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x27dc6d58c00D34696B2AdeD5d9a2a06E3A740Fb7",
				abi: v4_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0xbD67dBB3B75DbaB3f1111d87A5A7caf6D9F6774A",
				abi: v4_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0x55798087E4E349422984d7b26FeE5cd796c8DAd8",
				abi: v4_ENUM_Common
			},
			"metis": {
				contractAddress: "0x659Dd94aee9f0e3D78247dcb51A2B6E5Ab68F09B",
				abi: v4_ENUM_Common
			},
			"coredao": {
				contractAddress: "0xFAEDcd8708f21dBf5e6EC04D4188a50eC432C458",
				abi: v4_ENUM_Common
			},
			"okx": {
				contractAddress: "0x27dc6d58c00D34696B2AdeD5d9a2a06E3A740Fb7",
				abi: v4_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0xFB6d1dFB7607bA243A3f8ed6982A79bcb3F21e03",
				abi: v4_ENUM_Common
			},
			"canto": {
				contractAddress: "0x162c556C2033043761F060182eE8AB69d846CbfB",
				abi: v4_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x7e0b3fa4ADA805141812753f14ec19370ab75f1F",
				abi: v4_ENUM_Common
			},
			"tenet": {
				contractAddress: "0xbD67dBB3B75DbaB3f1111d87A5A7caf6D9F6774A",
				abi: v4_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0xbD67dBB3B75DbaB3f1111d87A5A7caf6D9F6774A",
				abi: v4_ENUM_Common
			},
			"meter": {
				contractAddress: "0x5bAe27ddee73A2D813Ecd71aF20adda8863E1083",
				abi: v4_ENUM_Common
			},
			"kava": {
				contractAddress: "0x941E4fF1f4609Aa787AEAfAa8C96b68Ed60005Ff",
				abi: v4_ENUM_Common
			},
			"linea": {
				contractAddress: "0xfCF7E76c3D53b925d02b10f9B0afdad15a47993D",
				abi: v4_ENUM_Common
			},
			"base": {
				contractAddress: "0x8d6237919C61499753F3A02d6942eD3fFc9a09DD",
				abi: v4_ENUM_Common
			},
			"mantle": {
				contractAddress: "0x05a039334972d74cA9780Acb469439d0E25088C8",
				abi: v4_ENUM_Common
			},
			"loot": {
				contractAddress: "0x18A7192FAECfFED639a105E3d6d47dB18C93Be3f",
				abi: v4_ENUM_Common
			},
			"zora": {
				contractAddress: "0x84297bFA826F1F2E314aA037A8c527dd2b6246e6",
				abi: v4_ENUM_Common
			},
			"zksync": {
				contractAddress: "0x49F4571721a235010E7c8fE18a5a3DD645E9a40f",
				abi: v4_ENUM_Common
			},
		},
		"v5": {
			"arbitrum": {
				contractAddress: "0xf59C6D80054fF17185C08839FD23B1Da4A0c338A",
				abi: v5_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0x8d6237919C61499753F3A02d6942eD3fFc9a09DD",
				abi: v5_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0x3f026873779C9F46904Fde7A87cAa9f91F7C649E",
				abi: v5_ENUM_Common
			},
			"base": {
				contractAddress: "0xEDCa1F4663005c6Aec67dcd17ae3dc4a660a2678",
				abi: v5_ENUM_Common
			},
			"bsc": {
				contractAddress: "0x641c7C26d3497b4c09eA637cef8f69C336cA2AA5",
				abi: v5_ENUM_Common
			},
			"canto": {
				contractAddress: "0x8d6237919C61499753F3A02d6942eD3fFc9a09DD",
				abi: v5_ENUM_Common
			},
			"celo": {
				contractAddress: "0x03B4cf8eb5181D8FD9B50faeE18a76F5Ad911C91",
				abi: v5_ENUM_Common
			},
			"coredao": {
				contractAddress: "0x7e0b3fa4ADA805141812753f14ec19370ab75f1F",
				abi: v5_ENUM_Common
			},
			"fantom": {
				contractAddress: "0x901d63f7fc05F2F1eC272C47Fa14aD20562C8243",
				abi: v5_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x162c556C2033043761F060182eE8AB69d846CbfB",
				abi: v5_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0x84297bFA826F1F2E314aA037A8c527dd2b6246e6",
				abi: v5_ENUM_Common
			},
			"harmony": {
				contractAddress: "0xfCF7E76c3D53b925d02b10f9B0afdad15a47993D",
				abi: v5_ENUM_Common
			},
			"kava": {
				contractAddress: "0x096467337340339500Ca07ED501C1a4B26D1D29c",
				abi: v5_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0x39BAef4204791C9D94FC64c316f02859dEbA082C",
				abi: v5_ENUM_Common
			},
			"linea": {
				contractAddress: "0xD705Dbb1a0b192Cd6d7db184283a058d9C231f6D",
				abi: v5_ENUM_Common
			},
			"loot": {
				contractAddress: "0x162c556C2033043761F060182eE8AB69d846CbfB",
				abi: v5_ENUM_Common
			},
			"mantle": {
				contractAddress: "0x8cbf4dA87B169e04A2Fc534F73178066B2A755C3",
				abi: v5_ENUM_Common
			},
			"meter": {
				contractAddress: "0x1b7e6742475bb8b18Bf34E334B8a71E4f76b21D8",
				abi: v5_ENUM_Common
			},
			"metis": {
				contractAddress: "0x60327692D9027eD62d33A6690c1039699D6cCdaB",
				abi: v5_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0xBb404DA2886d1596E18D1A6325A56E0Bfbf18743",
				abi: v5_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x1C8241cef1D428Cba2677Bf04772E0094789b0fb",
				abi: v5_ENUM_Common
			},
			"okx": {
				contractAddress: "0x941E4fF1f4609Aa787AEAfAa8C96b68Ed60005Ff",
				abi: v5_ENUM_Common
			},
			"optimism": {
				contractAddress: "0x9E8f2BaFDbd2f1FFE3cB37EDa2E4FDC76cb99743",
				abi: v5_ENUM_Common
			},
			"polygon": {
				contractAddress: "0x5478e2E2c913832cb826fEb8CB1cAF10FE3fF0d8",
				abi: v5_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0x9616657aE527Ef22159DE45c79534F60c0D41b90",
				abi: v5_ENUM_Common
			},
			"tenet": {
				contractAddress: "0x3f53a64F9F5Ada6c85A75b59364A6E916A8d4e25",
				abi: v5_ENUM_Common
			},
			"zora": {
				contractAddress: "0xEf2fc0b1ae46570B703ED8031AD010CcD0a91985",
				abi: v5_ENUM_Common
			},
			"zksync": {
				contractAddress: "0x134d7e4E2FB9F5cC279f8B270aBF2951000dD849",
				abi: v5_ENUM_Common
			},
			"opbnb": {
				contractAddress: "0x056C043A9EF46f10BF28773a948Cb43cBbAEbfB5",
				abi: v5_ENUM_Common
			},
			"scroll": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v5_ENUM_Common
			}
		},
		"v6": {
			"arbitrum": {
				contractAddress: "0xc80Ec07d76f1bE66302942863b75EBAec9DDd6b2",
				abi: v6_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0xD705Dbb1a0b192Cd6d7db184283a058d9C231f6D",
				abi: v6_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0xc80Ec07d76f1bE66302942863b75EBAec9DDd6b2",
				abi: v6_ENUM_Common
			},
			"base": {
				contractAddress: "0x82aBAE87DcB8339392E28d705213c0A1c15edF42",
				abi: v6_ENUM_Common
			},
			"bsc": {
				contractAddress: "0x2bE24c5CbcB08754443555A02076EDc22151C8Bf",
				abi: v6_ENUM_Common
			},
			"canto": {
				contractAddress: "0xA1AD9A44Daf05192d207ED3177d442b93F8e6B5b",
				abi: v6_ENUM_Common
			},
			"celo": {
				contractAddress: "0xDFb67D932E8099a49fA11E236A2ec7d5D7473d4C",
				abi: v6_ENUM_Common
			},
			"coredao": {
				contractAddress: "0x19Aed3C177C728A81D63aCC1B0D2EC06bc4e33cf",
				abi: v6_ENUM_Common
			},
			"fantom": {
				contractAddress: "0x75665caEd278C0c9F56166b59B89839b3ed46ceb",
				abi: v6_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x25211369030c162e91368B715352D108576e46F6",
				abi: v6_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0x068AdCd698DF49E5cA615BB1684B7D999B4361d8",
				abi: v6_ENUM_Common
			},
			"harmony": {
				contractAddress: "0x123030A880B32C9500AeF141b5Ce5e95eF54de22",
				abi: v6_ENUM_Common
			},
			"kava": {
				contractAddress: "0xbebD7362Bb84981d0301B40D3Ff3bc573FCeFCf1",
				abi: v6_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0x6730D7a0f2F9fD66A83757E0198BD59C998Ec238",
				abi: v6_ENUM_Common
			},
			"linea": {
				contractAddress: "0x0A7532c586026BebA0D3adB6182157164A1248b3",
				abi: v6_ENUM_Common
			},
			"loot": {
				contractAddress: "0xBb404DA2886d1596E18D1A6325A56E0Bfbf18743",
				abi: v6_ENUM_Common
			},
			"mantle": {
				contractAddress: "0x60327692D9027eD62d33A6690c1039699D6cCdaB",
				abi: v6_ENUM_Common
			},
			"meter": {
				contractAddress: "0x909554F8A63c0A2602B125df8DfC76a39423FD04",
				abi: v6_ENUM_Common
			},
			"metis": {
				contractAddress: "0x5BFA5bAB209e768ecaB8963359377427664bD88D",
				abi: v6_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0x3f53a64F9F5Ada6c85A75b59364A6E916A8d4e25",
				abi: v6_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x8d6237919C61499753F3A02d6942eD3fFc9a09DD",
				abi: v6_ENUM_Common
			},
			"okx": {
				contractAddress: "0x060c943631773d7d5F168f9F646951b0855A92Da",
				abi: v6_ENUM_Common
			},
			"opbnb": {
				contractAddress: "0x39F556ab24743E5b2550cAD3E07b4F7E35a026b6",
				abi: v6_ENUM_Common
			},
			"optimism": {
				contractAddress: "0xCf0144E919e31b22194311969682a43E0024b9A1",
				abi: v6_ENUM_Common
			},
			"polygon": {
				contractAddress: "0x470E1D4386d9531fDf85b4Cde26b11E100901eC3",
				abi: v6_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0x7aC596965750062690A0773cB6590E2EFB2F8a20",
				abi: v6_ENUM_Common
			},
			"scroll": {
				contractAddress: "0x48cd969DaFa95A48c0b827998158A42B9819e417",
				abi: v6_ENUM_Common
			},
			"tenet": {
				contractAddress: "0xEDCa1F4663005c6Aec67dcd17ae3dc4a660a2678",
				abi: v6_ENUM_Common
			},
			"zora": {
				contractAddress: "0x59ca8937E5153B2A7DF27F19913EBd400B73F945",
				abi: v6_ENUM_Common
			},
			"zksync": {
				contractAddress: "0x47986c41Ecf093DD674c0419E51D720803773f6a",
				abi: v6_ENUM_Common
			}
		},
		"v7": {
			"celo": {
				contractAddress: "0xD705Dbb1a0b192Cd6d7db184283a058d9C231f6D",
				abi: v7_ENUM_Common
			},
			"okx": {
				contractAddress: "0x1daF8534B806b2A47f2C90b32d8973216d177d54",
				abi: v7_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0x8cbf4dA87B169e04A2Fc534F73178066B2A755C3",
				abi: v7_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0x5eB4c2b550d0f69f2A01D95205fb45a4a7D9708E",
				abi: v7_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0x12b348F3a09cc0704B4852f29CfC4F1E4F0C32D6",
				abi: v7_ENUM_Common
			},
			"optimism": {
				contractAddress: "0xBc412E4Df7015453EA001908A7564B925D2E005D",
				abi: v7_ENUM_Common
			},
			"opbnb": {
				contractAddress: "0xADFE8f3FdFAa6d25f9b696f40E5c7e8959d5A5Aa",
				abi: v7_ENUM_Common
			},
			"scroll": {
				contractAddress: "0xe3518ad42afdA522191B7afAB8Cde568e1A992CF",
				abi: v7_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0x07fDAc1C5fB7f7563F8a04E70dE7A978c794101D",
				abi: v7_ENUM_Common
			},
			"arbitrum": {
				contractAddress: "0xA6Ac23F8842d22aD12De3Ae1867Ea4d05996b271",
				abi: v7_ENUM_Common
			},
			"mantle": {
				contractAddress: "0x0Ac94cE112EB0842FC570516101AeE751e016204",
				abi: v7_ENUM_Common
			},
			"fantom": {
				contractAddress: "0x55E0315289277225906e4c94FBeA02896a1bD8A0",
				abi: v7_ENUM_Common
			},
			"harmony": {
				contractAddress: "0x60327692D9027eD62d33A6690c1039699D6cCdaB",
				abi: v7_ENUM_Common
			},
			"metis": {
				contractAddress: "0xf7Df2fa9812beA66729333AFb263bFbe218ae5d9",
				abi: v7_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x3536A5DcBf7dBFb857df65353Ff6b9360454a8B7",
				abi: v7_ENUM_Common
			},
			"coredao": {
				contractAddress: "0x060c943631773d7d5F168f9F646951b0855A92Da",
				abi: v7_ENUM_Common
			},
			"kava": {
				contractAddress: "0x9616657aE527Ef22159DE45c79534F60c0D41b90",
				abi: v7_ENUM_Common
			},
			"polygon": {
				contractAddress: "0x246a84Af2Ca749e9a7dbc74754651493466DF56b",
				abi: v7_ENUM_Common
			},
			"bsc": {
				contractAddress: "0x1cD812e8DC82D7847F90324151AD0E6777a453eF",
				abi: v7_ENUM_Common
			},
			"loot": {
				contractAddress: "0x84297bFA826F1F2E314aA037A8c527dd2b6246e6",
				abi: v7_ENUM_Common
			},
			"tenet": {
				contractAddress: "0x0A7532c586026BebA0D3adB6182157164A1248b3",
				abi: v7_ENUM_Common
			},
			"zora": {
				contractAddress: "0xbd026Dfc79B04ff593Df9ac72B783dcBe741C04f",
				abi: v7_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x5eB4c2b550d0f69f2A01D95205fb45a4a7D9708E",
				abi: v7_ENUM_Common
			},
			"canto": {
				contractAddress: "0xD72e3b39338b49eD86368c21671414e68f2C69E4",
				abi: v7_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0xEC8fac6239a9cF3EAa649909fF5CA716F0517f11",
				abi: v7_ENUM_Common
			},
			"meter": {
				contractAddress: "0x42815C02154a1590BcDa107BdbA60368af91c061",
				abi: v7_ENUM_Common
			},
			"linea": {
				contractAddress: "0x3561fa9660e99Fc69165F0461185d067e2e87D13",
				abi: v7_ENUM_Common
			},
			"base": {
				contractAddress: "0x7D4101Cad07b1D8af4160be9A74AD9dF9d7D6e69",
				abi: v7_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0x104882f96f096d5285209b627cAC59E740B8CdCc",
				abi: v7_ENUM_Common
			},
			"zksync": {
				contractAddress: "0x0DE00B322c2c51Db1bE395cAFbd591AF2E38efAc",
				abi: v7_ENUM_Common
			},
			"manta": {
				contractAddress: "0x88F087Ad825322d9eC3261712cf09A56e58575Fc",
				abi: v7_ENUM_Common
			}
		},
		"v8": {
			"celo": {
				contractAddress: "0xF194E470421436785C8Aa8347D1693A6a46a6969",
				abi: v8_ENUM_Common
			},
			"okx": {
				contractAddress: "0x3f53a64F9F5Ada6c85A75b59364A6E916A8d4e25",
				abi: v8_ENUM_Common
			},
			"klaytn": {
				contractAddress: "0xBEA6a36D968E6b0E3E3d87C78a037609166e66dB",
				abi: v8_ENUM_Common
			},
			"moonbeam": {
				contractAddress: "0xF8057738612709C1474F9fff2A32253fB002714f",
				abi: v8_ENUM_Common
			},
			"polygon-zkevm": {
				contractAddress: "0x7DA992Ab8d3a0e6EfD9a3996C69d16653C8C127C",
				abi: v8_ENUM_Common
			},
			"optimism": {
				contractAddress: "0xE29D2Adb5c8EbC4c5CaccB8C73d0F3f1Af7DCAC6",
				abi: v8_ENUM_Common
			},
			"opbnb": {
				contractAddress: "0x0e3884017edf5AEe53Cf771E1a968987f5420750",
				abi: v8_ENUM_Common
			},
			"scroll": {
				contractAddress: "0x23967c28235Ceea15298dcc02970d921fa704177",
				abi: v8_ENUM_Common
			},
			"arbitrum-nova": {
				contractAddress: "0x2EA563E52D405Fb3abd15F636081F217ad8b60F5",
				abi: v8_ENUM_Common
			},
			"arbitrum": {
				contractAddress: "0x8f2062437E0df31c185f514466245eD75b38Bd1f",
				abi: v8_ENUM_Common
			},
			"mantle": {
				contractAddress: "0xCe178fC3CfF0886e8b7A44117A2Fd1b4F0Db013D",
				abi: v8_ENUM_Common
			},
			"fantom": {
				contractAddress: "0xa762e43c62C1CAB9cF3D3B951f4A729D15514d9F",
				abi: v8_ENUM_Common
			},
			"harmony": {
				contractAddress: "0x16807fE7bC737A56D53dc7002b7CAEe488dC0544",
				abi: v8_ENUM_Common
			},
			"metis": {
				contractAddress: "0x5B23E51Aa112C7451c9D848C2DD9369d72b87004",
				abi: v8_ENUM_Common
			},
			"fuse": {
				contractAddress: "0x6e93Dab94F88FA35489d9709ac40AA5D507434a4",
				abi: v8_ENUM_Common
			},
			"manta": {
				contractAddress: "0x056C043A9EF46f10BF28773a948Cb43cBbAEbfB5",
				abi: v8_ENUM_Common
			},
			"coredao": {
				contractAddress: "0xfCF7E76c3D53b925d02b10f9B0afdad15a47993D",
				abi: v8_ENUM_Common
			},
			"kava": {
				contractAddress: "0x61ECfF87fb16FBe29FA2918D7d9bF4Bf7D90a34A",
				abi: v8_ENUM_Common
			},
			"polygon": {
				contractAddress: "0xA5424C68197Fe2343c085eb9433BF08EF8ACec43",
				abi: v8_ENUM_Common
			},
			"bsc": {
				contractAddress: "0xcBc333baB5e0a1e932166f3cB9E6733b27893644",
				abi: v8_ENUM_Common
			},
			"loot": {
				contractAddress: "0x0c3a4ab252d45F0aA524a3844Fe6d430E90c8e87",
				abi: v8_ENUM_Common
			},
			"tenet": {
				contractAddress: "0xb0F2eE53C132802c6644D4b48132289f3CA492E2",
				abi: v8_ENUM_Common
			},
			"zora": {
				contractAddress: "0x16807fe7bc737a56d53dc7002b7caee488dc0544",
				abi: v8_ENUM_Common
			},
			"moonriver": {
				contractAddress: "0x0f07487F741a0fDCAcC490d771E47B3258c99795",
				abi: v8_ENUM_Common
			},
			"canto": {
				contractAddress: "0xb0F2eE53C132802c6644D4b48132289f3CA492E2",
				abi: v8_ENUM_Common
			},
			"avalanche": {
				contractAddress: "0x65f2a8f21f471264eD8669Fc9a47fEF05d94011C",
				abi: v8_ENUM_Common
			},
			"meter": {
				contractAddress: "0xf8b0e8e88085382c1AF9F4915bE184d4DD79c98c",
				abi: v8_ENUM_Common
			},
			"linea": {
				contractAddress: "0x39A750Dcf1ADCC68a36427CEF7193169D687a283",
				abi: v8_ENUM_Common
			},
			"base": {
				contractAddress: "0x5B23E51Aa112C7451c9D848C2DD9369d72b87004",
				abi: v8_ENUM_Common
			},
			"gnosis": {
				contractAddress: "0x5399843f178F5CdeE705a65c156f694a1e8D4ce0",
				abi: v8_ENUM_Common
			},
			"zksync": {
				contractAddress: "0x6FF4885694b5AE2AaCFF43f3B4BCE5369752e9FE",
				abi: v8_ENUM_Common
			}
		},
	}
}

export default Collections;