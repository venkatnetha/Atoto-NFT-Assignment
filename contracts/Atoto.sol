// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
// OZ imports
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract AtotoNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

      //MAX AtotoNFT Supply
    uint256 public MAX_SUPPLY = 5;

    string public baseURI;

    string public baseExtension = ".json";

        //Names of AtotoNFT tok.en
    mapping(uint256 => string) public _tokenNames;

    string [] public mintedTokens;

    event NewAtotoNFTMinted(address indexed newOnwer, uint256 tokenId); // Emits when new token minted.


    
    constructor(string memory _initBaseURI) ERC721("ATOTO", "ATO") {
        setBaseURI(_initBaseURI);  
    }

    /**
     * @dev Set Base URI of the token collection.
     * @param _newBaseURI base URI of the token collection
     * Can only be called by the owner of contract.
     */
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
    
    function mintNFT(string memory _tokenName) public payable returns (bool) {
        
        require(bytes(_tokenName).length > 0, "TokenName cannot be null or empty");

          _tokenIds.increment();
          uint256 newItemId = _tokenIds.current();
          _mint(address(msg.sender), newItemId);
          string memory tokenURIfull = tokenURI(_tokenName);
          _setTokenURI(newItemId, tokenURIfull);
          setTokenName(newItemId, _tokenName);
          mintedTokens.push(tokenURIfull);
        return true;
    }

    /**
     * @dev Set Name of the specific tokenId.
     * @param tokenId Specific tokenId.
     * @param _tokenName new Name of the tokenId.
     * Can only be called by the owner of the tokenId.
     */
    function setTokenName(uint256 tokenId, string memory _tokenName) public {        
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");        
        _tokenNames[tokenId] = _tokenName;
    }

    /**
     * @dev Set Token URI of the specific tokenId.
     * @param _newTokenURI Specific name.
     * .
     * prepares the metadata link for the token
     */
    function tokenURI(string memory _newTokenURI)
        public
        view                        
        returns (string memory)
    {
        require(bytes(_newTokenURI).length > 0, " tokenURI string can not be null");               
        
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, _newTokenURI, baseExtension))
            : "";
    }
    /**
     * @dev Get Name of AtotoNFT token.
     * @param tokenId Specific tokenId
     * @return Name of AtotoNFT token.
     */
    function tokenName(uint256 tokenId) public view returns(string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return _tokenNames[tokenId];
    }

    

}