pragma solidity ^0.4.0;

contract openFarming{
	
	uint[] public userIdList;
	mapping (uint => uint) public userIsPresent;
	
	uint public userCount;
	uint public cropCount;
	uint public storeCount;
	uint public transportCount;
	uint public buyerOrderCount;
	uint public storeOrderCount;
	uint public transportOrderCount;

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
	}
	
	struct buyerOrder{
	    uint orderId;
	    uint cropId;
	    uint buyerId;
	    uint transportId;          //////////to be filled by farmer
	    uint storeId;                //////////to be filled by farmer
	    uint quantity;
	    uint statusOrder;                ///// 0 -- store ;; 1 -- onWay ;; 2 -- delivered;
	    uint delivered;             ///// 1 -- confirmation
	    uint picked;
	    uint accept;       //////////////0--decline ;; 1--Accepted ;; 2--No Action
	}
	
	struct storeOrder{
	    uint orderId;
	    uint cropId;
	    uint storeId;
	    uint transportId;
	    uint quantity;
	    uint statusOrder;                ///// 0 -- farmer ;; 1 -- onWay ;; 2 -- delivered;
	    uint delivered;
	    uint picked;
	    uint accept;       //////////////0--decline ;; 1--Accepted ;; 2--No Action
	}
	
	struct transportOrder{
	    uint orderId;
	    uint orderType; ////////////0 -- buyerOrder ;; 1 -- storeOrder
	    uint orderTaken;
	    uint senderId;
	    uint recieverId;
	    uint quantity;
	    uint statusOrder;       //////// 0 -- sender ;; 1 -- onWay ;; 2 -- reciever;
	    uint delivered;
	    uint picked;
	    uint accept;       //////////////0--decline ;; 1--Accepted ;; 2--No Action
	    
	}
    
    mapping ( string => uint) emailToId;
	mapping ( uint => userDetails ) public userInfo;
	mapping ( uint => crop ) public cropInfo;
	mapping ( uint => store ) public storeInfo;
	mapping ( uint => transport ) public transportInfo;
	mapping ( uint => buyerOrder ) public buyerOrderInfo;
	mapping ( uint => storeOrder ) public storeOrderInfo;
	mapping ( uint => transportOrder ) public transportOrderInfo;
	
	function getUserId(string email) returns (uint)	{
	    return emailToId[email];
	}
	
	function getUserName(uint id) returns (string) {
	    return userInfo[id].name;
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
	    uint amt = 0;
	    cropInfo[cropCount] = crop(cropCount,name,ownid,quantity,price,amt);
	    cropCount++;
	    return true;
	}
	
	function addStore(uint ownid, uint capacity,uint price) returns (bool) {
	    storeInfo[storeCount] = store(storeCount,ownid,capacity,price,capacity);
	    storeCount++;
	    return true;
	}
	
	function addTransport(uint ownid, uint capacity,uint price) returns (bool) {
	    transportInfo[transportCount] = transport(transportCount,ownid,capacity,price);
	    transportCount++;
	    return true;
	}
	
	/*function addOrder(uint quantity, uint id1, uint id2, uint id3, uint orderType) returns (bool) {
	    uint st  = 0; uint a = 2;
	    orderInfo[orderCount] = order(orderCount, quantity, id1, id2, id3, orderType, st);
	    orderCount++;
	    return true;
	    
	}*/
	
	function addBuyerOrder(uint cropId, uint buyerId, uint quant) returns (bool) {
	    uint trans = 20;
	    uint store = 20;
	    uint st = 0; uint d = 0; uint p = 0; uint a = 2;
	    buyerOrderInfo[buyerOrderCount] = buyerOrder(buyerOrderCount, cropId, buyerId, trans, store, quant, st, d, p, a);
	    buyerOrderCount++;
	    return true;
	}
	
	function addStoreOrder(uint cropId, uint storeId, uint quant ) returns (bool) {
	    uint trans = 20;
	    uint st = 0; uint d = 0; uint p = 0; uint a = 2;
	    storeOrderInfo[storeOrderCount] = storeOrder(storeOrderCount, cropId, storeId, trans, quant, st, d, p, a);
	    storeOrderCount++;
	    return true;
	}
	
	function addTransportOrder(uint orderType, uint orderTaken ) returns (bool) {
	    //s r q
	    if(orderType == 0) {      /////////////////Buyer
            uint c = buyerOrderInfo[orderTaken].cropId;	 
            uint s = cropInfo[c].ownId;
            uint r = buyerOrderInfo[orderTaken].buyerId;
            uint q = buyerOrderInfo[orderTaken].quantity;
	    }
	    uint st = 0; uint d = 0; uint p = 0; uint a = 2;
	    transportOrderInfo[transportOrderCount] = transportOrder(transportOrderCount, orderType, orderTaken, s, r, q, st, d, p ,a);
        transportOrderCount++;
        return true;
	}

	function changeStatus(uint orderType, uint orderId, uint newStatus) returns (bool) {  ////orderType: 0--buyer 1--store 2--transport
        if(orderType == 0){
            buyerOrderInfo[orderId].statusOrder = newStatus;
        }
        else if(orderType == 1){
            storeOrderInfo[orderId].statusOrder = newStatus;
        }
        else if(orderType == 2){
            transportOrderInfo[orderId].statusOrder = newStatus;
        }
	}
	
	function changeDelivered(uint orderType, uint orderId, uint newStatus) returns (bool) {  ////orderType: 0--buyer 1--store 2--transport
        if(orderType == 0){
            buyerOrderInfo[orderId].delivered = newStatus;
        }
        else if(orderType == 1){
            storeOrderInfo[orderId].delivered = newStatus;
        }
        else if(orderType == 2){
            transportOrderInfo[orderId].delivered = newStatus;
        }
	}
	
	function changePicked(uint orderType, uint orderId, uint newStatus) returns (bool) {  ////orderType: 0--buyer 1--store 2--transport
        if(orderType == 0){
            buyerOrderInfo[orderId].picked = newStatus;
        }
        else if(orderType == 1){
            storeOrderInfo[orderId].picked = newStatus;
        }
        else if(orderType == 2){
            transportOrderInfo[orderId].picked = newStatus;
        }
	}
	
	function changeAccept(uint orderType, uint orderId, uint newStatus) returns (bool) {  ////orderType: 0--buyer 1--store 2--transport
        if(orderType == 0){
            buyerOrderInfo[orderId].accept = newStatus;
        }
        else if(orderType == 1){
            storeOrderInfo[orderId].accept = newStatus;
        }
        else if(orderType == 2){
            transportOrderInfo[orderId].accept = newStatus;
        }
	}
}



















