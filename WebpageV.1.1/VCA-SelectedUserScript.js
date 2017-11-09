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
				
				var fName = document.getElementById('fNameSelected');
				var lName = document.getElementById('lNameSelected');
				var email = document.getElementById('emailSelected');
				var address = document.getElementById('addressSelected');
				var pass = document.getElementById('passwordSelected');
				
				fName.innerHTML = "First Name: " +userList[k].fName;
				lName.innerHTML = "Last Name: " +userList[k].lName;
				email.innerHTML = "Email: " +userList[k].email;
				address.innerHTML = "Address: " +userList[k].address;
				pass.innerHTML = "Password: " +userList[k].password;
				
			}//end of if
		}//end of forloop
    }//end of getPatients()
	
	
	
}());