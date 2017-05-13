pragma solidity ^0.4.4;

import "./strings.sol";

contract Channel
{
  using strings for *;

  address owner;
  address opponent;
  uint256 stake;
  bool matched = false;
  uint256 expirationBlockTime;
  uint256 nonce_1;
  uint256 nonce_2;
  uint256 player1balance;
  uint256 player2balance;
  address p1addr;
  address p2addr;


  modifier onlyOwner() {
    if (msg.sender!=owner) throw;
    _;
  }

  modifier isMatched() {
    if(!matched) throw;
    _;
  }

  //enum Results{empty, commit, cancel, matched, win1, win2, draw, expired}

  mapping (bytes32 => uint) publicGameHashToIndex;

  mapping (string => mapping(string => int)) payoffMatrix;
  //constructor
  function Channel(address _opponent)
  payable
  {
    if (msg.value<=0) throw;

    owner= msg.sender;
    opponent = _opponent;
    stake = msg.value;
    expirationBlockTime = 7200 ;//24 hour in blocks, time player 1 has to reveal once matched

  }

  function () {} //no fallback, use the functions to play

  function matchStake()
  payable
  {
    if (msg.sender != opponent) throw;
    if (msg.value != stake) throw;
    if (matched) throw;
    matched = true;
  }
  event LogClose(uint256, string, uint256, uint256);

  function validateMessage(
   bytes32 p1h,
   uint8 p1v,
   bytes32 p1r,
   bytes32 p1s,
   bytes32 p2h,
   uint8 p2v,
   bytes32 p2r,
   bytes32 p2s,
   string p1m,
   string p2m) public constant returns (uint8 result, uint256 player1balance_1, uint256 player1balance_2)
  {
    p1addr= ecrecover(p1h, p1v, p1r, p1s);
    if (p1addr!=owner) throw;
    //  bool p1honest=true;
    p2addr= ecrecover(p2h, p2v, p2r, p2s);
    if (p2addr!=opponent) throw;
    //bool p2honest=true;
    //return(p1honest,p2honest);

    (nonce_1, player1balance, player2balance) = decodeMessage(p1m);



    return(result, player1balance, player2balance);


  }

  function decodeMessage(string message) public constant returns (uint256 _nonce, uint256 _player1balance, uint256 _player2balance)
  {
    var s = message.toSlice();
    var delim = "|".toSlice();

    _nonce = stringToUint(s.split(delim).toString());
    _player1balance = stringToUint(s.split(delim).toString());
    _player2balance = stringToUint(s.split(delim).toString());
  }

  function close(bytes32 p1h,
   uint8 p1v,
   bytes32 p1r,
   bytes32 p1s,
   bytes32 p2h,
   uint8 p2v,
   bytes32 p2r,
   bytes32 p2s,
   string p1m,
   string p2m)
  {

    var (winner, p1b, p2b) = validateMessage(p1h, p1v, p1r, p1s, p2h, p2v, p2r, p2s, p1m, p2m);

    if(!opponent.send(p2b)) throw;
    if(!owner.send(this.balance)) throw;

  }

  function getBlanace() public constant returns (uint256)
  {
   return this.balance;
 }
 function signatureSplit(bytes signature) private returns (bytes32 r, bytes32 s, uint8 v) {
  // The signature format is a compact form of:
  //   {bytes32 r}{bytes32 s}{uint8 v}
  // Compact means, uint8 is not padded to 32 bytes.
  assembly {
    r := mload(add(signature, 32))
    s := mload(add(signature, 64))
    // Here we are loading the last 32 bytes, including 31 bytes
    // of 's'. There is no 'mload8' to do this.
    //
    // 'byte' is not working due to the Solidity parser, so lets
    // use the second best option, 'and'
    v := and(mload(add(signature, 65)), 1)
  }
  // old geth sends a `v` value of [0,1], while the new, in line with the YP sends [27,28]
  if(v < 27) v += 27;
}


function getTransferRawAddress(bytes memory signed_transfer) internal returns (bytes memory, address) {
  uint signature_start;
  uint length;
  bytes memory signature;
  bytes memory transfer_raw;
  bytes32 transfer_hash;
  address transfer_address;

  length = signed_transfer.length;
  signature_start = length - 65;
  signature = slice(signed_transfer, signature_start, length);
  transfer_raw = slice(signed_transfer, 0, signature_start);

  transfer_hash = sha3(transfer_raw);
  var (r, s, v) = signatureSplit(signature);
  transfer_address = ecrecover(transfer_hash, v, r, s);

  return (transfer_raw, transfer_address);
}

function slice(bytes a, uint start, uint end) private returns (bytes n) {
  if (a.length < end) {
    throw;
  }
  if (start < 0) {
    throw;
  }

  n = new bytes(end - start);
  for (uint i = start; i < end; i++) { //python style slice
    n[i - start] = a[i];
  }
}
function stringToUint(string s) constant returns (uint result) {
  bytes memory b = bytes(s);
  uint i;
  result = 0;
  for (i = 0; i < b.length; i++) {
    uint c = uint(b[i]);
    if (c >= 48 && c <= 57) {
      result = result * 10 + (c - 48);
    }
  }
}
function verify( bytes32 hash, uint8 v, bytes32 r, bytes32 s) constant returns(address retAddr) {
  retAddr= ecrecover(hash, v, r, s);
}


}
