/* global Web3, web3, $ */

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.log('No web3? You should consider trying MetaMask!')
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }
  startApp()
})

function startApp () {
  var abiArray = [{'constant': true, 'inputs': [], 'name': 'getTotalPublicDuels', 'outputs': [{'name': '_totalPublicDuels', 'type': 'uint256'}], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [{'name': 's', 'type': 'string'}], 'name': 'stringToUint', 'outputs': [{'name': 'result', 'type': 'uint256'}], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'matchStake', 'outputs': [], 'payable': true, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}], 'name': 'answerPublicScissors', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}], 'name': 'fromPublicGameHashToIndex', 'outputs': [{'name': 'gameIndex', 'type': 'uint256'}], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'getBlanace', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}, {'name': 'secret', 'type': 'string'}], 'name': 'revealRock', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'owner_hand', 'type': 'string'}, {'name': 'owner_secret', 'type': 'string'}, {'name': 'opponent_hand', 'type': 'string'}, {'name': 'opponent_secret', 'type': 'string'}, {'name': 'message1', 'type': 'string'}, {'name': 'message2', 'type': 'string'}], 'name': 'close', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}], 'name': 'answerPublicPaper', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'gameIndex', 'type': 'uint256'}], 'name': 'getPublicDuels', 'outputs': [{'name': 'p1', 'type': 'address'}, {'name': 'cryptedHand1', 'type': 'bytes32'}, {'name': 'hand1', 'type': 'string'}, {'name': 'blockNumber_1', 'type': 'uint256'}, {'name': 'blockNumber_1_reveal', 'type': 'uint256'}, {'name': 'p2', 'type': 'address'}, {'name': 'hand2', 'type': 'string'}, {'name': 'blockNumber_2', 'type': 'uint256'}, {'name': 'result', 'type': 'uint8'}, {'name': 'gambleValue', 'type': 'uint256'}, {'name': 'payoutStatus', 'type': 'uint8'}], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}], 'name': 'answerPublicRock', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'cryptedH', 'type': 'bytes32'}], 'name': 'createPublicGame', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}, {'name': 'secret', 'type': 'string'}], 'name': 'revealPaper', 'outputs': [], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'p1h', 'type': 'bytes32'}, {'name': 'p1v', 'type': 'uint8'}, {'name': 'p1r', 'type': 'bytes32'}, {'name': 'p1s', 'type': 'bytes32'}, {'name': 'p2h', 'type': 'bytes32'}, {'name': 'p2v', 'type': 'uint8'}, {'name': 'p2r', 'type': 'bytes32'}, {'name': 'p2s', 'type': 'bytes32'}, {'name': 'p1m', 'type': 'string'}, {'name': 'p2m', 'type': 'string'}], 'name': 'announceWinner', 'outputs': [{'name': 'result', 'type': 'uint8'}], 'payable': false, 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'hash', 'type': 'bytes32'}, {'name': 'v', 'type': 'uint8'}, {'name': 'r', 'type': 'bytes32'}, {'name': 's', 'type': 'bytes32'}], 'name': 'verify', 'outputs': [{'name': 'retAddr', 'type': 'address'}], 'payable': false, 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'gameHash', 'type': 'bytes32'}, {'name': 'secret', 'type': 'string'}], 'name': 'revealScissors', 'outputs': [], 'payable': false, 'type': 'function'}, {'inputs': [{'name': '_opponent', 'type': 'address'}], 'payable': true, 'type': 'constructor'}, {'payable': false, 'type': 'fallback'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': '', 'type': 'uint256'}, {'indexed': false, 'name': '', 'type': 'string'}, {'indexed': false, 'name': '', 'type': 'uint256'}, {'indexed': false, 'name': '', 'type': 'uint256'}], 'name': 'LogClose', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': 'player_1', 'type': 'address'}, {'indexed': false, 'name': 'hand_1', 'type': 'string'}, {'indexed': false, 'name': 'player_2', 'type': 'address'}, {'indexed': false, 'name': 'hand_2', 'type': 'string'}, {'indexed': false, 'name': 'gambleValue', 'type': 'uint256'}, {'indexed': false, 'name': 'result', 'type': 'uint8'}, {'indexed': false, 'name': 'gameIndex', 'type': 'uint256'}], 'name': 'solvedPublicGame', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': 'ch', 'type': 'bytes32'}], 'name': 'cryptedHStored', 'type': 'event'}]

  var InstaRPS = web3.eth.contract(abiArray)
  var bytecode = '0x60606040526000600360006101000a81548160ff02191690831515021790555060405160208062003115833981016040528080519060200190919050505b6000341115156200004e5760006000fd5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346002819055506001600e81905550611c206004819055506000601060405180807f726f636b000000000000000000000000000000000000000000000000000000008152506004019050908152602001604051809103902060405180807f726f636b0000000000000000000000000000000000000000000000000000000081525060040190509081526020016040518091039020819055506002601060405180807f726f636b000000000000000000000000000000000000000000000000000000008152506004019050908152602001604051809103902060405180807f706170657200000000000000000000000000000000000000000000000000000081525060050190509081526020016040518091039020819055506001601060405180807f726f636b000000000000000000000000000000000000000000000000000000008152506004019050908152602001604051809103902060405180807f73636973736f727300000000000000000000000000000000000000000000000081525060080190509081526020016040518091039020819055506001601060405180807f70617065720000000000000000000000000000000000000000000000000000008152506005019050908152602001604051809103902060405180807f726f636b0000000000000000000000000000000000000000000000000000000081525060040190509081526020016040518091039020819055506000601060405180807f70617065720000000000000000000000000000000000000000000000000000008152506005019050908152602001604051809103902060405180807f706170657200000000000000000000000000000000000000000000000000000081525060050190509081526020016040518091039020819055506002601060405180807f70617065720000000000000000000000000000000000000000000000000000008152506005019050908152602001604051809103902060405180807f73636973736f727300000000000000000000000000000000000000000000000081525060080190509081526020016040518091039020819055506002601060405180807f73636973736f72730000000000000000000000000000000000000000000000008152506008019050908152602001604051809103902060405180807f726f636b0000000000000000000000000000000000000000000000000000000081525060040190509081526020016040518091039020819055506001601060405180807f73636973736f72730000000000000000000000000000000000000000000000008152506008019050908152602001604051809103902060405180807f706170657200000000000000000000000000000000000000000000000000000081525060050190509081526020016040518091039020819055506000601060405180807f73636973736f72730000000000000000000000000000000000000000000000008152506008019050908152602001604051809103902060405180807f73636973736f72730000000000000000000000000000000000000000000000008152506008019050908152602001604051809103902081905550600d80548060010182816200057e9190620007a9565b91600052602060002090600b020160005b61016060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff1681526020016000600102600019168152602001602060405190810160405280600081525081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016020604051908101604052806000815250815260200160008152602001600260078111156200063357fe5b815260200160008152602001600060ff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101906000191690556040820151816002019080519060200190620006c1929190620007de565b50606082015181600301556080820151816004015560a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c08201518160060190805190602001906200073b929190620007de565b5060e082015181600701556101008201518160080160006101000a81548160ff021916908360078111156200076c57fe5b0217905550610120820151816009015561014082015181600a0160006101000a81548160ff021916908360ff1602179055505050505b50620009be565b815481835581811511620007d957600b0281600b028360005260206000209182019101620007d8919062000865565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200082157805160ff191683800117855562000852565b8280016001018555821562000852579182015b828111156200085157825182559160200191906001019062000834565b5b5090506200086191906200094a565b5090565b6200094791905b80821115620009435760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000620008b8919062000972565b600382016000905560048201600090556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560068201600062000901919062000972565b60078201600090556008820160006101000a81549060ff02191690556009820160009055600a820160006101000a81549060ff021916905550600b016200086c565b5090565b90565b6200096f91905b808211156200096b57600081600090555060010162000951565b5090565b90565b50805460018160011615610100020316600290046000825580601f106200099a5750620009bb565b601f016020900490600052602060002090810190620009ba91906200094a565b5b50565b61274780620009ce6000396000f300606060405236156100d9576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306f65bee146100ea5780631bd9515514610110578063257e5c691461017e57806332ab809c1461018857806341f3f6e4146101ac57806371c4980b146101e45780638e8d748f1461020a5780639007907a146102715780639a5f94ff1461041a5780639e3486ca146104ba578063b1544a29146104de578063b18e65d6146106b2578063c0277338146106d6578063deb734de146106fa578063f7da677d14610761575b34156100e157fe5b6100e85b5b565b005b34156100f257fe5b6100fa6107c8565b6040518082815260200191505060405180910390f35b341561011857fe5b610168600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506107d3565b6040518082815260200191505060405180910390f35b6101866108ae565b005b341561019057fe5b6101aa600480803560001916906020019091905050610955565b005b34156101b457fe5b6101ce600480803560001916906020019091905050610999565b6040518082815260200191505060405180910390f35b34156101ec57fe5b6101f46109bf565b6040518082815260200191505060405180910390f35b341561021257fe5b61026f60048080356000191690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506109df565b005b341561027957fe5b610418600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610a25565b005b341561042257fe5b61049560048080356000191690602001909190803560ff1690602001909190803560001916906020019091908035600019169060200190919080356000191690602001909190803560ff169060200190919080356000191690602001909190803560001916906020019091905050610d16565b6040518083151515158152602001821515151581526020019250505060405180910390f35b34156104c257fe5b6104dc600480803560001916906020019091905050610eab565b005b34156104e657fe5b6104fc6004808035906020019091905050610eef565b604051808c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018b60001916600019168152602001806020018a81526020018981526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200187815260200186600781111561059857fe5b60ff1681526020018581526020018460ff1660ff16815260200183810383528c8181518152602001915080519060200190808383600083146105f9575b8051825260208311156105f9576020820191506020810190506020830392506105d5565b505050905090810190601f1680156106255780820380516001836020036101000a031916815260200191505b5083810382528881815181526020019150805190602001908083836000831461066d575b80518252602083111561066d57602082019150602081019050602083039250610649565b505050905090810190601f1680156106995780820380516001836020036101000a031916815260200191505b509d505050505050505050505050505060405180910390f35b34156106ba57fe5b6106d4600480803560001916906020019091905050611258565b005b34156106de57fe5b6106f860048080356000191690602001909190505061129c565b005b341561070257fe5b61075f60048080356000191690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061152c565b005b341561076957fe5b6107c660048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050611572565b005b6000600e5490505b90565b60006107dd61245b565b6000600084925060009350600091505b82518210156108a557828281518110151561080457fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027f01000000000000000000000000000000000000000000000000000000000000009004905060308110158015610886575060398111155b156108975760308103600a85020193505b5b81806001019250506107ed565b5b505050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561090b5760006000fd5b6002543414151561091c5760006000fd5b600360009054906101000a900460ff16156109375760006000fd5b6001600360006101000a81548160ff0219169083151502179055505b565b61099581604060405190810160405280600881526020017f73636973736f72730000000000000000000000000000000000000000000000008152506115b8565b5b50565b6000600f600083600019166000191681526020019081526020016000205490505b919050565b60003073ffffffffffffffffffffffffffffffffffffffff163190505b90565b610a208282604060405190810160405280600481526020017f726f636b00000000000000000000000000000000000000000000000000000000815250611740565b5b5050565b610a2d61246f565b610a3561246f565b610a3d61246f565b610a4685611abe565b9250610a87604060405190810160405280600181526020017f7c00000000000000000000000000000000000000000000000000000000000000815250611abe565b9150610aac610aa7610aa28486611aee90919063ffffffff16565b611b09565b6107d3565b600581905550610acd610ac88385611aee90919063ffffffff16565b611b09565b60079080519060200190610ae292919061248a565b50610b06610b01610afc8486611aee90919063ffffffff16565b611b09565b6107d3565b600981905550610b2f610b2a610b258486611aee90919063ffffffff16565b611b09565b6107d3565b600b81905550610b3e84611abe565b9050610b63610b5e610b598484611aee90919063ffffffff16565b611b09565b6107d3565b600681905550610b84610b7f8383611aee90919063ffffffff16565b611b09565b60089080519060200190610b9992919061248a565b50610bbd610bb8610bb38484611aee90919063ffffffff16565b611b09565b6107d3565b600a81905550610be6610be1610bdc8484611aee90919063ffffffff16565b611b09565b6107d3565b600c81905550600654600554141515610bff5760006000fd5b600c54600b54141515610c125760006000fd5b600a54600954141515610c255760006000fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc600b549081150290604051809050600060405180830381858888f193505050501515610c8d5760006000fd5b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f193505050501515610d0a5760006000fd5b5b505050505050505050565b60006000600060006000600060018e8e8e8e604051806000526020016040526000604051602001526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000866161da5a03f11515610d9d57fe5b50506020604051035193506001925060018a8a8a8a604051806000526020016040526000604051602001526040518085600019166000191681526020018460ff1660ff1681526020018360001916600019168152602001826000191660001916815260200194505050505060206040516020810390808403906000866161da5a03f11515610e2757fe5b5050602060405103519150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141515610e8f5760006000fd5b600190508281955095505b505050509850989650505050505050565b610eeb81604060405190810160405280600581526020017f70617065720000000000000000000000000000000000000000000000000000008152506115b8565b5b50565b60006000610efb61250a565b600060006000610f0961250a565b6000600060006000600d8c815481101515610f2057fe5b90600052602060002090600b020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169a50600d8c815481101515610f6757fe5b90600052602060002090600b020160005b50600101549950600d8c815481101515610f8e57fe5b90600052602060002090600b020160005b506002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110375780601f1061100c57610100808354040283529160200191611037565b820191906000526020600020905b81548152906001019060200180831161101a57829003601f168201915b50505050509850600d8c81548110151561104d57fe5b90600052602060002090600b020160005b50600301549750600d8c81548110151561107457fe5b90600052602060002090600b020160005b50600401549650600d8c81548110151561109b57fe5b90600052602060002090600b020160005b5060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169550600d8c8154811015156110e257fe5b90600052602060002090600b020160005b506006018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561118b5780601f106111605761010080835404028352916020019161118b565b820191906000526020600020905b81548152906001019060200180831161116e57829003601f168201915b50505050509450600d8c8154811015156111a157fe5b90600052602060002090600b020160005b50600701549350600d8c8154811015156111c857fe5b90600052602060002090600b020160005b5060080160009054906101000a900460ff169250600d8c8154811015156111fc57fe5b90600052602060002090600b020160005b50600901549150600d8c81548110151561122357fe5b90600052602060002090600b020160005b50600a0160009054906101000a900460ff1690505b91939597999b90929496989a50565b61129881604060405190810160405280600481526020017f726f636b000000000000000000000000000000000000000000000000000000008152506115b8565b5b50565b60006000600f60008460001916600019168152602001908152602001600020541415156112c95760006000fd5b600d80548060010182816112dd919061251e565b91600052602060002090600b020160005b610160604051908101604052803373ffffffffffffffffffffffffffffffffffffffff168152602001866000191681526020016020604051908101604052806000815250815260200143815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160206040519081016040528060008152508152602001600081526020016001600781111561138b57fe5b8152602001858152602001600060ff16815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101906000191690556040820151816002019080519060200190611416929190612550565b50606082015181600301556080820151816004015560a08201518160050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060c082015181600601908051906020019061148e929190612550565b5060e082015181600701556101008201518160080160006101000a81548160ff021916908360078111156114be57fe5b0217905550610120820151816009015561014082015181600a0160006101000a81548160ff021916908360ff160217905550505050600e54600f6000846000191660001916815260200190815260200160002081905550600e600081548092919060010191905055505b5050565b61156d8282604060405190810160405280600581526020017f7061706572000000000000000000000000000000000000000000000000000000815250611740565b5b5050565b6115b38282604060405190810160405280600881526020017f73636973736f7273000000000000000000000000000000000000000000000000815250611740565b5b5050565b6000600f60008460001916600019168152602001908152602001600020549050600160078111156115e557fe5b600d828154811015156115f457fe5b90600052602060002090600b020160005b5060080160009054906101000a900460ff16600781111561162257fe5b14151561162f5760006000fd5b33600d8281548110151561163f57fe5b90600052602060002090600b020160005b5060050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600d828154811015156116a257fe5b90600052602060002090600b020160005b5060060190805190602001906116ca92919061248a565b5043600d828154811015156116db57fe5b90600052602060002090600b020160005b50600701819055506003600d8281548110151561170557fe5b90600052602060002090600b020160005b5060080160006101000a81548160ff0219169083600781111561173557fe5b02179055505b505050565b6000600f600085600019166000191681526020019081526020016000205490507fa77986ac5aba9c631b2b195caca3194191804425a4211f9a5231ad746e5ac025600d8281548110151561179057fe5b90600052602060002090600b020160005b506001015460405180826000191660001916815260200191505060405180910390a17fa77986ac5aba9c631b2b195caca3194191804425a4211f9a5231ad746e5ac02583836040518083805190602001908083835b6020831061181957805182526020820191506020810190506020830392506117f6565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b6020831061186a5780518252602082019150602081019050602083039250611847565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051809103902060405180826000191660001916815260200191505060405180910390a1600360078111156118c257fe5b600d828154811015156118d157fe5b90600052602060002090600b020160005b5060080160009054906101000a900460ff1660078111156118ff57fe5b14801561197b57503373ffffffffffffffffffffffffffffffffffffffff16600d8281548110151561192d57fe5b90600052602060002090600b020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b8015611a65575082826040518083805190602001908083835b602083106119b75780518252602082019150602081019050602083039250611994565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b60208310611a0857805182526020820191506020810190506020830392506119e5565b6001836020036101000a03801982511681845116808217855250505050505090500192505050604051809103902060001916600d82815481101515611a4957fe5b90600052602060002090600b020160005b506001015460001916145b15611ab15781600d82815481101515611a7a57fe5b90600052602060002090600b020160005b506002019080519060200190611aa292919061248a565b50611aac81611b65565b611ab7565b60006000fd5b5b50505050565b611ac661246f565b6000602083019050604060405190810160405280845181526020018281525091505b50919050565b611af661246f565b611b018383836122af565b505b92915050565b611b1161250a565b611b1961250a565b60008360000151604051805910611b2d5750595b908082528060200260200182016040525b509150602082019050611b5a818560200151866000015161234e565b8192505b5050919050565b6000600d82815481101515611b7657fe5b90600052602060002090600b020160005b5060090154905060006010600d84815481101515611ba157fe5b90600052602060002090600b020160005b506002016040518082805460018160011615610100020316600290048015611c115780601f10611bef576101008083540402835291820191611c11565b820191906000526020600020905b815481529060010190602001808311611bfd575b50509150509081526020016040518091039020600d84815481101515611c3357fe5b90600052602060002090600b020160005b506006016040518082805460018160011615610100020316600290048015611ca35780601f10611c81576101008083540402835291820191611ca3565b820191906000526020600020905b815481529060010190602001808311611c8f575b50509150509081526020016040518091039020541415611d08576006600d83815481101515611cce57fe5b90600052602060002090600b020160005b5060080160006101000a81548160ff02191690836007811115611cfe57fe5b0217905550611ffa565b60016010600d84815481101515611d1b57fe5b90600052602060002090600b020160005b506002016040518082805460018160011615610100020316600290048015611d8b5780601f10611d69576101008083540402835291820191611d8b565b820191906000526020600020905b815481529060010190602001808311611d77575b50509150509081526020016040518091039020600d84815481101515611dad57fe5b90600052602060002090600b020160005b506006016040518082805460018160011615610100020316600290048015611e1d5780601f10611dfb576101008083540402835291820191611e1d565b820191906000526020600020905b815481529060010190602001808311611e09575b50509150509081526020016040518091039020541415611e82576004600d83815481101515611e4857fe5b90600052602060002090600b020160005b5060080160006101000a81548160ff02191690836007811115611e7857fe5b0217905550611ff9565b60026010600d84815481101515611e9557fe5b90600052602060002090600b020160005b506002016040518082805460018160011615610100020316600290048015611f055780601f10611ee3576101008083540402835291820191611f05565b820191906000526020600020905b815481529060010190602001808311611ef1575b50509150509081526020016040518091039020600d84815481101515611f2757fe5b90600052602060002090600b020160005b506006016040518082805460018160011615610100020316600290048015611f975780601f10611f75576101008083540402835291820191611f97565b820191906000526020600020905b815481529060010190602001808311611f83575b50509150509081526020016040518091039020541415611ff8576005600d83815481101515611fc257fe5b90600052602060002090600b020160005b5060080160006101000a81548160ff02191690836007811115611ff257fe5b02179055505b5b5b7fef5dc038329b3a5714c4d3d7832c4e0226a28d62d7977a76faffdb17737e45e133600d8481548110151561202b57fe5b90600052602060002090600b020160005b50600201600d8581548110151561204f57fe5b90600052602060002090600b020160005b5060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600d8681548110151561209457fe5b90600052602060002090600b020160005b50600601600d878154811015156120b857fe5b90600052602060002090600b020160005b5060090154600d888154811015156120dd57fe5b90600052602060002090600b020160005b5060080160009054906101000a900460ff1688604051808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200186815260200185600781111561218357fe5b60ff1681526020018481526020018381038352898181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156122125780601f106121e757610100808354040283529160200191612212565b820191906000526020600020905b8154815290600101906020018083116121f557829003601f168201915b50508381038252878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156122955780601f1061226a57610100808354040283529160200191612295565b820191906000526020600020905b81548152906001019060200180831161227857829003601f168201915b5050995050505050505050505060405180910390a15b5050565b6122b761246f565b60006122d5856000015186602001518660000151876020015161239b565b90508460200151836020018181525050846020015181038360000181815250508460000151856020015101811415612317576000856000018181525050612342565b8360000151836000015101856000018181510391508181525050836000015181018560200181815250505b8291505b509392505050565b60005b60208210151561237757825184526020840193506020830192505b602082039150612351565b6001826020036101000a039050801983511681855116818117865250505b50505050565b600060006000600060008887111515612449576020871115156123fe5760018760200360080260020a031980875116888b038a018a96505b8183885116146123f3576001870196508060018803106123d3578b8b0196505b50505083945061244f565b8686209150879350600092505b868903831115156124475786842090508060001916826000191614156124335783945061244f565b6001840193505b828060010193505061240b565b5b5b88880194505b50505050949350505050565b602060405190810160405280600081525090565b60406040519081016040528060008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106124cb57805160ff19168380011785556124f9565b828001600101855582156124f9579182015b828111156124f85782518255916020019190600101906124dd565b5b50905061250691906125d0565b5090565b602060405190810160405280600081525090565b81548183558181151161254b57600b0281600b02836000526020600020918201910161254a91906125f5565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061259157805160ff19168380011785556125bf565b828001600101855582156125bf579182015b828111156125be5782518255916020019190600101906125a3565b5b5090506125cc91906125d0565b5090565b6125f291905b808211156125ee5760008160009055506001016125d6565b5090565b90565b6126d091905b808211156126cc5760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600061264491906126d3565b600382016000905560048201600090556005820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560068201600061268b91906126d3565b60078201600090556008820160006101000a81549060ff02191690556009820160009055600a820160006101000a81549060ff021916905550600b016125fb565b5090565b90565b50805460018160011615610100020316600290046000825580601f106126f95750612718565b601f01602090049060005260206000209081019061271791906125d0565b5b505600a165627a7a72305820474c138265aac5a12815e4536245e71944659461309eec506d1c8f778a920e650029'
  var contractAddress = '0x792ec0a66ab6a4592b2829b71d64b2101ccd0d9f'
  var myInstaRPS = InstaRPS.at(contractAddress)

  let toWei = new BigNumber('1000000000000000000')
  $(document).ready(function () {
    // STAKE
    $('#btn_deploy').click(function () {
      var opponent = $('#deploy_opponent').val()
      var stake = parseInt($('#deploy_stake').val())

      // web3.eth.estimateGas({'data': bytecode, 'from': web3.eth.defaultAccount, 'gas': 1000000}, function (err, gasEstimate) {
        // if (err) console.error(err)
      console.log('Estimated gas')
      // console.log(gasEstimate)
      var myContractReturned = InstaRPS.new(opponent, {
        from: web3.eth.accounts[0],
        data: bytecode,
        gas: 1000000,
        value: stake
      }, function (err, myContract) {
        if (err) console.error(err)
       // NOTE: The callback will fire twice!
       // Once the contract has the transactionHash property set and once its deployed on an address.

       // e.g. check tx hash on the first call (transaction send)
        if (!myContract.address) {
          console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract

       // check address on the second call (contract deployed)
        } else {
          console.log(myContract.address) // the contract address
          contractAddress = myContract.address
          $('#deploy_res').html(myContract.address)
        }
       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
      })
    })

    $('#btn_stake').click(function () {
      var stake = $('#stake_val').val()
      let contract = $('#contractAddress').val()
      if (contract === '') contract = contractAddress
      console.log(stake)
      console.log(contract)
      let bigValue = new BigNumber(stake)

      bigValue = bigValue.times(toWei)
      myInstaRPS.matchStake({ 'gas': '1000000', 'value': bigValue }, function (err, res) { console.log(err, res) })
      // web3.eth.sendTransaction({'from': web3.eth.defaultAccount, 'to': contract, 'value': bigValue }, function (err, res) { console.log(err, res) })
    })

    // PLAY
    $('#btn_play').click(function () {
      console.log('play clicked')
      var hand = $('#play_hand').val()
      var secret = $('#play_secret').val()
      var nonce = $('#play_nonce').val()
      var p1b = $('#play_p1b').val()
      var p2b = $('#play_p2b').val()

      // var encryptedHand = web3.sha3(hand + secret)
      var msg = nonce.toString() + '|' + hand + '|' + p1b.toString() + '|' + p2b.toString() + '|' + secret
      var hash = web3.sha3(msg)
      console.log(msg)
      console.log(hash)
      web3.eth.sign(web3.eth.defaultAccount, hash, function (err, res) {
        if (!err) {
          console.log(res)
          $('#play_result').html(res)
        } else {
          console.err(err)
        }
      })
    })

    // WINNER
    $('#btn_winner').click(function () {
      var p1m = $('#compute_p1m').val()
      var p1h = $('#compute_p1h').val()
      var p1s = $('#compute_p1s').val()
      // var p1s = $('#compute_p1s').val()
      var p2m = $('#compute_p2m').val()
      var p2h = $('#compute_p2h').val()
      var p2s = $('#compute_p2s').val()
      // var p2s = $('#compute_p2s').val()

      if (web3.sha3(p1m) !== p1h) {
        console.log('hash 1 mismatch')
      }

      if (web3.sha3(p2m) !== p2h) {
        console.log('hash 2 mismatch')
      }

      let r1 = p1s.slice(0, 66)
      let s1 = '0x' + p1s.slice(66, 130)
      let v1 = '0x' + p1s.slice(130, 132)
      console.log(v1)
      v1 = web3.toDecimal(v1)

      let r2 = p2s.slice(0, 66)
      let s2 = '0x' + p2s.slice(66, 130)
      let v2 = '0x' + p2s.slice(130, 132)
      console.log(v2)
      v2 = web3.toDecimal(v2)

      if (v1 < 27) v1 += 27
      if (v2 < 27) v2 += 27
   //         bytes32 p1h,
   // uint8 p1v,
   // bytes32 p1r,
   // bytes32 p1s,
   // bytes32 p2h,
   // uint8 p2v,
   // bytes32 p2r,
   // bytes32 p2s)
      myInstaRPS.announceWinner(p1h, v1, r1, s1, p2h, v2, r2, s2, p1m, p2m, function (err, res) { console.log(err, res) })
    })
  })
}
