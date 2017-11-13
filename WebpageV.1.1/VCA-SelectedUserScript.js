(function()
{
	 //code from firebase
    // Initialize Firebase
    const config =
        {
            apiKey: "AIzaSyBXBZz8ADFzd1AG-SrBcFh2ZSkdZAS7MRw",
            authDomain: "virtual-care-assistant-462a4.firebaseapp.com",
            databaseURL: "https://virtual-care-assistant-462a4.firebaseio.com",
            storageBucket: "virtual-care-assistant-462a4.appspot.com",
        };

    firebase.initializeApp(config);
	
	//get log out button element
    const logOutBtn = document.getElementById('logOutBtn');

    //add listener to logOutBtn
    logOutBtn.addEventListener('click', e=>
    {
        //sign out the current user
        firebase.auth().signOut();
        window.location.href = "VCA-Login.html";
	}
	);
	
	function logOut()
	{
		//alert("logOut function");
		//go to login page
		window.location.href = "VCA-Login.html"
	}
	
	//realtime authorization listener // can be commented out after testing to avid running every time
    firebase.auth().onAuthStateChanged(user =>
    {
        if (user)
        {
            //logs to console user info
            console.log(user);
			//alert(user.email + " at start " + user.uid)
        }
        else
        {
			// No user is signed in
			//logs to console a message
			console.log("user logedOut/not logged in...thx obama!");
		}
	});
	
	//test
	//alert(sessionStorage.getItem("firebaseID"));
	
	//reference to patients
	 var patientsRef = firebase.database().ref("patients");
	 
	 //reference to assistants
	 var assistantsRef = firebase.database().ref("assistants");
	 
	 //reference to admins
	 var adminsRef = firebase.database().ref("admins");
    
/*	//on value change call getUserList
	adminsRef.on('value', getUserList);
	
	//on value change call getUserList
	assistantsRef.on('value', getUserList);
	
	//on value change call getUserList
	patientsRef.on('value', getUserList);*/

	
	for(var x =0; x <3 ; x++)
	{
		if(x==0)
		{
			//on value change call getUserList
			adminsRef.on('value', getUserList);
		}
		else if(x == 1)
		{
			//on value change call getUserList
			assistantsRef.on('value', getUserList);
		}
		else
		{
			//on value change call getUserList
			patientsRef.on('value', getUserList);
		}
	}

	//generates a list of objects corresponding to users in database
    function getUserList(data)
	{	
		//set patientList to data received
		var userList = data.val();
		
		//turn patientList into an object?
		keys = Object.keys(userList);
		
		//log keys to the console
		//console.log(keys);
		
		//loop for all elements in keys
		for(var i = 0; i < keys.length ; i++)
		{	
			//set k to keys at index i (keys are the ids of the children in the firebase database NOTE NOT THE SAME AS FIREBASE UID
			var k = keys[i];
			
			//if firebaseID at index k in patientList is the same as fID(clicked ID) we have found the user we need
			if(userList[k].firebaseID == sessionStorage.getItem("firebaseID"))
			{
				// testing
				//alert("name: " + userList[k].fName + " lName : " + userList[k].lName + " address: " + userList[k].address + " email: " + userList[k].email );
				
				//get dom elements
				var fName = document.getElementById('fNameSelected');
				var lName = document.getElementById('lNameSelected');
				var email = document.getElementById('emailSelected');
				var address = document.getElementById('addressSelected');
				var pass = document.getElementById('passwordSelected');
				var geoLong = document.getElementById('GeoLongitudeSelected');
				var geoLat = document.getElementById('GeoLatitudeSelected');
				var phone = document.getElementById('PhoneSelected');
				
				//fill fields on screen with user values
				fName.innerHTML = "First Name: " +userList[k].fName;
				lName.innerHTML = "Last Name: " +userList[k].lName;
				email.innerHTML = "Email: " +userList[k].email;
				address.innerHTML = "Address: " +userList[k].address;
				pass.innerHTML = "Password: " +userList[k].password;
				geoLong.innerHTML = "Geo-Fence Longitude: " +userList[k].GeoLongitude;
				geoLat.innerHTML = "Geo-Fence Latitude: "+userList[k].GeoLatitude;
				phone.innerHTML = "Phone: "+userList[k].phone;
				
				
				
				document.getElementById("fNameTxtField").value = userList[k].fName;
				document.getElementById("lNameTxtField").value = userList[k].lName;
				document.getElementById("emailTxtField").value = userList[k].email;
				document.getElementById("AddressTxtField").value = userList[k].address;
				document.getElementById("passwordTxtField").value = userList[k].password;
				document.getElementById("GeoLongitudeField").value = userList[k].GeoLongitude;
				document.getElementById("GeoLatitudeField").value = userList[k].GeoLatitude;
				document.getElementById("PhoneField").value = userList[k].phone;
				
				//alert(keys[i]);
				
				//store fID in sesson storage
				sessionStorage.setItem("selectedUserKey", keys[i]);
				sessionStorage.setItem("selectedUserObj", userList[k]);
				
			}//end of if
		}//end of forloop
    }//end of getPatients()
	
}());


function deleteUser()
{
	//reference to patients
	 var patientsRef = firebase.database().ref("patients");
	 
	 //reference to assistants
	 var assistantsRef = firebase.database().ref("assistants");
	 
	 //reference to admins
	 var adminsRef = firebase.database().ref("admins");
	
	 var selectedUserKey = sessionStorage.getItem("selectedUserKey");
	
	for(var x =0; x <3 ; x++)
	{
		if(x==0)
		{
			//on value change call getList
			adminsRef.on('value', getList);
		}
		else if(x == 1)
		{
			//on value change call getList
			assistantsRef.on('value', getList);
		}
		else
		{
			//on value change call getList
			patientsRef.on('value', getList);
		}
	}
	

	function getList(users)
	{
		//set patientList to data received
		var userList = users.val();
		
		//turn patientList into an object?
		keys = Object.keys(userList);
		
		//log keys to the console
		//console.log(keys);
		
		//loop for all elements in keys
		for(var i = 0; i < keys.length ; i++)
		{	
			//set k to keys at index i (keys are the ids of the children in the firebase database NOTE NOT THE SAME AS FIREBASE UID
			var k = keys[i];
			
			//if key is same as selectedUserKey we have the correct user
			if(k == sessionStorage.getItem("selectedUserKey"))
			{
				
				//attempt to delete selected user, only the user in the correct child will be deleted.
				patientsRef.child(selectedUserKey).remove();
				assistantsRef.child(selectedUserKey).remove();
				adminsRef.child(selectedUserKey).remove();
				
				firebase.auth().signInWithEmailAndPassword(userList[k].email, userList[k].password).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// ...
				});
				
				setTimeout(function()
				{ 
					firebase.auth().currentUser.delete()
					
				}, 3000);
				
			}//end of if
		}//end of forloop
	}
}

function updateUser()
{
	//reference to patients
	 var patientsRef = firebase.database().ref("patients");
	 
	 //reference to assistants
	 var assistantsRef = firebase.database().ref("assistants");
	 
	 //reference to admins
	 var adminsRef = firebase.database().ref("admins");
	 
	//get the stored selectedUserKey
	 var selectedUserKey = sessionStorage.getItem("selectedUserKey");
	
	//for very user type
	for(var x =0; x <3 ; x++)
	{
		if(x==0)
		{
			//on value change call getList
			adminsRef.on('value', getList);
			
			sessionStorage.setItem("type", "0");
			
		}
		else if(x == 1)
		{
			//on value change call getList
			assistantsRef.on('value', getList);
			
			sessionStorage.setItem("type", "1");
		}
		else
		{
			//on value change call getList
			patientsRef.on('value', getList);
			
			sessionStorage.setItem("type", "2");
		}
	}
	
	function getList(users)
	{
		//set patientList to data received
		var userList = users.val();
		
		//turn patientList into an object?
		keys = Object.keys(userList);
		
		var parent = users.ref().name();
		
		//log keys to the console
		//console.log(keys);
		
		//loop for all elements in keys
		for(var i = 0; i < keys.length ; i++)
		{	
			//set k to keys at index i (keys are the ids of the children in the firebase database NOTE NOT THE SAME AS FIREBASE UID
			var k = keys[i];
			
			//if key is same as selectedUserKey we have the correct user
			if(k == sessionStorage.getItem("selectedUserKey"))
			{
				/*//code to update the user
				if(sessionStorage.getItem("type") == 0)
				{
					alert(sessionStorage.getItem("type"));
				}
				else if(sessionStorage.getItem("type") == 1)
				{
					alert(sessionStorage.getItem("type"));
				}
				else if(sessionStorage.getItem("type") == 2)
				{
					alert(sessionStorage.getItem("type"));
				}*/
				
				alert(parent);
				
				var fName = document.getElementById("fNameTxtField").value;
				var lName = document.getElementById("lNameTxtField").value;
				var email = document.getElementById("emailTxtField").value;
				var address = document.getElementById("AddressTxtField").value;
				var pass = document.getElementById("passwordTxtField").value;
				var geoLong = document.getElementById("GeoLongitudeField").value;
				var geoLat = document.getElementById("GeoLatitudeField").value;
				var phone = document.getElementById("PhoneField").value;
				
				//alert("name: " + fName + " lName : " + lName + " address: " + address + " email: " + email + " Password: " + pass + " long: " + geoLong + " lat: " + geoLat + " phone: " + phone);
				
				//alert(sessionStorage.getItem("type"));
				
				/*patientsRef.child(k).update({"fName": fName, "lName": lName, "email": email, "address": address, "password": pass, "GeoLatitude": geoLat, "GeoLongitude": geoLong, "phone": phone});
				assistantsRef.child(k).update({"fName": fName, "lName": lName, "email": email, "address": address, "password": pass, "phone": phone});
				adminsRef.child(k).update({"fName": fName, "lName": lName, "email": email, "address": address, "password": pass, "phone": phone});*/
				
				
				
			}//end of if
		}//end of forloop
	}
}




