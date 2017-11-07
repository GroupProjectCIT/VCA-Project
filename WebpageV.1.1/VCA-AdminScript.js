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
	var address = document.getElementById('AddressTxtField').value;

	// a variable that holds the selection from radio buttons , set to patient by default
	var accTypeFromRadio = document.getElementById('patientRadioInput').value;
	
	var email = document.getElementById('emailTxtField').value;
	var pass = document.getElementById('passwordTxtField').value;
	
	
	//if patient is checked
	if(document.getElementById('patientRadioInput').checked)
	{
		//set accTypeFromRadio to patient value
		accTypeFromRadio = document.getElementById('patientRadioInput').value;
	}
	//if assistant is checked
	else if(document.getElementById('assistantRadioInput').checked)
	{
		//set accTypeFromRadio to assistant value
		accTypeFromRadio = document.getElementById('assistantRadioInput').value;
	}
	//if admin is checked
	else if(document.getElementById('adminRadioInput').checked)
	{
		//set accTypeFromRadio to admin value
		accTypeFromRadio = document.getElementById('adminRadioInput').value;
	}
	
	//testing input
	alert(fName+lName+address+accTypeFromRadio+email+pass);
}


