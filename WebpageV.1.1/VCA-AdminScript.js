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
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaAdminsRef.on
	('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var name = snap.child("name").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + name +"</td><td>" + email + "</td><td>" + address + "</td></tr>"
		);
	}
	);
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaAssistantsRef.on
	('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var name = snap.child("name").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + name +"</td><td>" + email + "</td><td>" + address + "</td></tr>"
		);
	}
	);
	
	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaPatientsRef.on
	('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var name = snap.child("name").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		
		//(jquery) append table rows and table data to the adminTableBody table with the atributes of the retrieved child
		$("#adminTableBody").append
		(
			"<tr><td>" + name +"</td><td>" + email + "</td><td>" + address + "</td></tr>"
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
	var adrs = document.getElementById('AddressTxtField').value;
	var email = document.getElementById('emailTxtField').value;
	var pass = document.getElementById('passwordTxtField').value;
	
	// a variable that holds the selection from radio buttons , set to patient by default
	var accTypeFromRadio = document.getElementById('patientRadioInput').value;
	
	
	//reference to database root
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
		patientChildRef.set({fname: fName, lName: lName, address: adrs, email: email,password: pass});
	
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
		assistantsChildRef.set({fname: fName, lName: lName, address: adrs, email: email,password: pass});
		
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
		adminsChildRef.set({fname: fName, lName: lName, address: adrs, email: email,password: pass});	
	}
	
	//testing input
	alert(fName+lName+adrs+accTypeFromRadio+email+pass);
	
	//clear the input fields
	document.getElementById('fNameTxtField').value = "";
	document.getElementById('lNameTxtField').value = "";
	document.getElementById('AddressTxtField').value = "";
	document.getElementById('emailTxtField').value = "";
	document.getElementById('passwordTxtField').value = "";
	
}


