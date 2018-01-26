toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint8"},{"name":"usertype","type":"string"},{"name":"location","type":"string"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint8"},{"name":"usertype","type":"string"},{"name":"location","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"uid","type":"uint8"}],"name":"getUserDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint8"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
registerUserContract = web3.eth.contract(abi);

contractInstance = registerUserContract.at('0x295de2908dfd76933813cd3efdb3d0413333ffc2');
data = "" ;

noofuser=contractInstance.userCount.call().c[0];
toAccount=noofuser;
function addUser(){
	userid=parseInt($("#userid").val());
	username=$("#username").val();
	usercontact=$("#usercontact").val();
	userlocation=$("#userlocation").val();
	usertype=$("#usertype").val();
	contractInstance.registerMe(username,usercontact,userid,usertype,userlocation,{ from: web3.eth.accounts[toAccount],gas: 3000000});
	noofuser=contractInstance.userCount.call().c[0];
	toAccount=noofuser;
	alert("user successfully registered");
	displayUsers();
}
function displayUsers(){
	data = "";
	data+="<tr> <td> check </td><td>  "+contractInstance.userCount.call().c[0] +" </td></tr>" ;
  for (i = 0; i < contractInstance.userCount.call().c[0] ; i++ ) {
    data += "<tr> <td> " + contractInstance.userIdList.call(i) + "</td><td> "+ contractInstance.userInfo.call ( contractInstance.userIdList.call(i) ) +"</td></tr>";
  }
  $("#propertyTable").html(data);
}

function login(){
	userid=parseInt($("#userid").val());
	pass=$("#pass").val();
	actualPass = contractInstance.sendPass.call(userid);
	if(pass = actualPass)
	{
		console.log("Login Successful");
	}
}

displayUsers();