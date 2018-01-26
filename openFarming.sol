pragma solidity ^0.4.0;

contract openFarming{
	
	uint[] public userIdList;
	mapping (uint => uint) public userIsPresent;
	
	uint public userCount;
	uint public cropCount;
	uint public storeCount;
	uint public transportCount;
	uint public orderCount;

	struct userDetails{
		string name;
		string contact;
		uint userid;
		uint usertype;
		string location;
		string email;
		string pass;
		uint balance;
		address userAddress;
	}
	
	struct crop{
		uint id;
		string name;
		uint ownId;
		uint quantity;
		uint price;
		uint status;
		uint amountSold;
	}
	
	struct store{
		uint id;
		uint ownId;
		uint capacity;
		uint price;
		uint remain;
	}
	
	struct transport{
		uint id;
		uint ownId;
		uint capacity;
		uint price;
		uint status;
	}
	
	struct order{
		uint id;
		uint quantity;
		uint mainId;
		uint sId1;
		uint sId2;
		uint orderType;        ////////// 0--crop ;; 1--storage ;; 2--transport
		uint status;
	}

    mapping( string => uint) emailToId;
	mapping ( uint => userDetails ) public userInfo;
	mapping ( uint => crop ) public cropInfo;
	mapping ( uint => store ) public storeInfo;
	mapping ( uint => transport ) public transportInfo;
	
	function getUserId(string email) returns (uint)
	{
	    return emailToId[email];
	}
	
	
	function registerMe(string name,string contact,uint userid,uint usertype,string location,string email,string pass) public returns(bool){
		if(userIsPresent[userid] != 1)
		{
		    userIsPresent[userid]=1;
			userIdList.push(userid);
			address adr=msg.sender;
			uint bal = 100;
			emailToId[email] = userid;
			userInfo[userid] = userDetails(name,contact,userid,usertype,location,email,pass,bal,adr);
			userCount+=1;
			return true;
		}
		return false;
	}
	
	function sendPass(uint id) returns (string){
		return userInfo[id].pass;
		/*for(uint i = 0; i<userCount; i++){
			if(userInfo[i].userid == id ){
				return userInfo[i].pass;
			}
		}*/
	}
	
	function addCrop(string name,uint ownid, uint quantity,uint price) returns (bool) {
	    uint st = 0; uint amt = 0;
	    cropInfo[cropCount] = crop(cropCount,name,ownid,quantity,price,st,amt);
	    cropCount++;
	    return true;
	}
	
	function addStore(uint ownid, uint capacity,uint price) returns (bool) {
	    storeInfo[storeCount] = store(storeCount,ownid,capacity,price,capacity);
	    storeCount++;
	    return true;
	}
	
	function addTransport(uint ownid, uint capacity,uint price) returns (bool) {
	    uint st = 0;
	    transportInfo[transportCount] = transport(transportCount,ownid,capacity,price,st);
	    storeCount++;
	    return true;
	}
}



















