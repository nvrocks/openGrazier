toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"ownid","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"}],"name":"addStore","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"sendPass","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"storeInfo","outputs":[{"name":"id","type":"uint256"},{"name":"ownId","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"},{"name":"remain","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"orderCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"ownid","type":"uint256"},{"name":"quantity","type":"uint256"},{"name":"price","type":"uint256"}],"name":"addCrop","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ownid","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"}],"name":"addTransport","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"balance","type":"uint256"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"transportInfo","outputs":[{"name":"id","type":"uint256"},{"name":"ownId","type":"uint256"},{"name":"capacity","type":"uint256"},{"name":"price","type":"uint256"},{"name":"status","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"storeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"transportCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cropCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cropInfo","outputs":[{"name":"id","type":"uint256"},{"name":"name","type":"string"},{"name":"ownId","type":"uint256"},{"name":"quantity","type":"uint256"},{"name":"price","type":"uint256"},{"name":"status","type":"uint256"},{"name":"amountSold","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]');
registerUserContract = web3.eth.contract(abi);

contractInstance = registerUserContract.at('0xed6bba19655fe0e54b56fb2648c06a1dc3817ebf');
data = "" ;

noofuser=contractInstance.userCount.call().c[0];
toAccount=noofuser;

function addUser(){
    //fetching values from html
	name=$("#username").val();
	contact=$("#usercontact").val();
	usertype=$("#usertype").val();
	ulocation=$("#userlocation").val();
	email=$("#useremail").val();
	pass=$("#userpass").val();
	cpass=$("#usercpass").val();

	userTypeId=parseInt( findUserTypeId(usertype) ); //finding id for user type


	if( name=="" || contact == "" || usertype == "" || ulocation == "" || email == "" || pass == "" || cpass == "" )
	{
		alert("Please fill all the details.");
	}
	else{

		if(pass == cpass){
			contractInstance.registerMe(name,contact,toAccount,userTypeId,ulocation,email,pass,{ from: web3.eth.accounts[toAccount],gas: 3000000});
			noofuser=contractInstance.userCount.call().c[0];
			toAccount=noofuser;
			alert("user successfully registered");
			displayUsers();
		}
		else
		{
			alert("Passwords not matched");
		}
	}
}
function displayUsers(){
	data = "";
	data+="<tr> <td> check </td><td>  "+contractInstance.userCount.call().c[0] +" </td></tr>" ;
  for (i = 0; i < contractInstance.userCount.call().c[0] ; i++ ) {
    data += "<tr> <td> " + contractInstance.userIdList.call(i) + "</td><td> "+ contractInstance.userInfo.call ( contractInstance.userIdList.call(i) ) +"</td></tr>";
  }
  $("#propertyTable").html(data);
}

function findUserTypeId ( userType ){
	
	if(userType == "Farmer")
		return "1";
	else if(userType == "Transportation")
		return "2";
	else if(userType == "Storage")
		return "3";
	else if(userType == "Buyer")
		return "4";

}

displayUsers();