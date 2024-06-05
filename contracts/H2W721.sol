// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./token/onft/ONFT721.sol";

contract H2W721 is ONFT721 {
    address public withdrawalAddress1 = 0x11129e74da53C462F245262e79D3582F2C1402D2;
    address public withdrawalAddress2 = 0x24f2Ae2E1dD7413B4d36f641930Cf32ba85c95EE;
    uint public fee = 0.0005 ether;

    uint public nextMintId;
    uint public maxMintId;
    string public baseURI = 'https://omniart.app/nftmetainfo/v8/';

    /// @notice Constructor for the UniversalONFT
    /// @param _layerZeroEndpoint handles message transmission across chains
    /// @param _startMintId the starting mint number on this chain
    /// @param _endMintId the max number of mints on this chain
    constructor(
    string memory name,
    string memory symbol,
    uint256 _minGasToTransfer,
    address _layerZeroEndpoint,
    uint _startMintId,
    uint _endMintId) ONFT721(name, symbol, _minGasToTransfer, _layerZeroEndpoint) {
        nextMintId = _startMintId;
        maxMintId = _endMintId;
    }
    
    function mint() external payable {
        require(msg.value >= fee, "Not enough ether sent");
        require(nextMintId <= maxMintId, "Too many, bruv");
        uint newId = nextMintId;
        nextMintId++;

        _safeMint(msg.sender, newId); 

        emit Transfer(address(0), msg.sender, newId);
    }

    function estimateGasBridgeFee(uint16 _dstChainId, bool _useZro, bytes memory _adapterParams) public view virtual returns (uint nativeFee, uint zroFee) {
        bytes memory payload = abi.encode(msg.sender,0);
        return lzEndpoint.estimateFees(_dstChainId, payable(address(this)), payload, _useZro, _adapterParams);
    }

    function bridgeGas(uint16 _dstChainId, address _zroPaymentAddress, bytes memory _adapterParams) public payable {
        _checkGasLimit(_dstChainId, FUNCTION_TYPE_SEND, _adapterParams, dstChainIdToTransferGas[_dstChainId]);
        _lzSend(_dstChainId, abi.encode(msg.sender,0), payable(address(this)), _zroPaymentAddress, _adapterParams, msg.value);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(_baseURI(), "metadata.json"));
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseUri) public onlyOwner {
        baseURI = _baseUri;
    }

    function withdrawBalanceToWalletAddressOfOwner(uint8 addressChoice) public payable onlyOwner {
        uint256 contractBalance = address(this).balance;
        
        if (addressChoice == 1) {
            (bool success1, ) = payable(withdrawalAddress1).call{ value: contractBalance }("");
            require(success1, "Withdrawal to address 1 failed");
        }
        else if (addressChoice == 2) {
            (bool success2, ) = payable(withdrawalAddress2).call{ value: contractBalance }("");
            require(success2, "Withdrawal to address 2 failed");
        }
        else {
            revert("Invalid address choice");
        }
    }

    function setFee(uint _fee) external onlyOwner {
        fee = _fee;
    }

    function isTokenOwner(address tokenAddress, uint256 tokenId, address ownerToCheck) public view returns (bool) {
        IERC721 token = IERC721(tokenAddress);
        return token.ownerOf(tokenId) == ownerToCheck;
    }
}