toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"ownid","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"}],"name":"addStore","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"sendPass","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"storeInfo","outputs":[{"name":"id","type":"uint256"},{"name":"ownId","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"},{"name":"remain","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"orderCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"ownid","type":"uint256"},{"name":"quantity","type":"uint256"},{"name":"price","type":"uint256"}],"name":"addCrop","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ownid","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"}],"name":"addTransport","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"balance","type":"uint256"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"transportInfo","outputs":[{"name":"id","type":"uint256"},{"name":"ownId","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orderInfo","outputs":[{"name":"id","type":"uint256"},{"name":"quantity","type":"uint256"},{"name":"mainId","type":"uint256"},{"name":"sId1","type":"uint256"},{"name":"sId2","type":"uint256"},{"name":"orderType","type":"uint256"},{"name":"status","type":"uint256"},{"name":"accept","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"quantity","type":"uint256"},{"name":"id1","type":"uint256"},{"name":"id2","type":"uint256"},{"name":"id3","type":"uint256"},{"name":"orderType","type":"uint256"}],"name":"addOrder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"storeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transportCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"string"}],"name":"getUserId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cropCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cropInfo","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"ownId","type":"uint256"},{"name":"quantity","type":"uint256"},{"name":"price","type":"uint256"},{"name":"amountSold","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
registerUserContract = web3.eth.contract(abi);

contractInstance = registerUserContract.at('0x2c735a75a002c6a571028cc725937d7493667c2e');
data = "" ;

userId=0;


function postCrop(){
	cropName=$("#cropname").val();
	cropQuant=parseInt($("#cropquant").val());
	cropPrice=parseInt($("#cropprice").val());
	
	contractInstance.addCrop(cropName, toAccount, cropQuant , cropPrice, { from: web3.eth.accounts[toAccount],gas: 3000000});
	alert("Add Posted");
}

function showCrops()
{
	data = "";

	for (i = 0; i < contractInstance.cropCount.call().c[0] ; i++ ) {
		str = contractInstance.cropInfo.call(i)+'';
		console.log(str);
		var arr = str.split(',');
		id = parseInt(arr[2]);
		if(id == toAccount)
		{
			left = parseInt(arr[3]) - parseInt(arr[5]);
			data += "<tr> <td> " + arr[0] + "</td><td> "+ arr[1] + "</td><td> " + arr[3] + "</td><td> " + arr[4] + "</td><td> " + left + "</td></tr>";
		}
	}
  	$("#crop_details").html(data);
}

function showAllStores(){
	for (i = 0; i < contractInstance.storeCount.call().c[0] ; i++ ) {
		str = contractInstance.storeInfo.call(i)+'';
		console.log(str);
		var arr = str.split(',');
		id = parseInt(arr[1]);
		name = contractInstance.getUserName.call(id)+'';
		data += "<tr> <td> " + arr[0] + "</td><td> "+ name + "</td><td> " + arr[4] + "</td><td> " + arr[3] + "</td></tr>";
	}
}

function placeStoreOrder(){
	//////////CropId CropQuantity StoreId will be given.
		contractInstance.addStoreOrder(cropId, storeId, quant , { from: web3.eth.accounts[toAccount],gas: 3000000});

	/////////Now orderType & orderId will be obtained for transportation
		contractInstance.addTransportOrder(orderType, orderTaken, { from: web3.eth.accounts[toAccount],gas: 3000000});
}

function acceptBuyerOrder(){
	orderType = 0;
	newState = 1;
	///////////////////////////////////OrderId will be obtained
	contractInstance.changeAccept(orderType, orderId, newState, { from: web3.eth.accounts[toAccount],gas: 3000000});
}

function declineBuyerOrder(){
	orderType = 0;
	newState = 0;
	///////////////////////////////////OrderId will be obtained
	contractInstance.changeAccept(orderType, orderId, newState, { from: web3.eth.accounts[toAccount],gas: 3000000});
}

function pickStoreOrder(){
	orderType = 1;
	newState = 1;
	///////////////////////////////////OrderId will be obtained
	contractInstance.changePicked(orderType, orderId, newState, { from: web3.eth.accounts[toAccount],gas: 3000000});
}