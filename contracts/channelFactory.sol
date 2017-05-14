import "./Channel.sol";

contract channelFactory {

  // mapping(address=>address) contractMap;
  // mapping(address=> uint256) contractStake;
  
  function channelFactory()
  {
  }

  event ChannelCreated(address indexed from, address indexed to, address indexed contractAddress, uint256 value);
  function createChannel (address partner)
  payable
  {
    Channel contractAddress=  new Channel(msg.sender,partner);
    contractAddress.initialDeposit.value(msg.value)(msg.sender);
    ChannelCreated(msg.sender, partner, contractAddress ,msg.value);

  }
    // contractMap[msg.sender] =contractAddress;

    // contractStake[contractMap[msg.sender]]=msg.value;

}