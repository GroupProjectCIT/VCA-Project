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
	
	//references to children of the root in firebase database for each user type
	var vcaAdminsRef = firebase.database().ref().child("admins");
	var vcaAssistantsRef = firebase.database().ref().child("assistants");
	var vcaPatientsRef = firebase.database().ref().child("patients");
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//ADD BLANK FIELDS FOR LONG AND LATIT WHEN CREATING A PATIENT
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaAdminsRef.on
	('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var fName = snap.child("fName").val();
		var lName = snap.child("lName").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + fName +"</td><td>" + lName + "<\td><td>" + email + "</td><td>" + address + "</td></tr>"
		);
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
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + fName +"</td><td>" + lName + "<\td><td>" + email + "</td><td>" + address + "</td></tr>"
		);
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
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + fName +"</td><td>" + lName + "<\td><td>" + email + "</td><td>" + address + "</td></tr>"
		);
	}
	);
	

}());



//pulls info from fields for addins a user
function pullInput()
{	
	//variables to hold input from fields for adding a user
	var fName = document.getElementById('fNameTxtField').value;
	var lName = document.getElementById('lNameTxtField').value;
	var address = document.getElementById('AddressTxtField').value;

	// a variable that holds the selection from radio buttons , set to patient by default
	var accTypeFromRadio = document.getElementById('patientRadioInput').value;
	
<<<<<<< HEAD
	//variables for coordinates requested by Jack to be pushed empty to patient on create
	var longi = "";
	var lati = "";
=======
	var email = document.getElementById('emailTxtField').value;
	var pass = document.getElementById('passwordTxtField').value;
>>>>>>> 3455e52e706b1557f93a8b6a029c7ac7df5bb692
	
	
	//if patient is checked
	if(document.getElementById('patientRadioInput').checked)
	{
		//set accTypeFromRadio to patient value
		accTypeFromRadio = document.getElementById('patientRadioInput').value;
<<<<<<< HEAD
		
		//reference to patients
		var patientRef = rootRef.child("patients");
		
		//reference to child of patients with push
		var patientChildRef = patientRef.push();
		
		//creates a new child in patients with unique ID made by firebase with all fields passed in and values from the user
		patientChildRef.set({fName: fName, lName: lName, address: adrs, email: email,password: pass, longitude: longi, latitude: lati});
	
=======
>>>>>>> 3455e52e706b1557f93a8b6a029c7ac7df5bb692
	}
	//if assistant is checked
	else if(document.getElementById('assistantRadioInput').checked)
	{
		//set accTypeFromRadio to assistant value
		accTypeFromRadio = document.getElementById('assistantRadioInput').value;
<<<<<<< HEAD
		
		//reference to assistants
		var assistantsRef = rootRef.child("assistants");
		
		//reference to child of assistants with push
		var assistantsChildRef = assistantsRef.push();
		
		//creates a new child in assistants with unique ID made by firebase with all fields passed in and values from the user
		assistantsChildRef.set({fName: fName, lName: lName, address: adrs, email: email,password: pass});
		
=======
>>>>>>> 3455e52e706b1557f93a8b6a029c7ac7df5bb692
	}
	//if admin is checked
	else if(document.getElementById('adminRadioInput').checked)
	{
		//set accTypeFromRadio to admin value
		accTypeFromRadio = document.getElementById('adminRadioInput').value;
<<<<<<< HEAD
		
		//reference to admins
		var adminsRef = rootRef.child("admins");
		
		//reference to child of admins with push
		var adminsChildRef = adminsRef.push();
		
		//creates a new child in admins with unique ID made by firebase with all fields passed in and values from the user
		adminsChildRef.set({fName: fName, lName: lName, address: adrs, email: email,password: pass});	
=======
>>>>>>> 3455e52e706b1557f93a8b6a029c7ac7df5bb692
	}
	
	//testing input
	alert(fName+lName+address+accTypeFromRadio+email+pass);
}


