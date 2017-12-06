
//When page is loaded start getLocation()
window.addEventListener("load", getLocation);

(function()
{
    //alert("onStart function");

    //code from firebase
    // Initialize Firebase
    const config =
        {
			//apiKey: "AIzaSyBXBZz8ADFzd1AG-SrBcFh2ZSkdZAS7MRw",
			apiKey:"AIzaSyAYJ0F9FHs0qlcHhFnubQyJvZLb23DkxnA",
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


	//references to children of the root in firebase database for patients
	var vcaPatientsRef = firebase.database().ref().child("patients");

	//on adding of a child referenced by vcaAdminsRef, this triggers whenever a new child is added or on loading of page
	vcaPatientsRef.on('child_added', snap =>
	{
		// variables to hold the atributes/labels of the retrieved child returned in the snap
		var fName = snap.child("fName").val();
		var lName = snap.child("lName").val();
		var email = snap.child("email").val();
		var address = snap.child("address").val();
		//var id = snap.child("firebaseID").val();

		//alert("Name: " + fName + " Last: " + lName + " email: " + email + " address: " + address)

		//(jquery) append table rows and table data to the patients table with the atributes of the retrieved child
		$("#patientTableBody").append
		(
			"<tr><td>"+ fName +"</td><td>"+lName+"</td><td>"+email+"</td><td>"+address+"</td></tr>" /* THIS ADDS ID TO THE PATIENT TABLE COMENTING IT OUT AS IT WAS NOT DESIRED  BY CLIENT <td id=fireID onClick = editThis(&quot;"+id+"&quot;)>"+id+"</td>*/
		);

	}
	);
	
	//reference to the firebase database root
	var rootRef = firebase.database().ref();
	
	//references to children of database root
	var patientsRef = rootRef.child("patients");
	var assistantsRef = rootRef.child("assistants");
	var adminsRef = rootRef.child("admins");
	
/*	//we need to call getUsersList 3 times, once with each children reference
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
	}*/
	
	//generates a list of objects corresponding to users in database
    function getUserList(data)
	{	
		//set patientList to data received
		//var userList = data.val();
		
		//turn patientList into an object?
		//keys = Object.keys(userList);
		
		//log keys to the console
		//console.log(keys);
		
		//loop for all elements in keys
		//for(var i = 0; i < keys.length ; i++)
		{	
			//set k to keys at index i (keys are the ids of the children in the firebase database NOTE NOT THE SAME AS FIREBASE UID
			//var k = keys[i];
			
			//var user = firebase.auth().currentUser;
			
			//if firebaseID at index k in patientList is the same as fID(clicked ID) we have found the user we need
			//if(userList[k].firebaseID == user.uid)
			{
				// testing
				//alert("name: " + userList[k].fName + " lName : " + userList[k].lName + " address: " + userList[k].address + " email: " + userList[k].email );
				
				//get dom elements
				/*var fName = document.getElementById('fName');
				var lName = document.getElementById('lName');
				var email = document.getElementById('email');
				var address = document.getElementById('address');
				var phone = document.getElementById('phone');
				
				//fill fields on screen with user values
				fName.innerHTML = "First Name: " +userList[k].fName;
				lName.innerHTML = "Last Name: " +userList[k].lName;
				email.innerHTML = "Email: " +userList[k].email;
				address.innerHTML = "Address: " +userList[k].address;
				phone.innerHTML = "Phone: "+userList[k].phone;*/
				
				//alert(keys[i]);
			}//end of if
		}//end of forloop
    }//end of getPatients()

}
()
);

/*//this function is called when a cell with firebase id in admin table is clicked and receives the firebase id as parameter
function editThis(fID)
{
	//for testing
	alert(fID);
}*/


function logOut()
{
    //alert("logOut function");
    //go to login page
    window.location.href = "VCA-Login.html"
}

function assistantAddPatient()
{
	//variables to hold input from fields for adding a user
	var fName = document.getElementById('fNameTxtField').value;
	var lName = document.getElementById('lNameTxtField').value;
	var adrs = document.getElementById('AddressTxtField').value;
	var email = document.getElementById('emailTxtField').value;
	var pass = document.getElementById('passwordTxtField').value;
	
	var geoLat = document.getElementById('GeoLatitudeField').value;
	var geolon = document.getElementById('GeoLongitudeField').value;
	var phone = document.getElementById('PhoneField').value;
	
	//change geoLat,geolon to doubles
	var geoLonD = parseFloat(geolon);
	var geoLatD = parseFloat(geoLat);

	//variables for coordinates requested by Jack to be pushed empty to patient on create
	var longi = 0.0;
	var lati = 0.0;

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
		//shows the loader
		//document.getElementById("addUserLoader").style.display = "block"; // need a dif solution js is single thread and wont update the screen while executing code

		//currently logged in user
		var user = firebase.auth().currentUser;

	//alert(user.email + " after adding " + user.uid)
	//if successful warn the user that they are logged in as the newly created user
	if(user)
	{
		alert("New Patient successfully created.");
		//this reminds me that the patients should not be able to add new patients
		//so we need another page for adding users that is only accesable to the assistants. I will make it later.
	}


	//set id to the firebase uid of the currently logged in user
	id = user.uid;////////////////////////////////////////////////////////////////////////////////////NEEDS TO BE REVERTED BACK TO THIS VERSION AFTER RELOSVING THE ISSUE WITH API KEY 
	//id = "tempID";
	
	
	//reference to the firebase database root
	var rootRef = firebase.database().ref();

	//reference to patients
	var patientRef = rootRef.child("patients");

	//reference to child of patients with push
	var patientChildRef = patientRef.push();

	//creates a new child in patients with unique ID made by firebase with all fields passed in and values from the user
	patientChildRef.set({firebaseID: id, fName: fName, lName: lName, address: adrs, email: email, password: pass, longitude: longi, latitude: lati,GeoLongitude:geoLatD , GeoLatitude: geoLonD,phone: phone});

	//testing input
	//alert(fName+lName+adrs+email+pass);

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

	//hides the loader
	//document.getElementById("addUserLoader").style.display = "none";

}




//Weather variables
var wLatitude;
var wLongitude;
var wQuery;
var ouput;

//Get latitude and longitude of user
function getLocation() {
	if (sessionStorage.getItem("sessionWeather") === null)
	{
		console.log("ADAWD");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(generateQuery);
		}
		else {
			document.getElementById("weather").innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	else
		document.getElementById("weather").innerHTML = sessionStorage.getItem("sessionWeather");
}

//Generates the query for weather
function generateQuery(position) {
	wLatitude = position.coords.latitude;
	wLongitude = position.coords.longitude;
	wQuery = "http://api.apixu.com/v1/current.json?key=70977ec45a7c47b9b65142912170111&q=" + wLatitude + "," + wLongitude;
	displayWeather();
}

//Displays current location, weather condition and temperature
function displayWeather()
{
	
	$.getJSON(wQuery, function( json ) {
		output = json.location.name + "<br>" + json.current.condition.text + "<br>" + json.current.temp_c + "&#8451" ;
		sessionStorage.setItem("sessionWeather", output);
		document.getElementById("weather").innerHTML = output;
 });
}
