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
	}
	);
	
	//variable to index the id in table
	//var tdID = 0;
	
	//references to children of the root in firebase database for each user type
	var vcaAdminsRef = firebase.database().ref().child("admins");
	var vcaAssistantsRef = firebase.database().ref().child("assistants");
	var vcaPatientsRef = firebase.database().ref().child("patients");
	
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaAdminsRef.on
	('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var fName = snap.child("fName").val();
		var lName = snap.child("lName").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		var id = snap.child("firebaseID").val();
		
		//alert("Name: " + fName + " Last: " + lName + " email: " + email + " address: " + address)
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + fName +"</td><td>" + lName + "<\td><td>" + email + "</td><td>" + address + "</td><td id=fireID onClick = editThis(&quot;" + id + "&quot;)>"+ id +"</td></tr>"
		);
		
		//tdID = tdID+1;
	}
	);
	
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaAssistantsRef.on
	('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var fName = snap.child("fName").val();
		var lName = snap.child("lName").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		var id = snap.child("firebaseID").val();
		
		//alert("Name: " + fName + " Last: " + lName + " email: " + email + " address: " + address)
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + fName +"</td><td>" + lName + "<\td><td>" + email + "</td><td>" + address + "</td><td id=fireID onClick = editThis(&quot;" + id + "&quot;)>"+ id +"</td></tr>"
		);
		
		//tdID = tdID+1;
	}
	);
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaPatientsRef.on('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var fName = snap.child("fName").val();
		var lName = snap.child("lName").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		var id = snap.child("firebaseID").val();
		
		//alert("Name: " + fName + " Last: " + lName + " email: " + email + " address: " + address)
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child and call editThis() with the firebase id as parameter
		$("#adminTableBody").append
		(
			"<tr><td>" + fName +"</td><td>" + lName + "<\td><td>" + email + "</td><td>" + address + "</td><td id=fireID onClick = editThis(&quot;" + id + "&quot;)>"+ id +"</td></tr>"
		);
		
		//tdID = tdID+1;
	}
	);
	
}());


//this function is called when a cell with firebase id in admin table is clicked and receives the firebase id as parameter
function editThis(fID)
{
	//for testing
	//alert(fID);
	
	//reference to patients
	 var patientsRef = firebase.database().ref("patients");
    
	//on value change call getPatientList
	patientsRef.on('value', getPatientList);
	
	document.getElementById('fNameSelected').innerText = "POOP";

	//generates a list of objects corresponding to users in database
    function getPatientList(data)
	{	
		//set patientList to data received
		var patientList = data.val();
		
		//turn patientList into an object?
		keys = Object.keys(patientList);
		
		//log keys to the console
		console.log(keys);
		
		
		//loop for all elements in keys
		for(var i = 0; i < keys.length ; i++)
		{	
			
			//set k to keys at index i (keys are the ids of the children in the firebase database NOTE NOT THE SAME AS FIREBASE UID
			var k = keys[i];
			
			//if firebaseID at index k in patientList is the same as fID(clicked ID) we have found the user we need
			if(patientList[k].firebaseID == fID)
			{
				// testing
				alert("name: " + patientList[k].fName + " lName : " + patientList[k].lName + " address: " + patientList[k].address + " email: " + patientList[k].email );
				
				
				
				
				
				var fName = document.getElementById('fNameSelected');
				var lName = document.getElementById('lNameSelected');
				var email = document.getElementById('emailSelected');
				var address = document.getElementById('addressSelected');
				
				//go to admin-selected page
				window.location.href = "VCA-Admin-Selected.html";
				
				alert("HI");
				
				//fName.innerHTML = patientList[k].fName;
				
				localStorage.setItem('fNameStore', patientList[k].fName);
				
				document.getElementById('fNameSelected').innerText = localStorage.getItem('fNameStore');
				
				
				
				
			}
			
			//document.getElementById('fNameSelected').innerText = "POOP";
		}
		
		
		
		/*
		//loop for all elements in keys
		for(var i = 0; i < keys.length ; i++)
		{	
			//set k to keys at index i
			var k = keys[i];
			
			//set patientId to the firebaseID field of an element in patientList at index k
			var patientId = (patientList[k].firebaseID);
			
			//log patientId to the console
			console.log(patientId);
			
			// set node to a newly created element ol
			var node = document.createElement("ol");
			
			// set the inner html text of node to patientId
			node.innerText = patientId;
			
			//testing
			alert(node);
			
			//append node to items
			//document.getElementById("items").appendChild(node);
      }//end of forloop
	  */
    }
	
	
}





//pulls info from fields for addins a user
function pullInput()
{	
	//variables to hold input from fields for adding a user
	var fName = document.getElementById('fNameTxtField').value;
	var lName = document.getElementById('lNameTxtField').value;
	var adrs = document.getElementById('AddressTxtField').value;
	var email = document.getElementById('emailTxtField').value;
	var pass = document.getElementById('passwordTxtField').value;

	// a variable that holds the selection from radio buttons , set to patient by default
	var accTypeFromRadio = document.getElementById('patientRadioInput').value;
	

	//variables for coordinates requested by Jack to be pushed empty to patient on create
	var longi = "";
	var lati = "";
	
	//variable to hold unique user id
	var id = "";
	
	
	//code from firebase for creating a user with email and password
	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error)
	{
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
	// ...
	});
	
	
	//makes a delay for firebase to do its work other wise we get the wrong user id
	setTimeout(function()
	{ 
	
	//currently logged in user 
	var user = firebase.auth().currentUser;
	
	//alert(user.email + " after adding " + user.uid)
	//if successful warn the user that they are logged in as the newly created user
	if(user)
	{
		alert("New User Added Succesfully. WARNING you are now logged in as the newly created user.");
		//this reminds me that the patients should not be able to add new patients
		//so we need another page for adding users that is only accesable to the assistants. I will make it later.
	}
	
	id = user.uid;
	
	
	//reference to the firebase database root
	var rootRef = firebase.database().ref();
	
	//if patient is checked
	if(document.getElementById('patientRadioInput').checked)
	{
		//set accTypeFromRadio to patient value
		accTypeFromRadio = document.getElementById('patientRadioInput').value;
		
		//reference to patients
		var patientRef = rootRef.child("patients");
		
		//reference to child of patients with push
		var patientChildRef = patientRef.push();
		
		//creates a new child in patients with unique ID made by firebase with all fields passed in and values from the user
		patientChildRef.set({firebaseID: id, fName: fName, lName: lName, address: adrs, email: email, password: pass, longitude: longi, latitude: lati});
	

	}
	//if assistant is checked
	else if(document.getElementById('assistantRadioInput').checked)
	{
		//set accTypeFromRadio to assistant value
		accTypeFromRadio = document.getElementById('assistantRadioInput').value;

		//reference to assistants
		var assistantsRef = rootRef.child("assistants");
		
		//reference to child of assistants with push
		var assistantsChildRef = assistantsRef.push();
		
		//creates a new child in assistants with unique ID made by firebase with all fields passed in and values from the user
		assistantsChildRef.set({firebaseID: id, fName: fName, lName: lName, address: adrs, email: email,password: pass});
		

	}
	//if admin is checked
	else if(document.getElementById('adminRadioInput').checked)
	{
		//set accTypeFromRadio to admin value
		accTypeFromRadio = document.getElementById('adminRadioInput').value;
		
		//reference to admins
		var adminsRef = rootRef.child("admins");
		
		//reference to child of admins with push
		var adminsChildRef = adminsRef.push();
		
		//creates a new child in admins with unique ID made by firebase with all fields passed in and values from the user
		adminsChildRef.set({firebaseID: id, fName: fName, lName: lName, address: adrs, email: email,password: pass});	
	}
	
	//testing input
	//alert(fName+lName+adrs+accTypeFromRadio+email+pass);
	
	//clear input fields at the end
	document.getElementById('fNameTxtField').value = "";
	document.getElementById('lNameTxtField').value = "";
	document.getElementById('emailTxtField').value = "";
	document.getElementById('AddressTxtField').value = "";
	document.getElementById('passwordTxtField').value = "";
	
	
	
	//Right now when we "create" a new user we add a new child to the database and then 
	//we create a new firebase user with supplied email and password, the way the .createUserWithEmailAndPassword()
	//works is it automatically signs in that user if signup was a success, not sure how much of a problem for us this is
	//but we should find a solution for this or a workaround later
	
	
	
	}, 3000);//second parameter is the amount of time to wait
	//end of setTimeout
}


