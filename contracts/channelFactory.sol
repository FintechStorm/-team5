import "./Channel.sol";

contract channelFactory {

  // mapping(address=>address) contractMap;
  // mapping(address=> uint256) contractStake;
  uint8 nonce;
  function channelFactory()
  {
  }

  event ChannelCreated(address indexed from, address indexed to, address indexed contractAddress, uint256);
  function createChannel (address partner, address contract)
  payable
  {
    contract.transfer(msg.value);
    address contractAddress=  new Channel(msg.sender,partner);


  }
    // contractMap[msg.sender] =contractAddress;
    // ChannelCreated(msg.sender, partner, contractAddress,msg.value);
    // contractStake[contractMap[msg.sender]]=msg.value;

}