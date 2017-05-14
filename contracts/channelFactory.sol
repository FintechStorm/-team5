import "./Channel.sol";

contract channelFactory {

  // mapping(address=>address) contractMap;
  // mapping(address=> uint256) contractStake;
  uint8 nonce;
  function channelFactory()
  {
  }

  event ChannelCreated(address indexed from, address indexed to, address indexed contractAddress, uint256);
  function createChannel (address partner)
  payable
  {
    Channel contractAddress=  new Channel(msg.sender,partner);
    contractAddress.initialDeposit.value(msg.value)(msg.sender);


  }
    // contractMap[msg.sender] =contractAddress;
    // ChannelCreated(msg.sender, partner, contractAddress,msg.value);
    // contractStake[contractMap[msg.sender]]=msg.value;

}