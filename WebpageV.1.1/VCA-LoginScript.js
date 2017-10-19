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
	
	
	//get elements for login
	const emailIn = document.getElementById('emailInput');
	const passwordIn = document.getElementById('passwordInput');
	const logInBtn = document.getElementById('logInBtn');
	const logOutBtn = document.getElementById('logOutBtn');
	
	
	//add listener to login button and do the following on click
	logInBtn.addEventListener('click', e=>
	{
		//pull email and password from elements
		const email= emailIn.value;
		const password = passwordIn.value;
		const auth = firebase.auth();
		
		//attempt to log into firebase with email and pass
		const promise = auth.signInWithEmailAndPassword(email,password);
		
		//catch errors and log to console
		promise.catch(e => console.log(e.message));
		
	});
	
	//add listener to logOutBtn and do the following on click
	logOutBtn.addEventListener('click', e=>
	{
		//sign out the current user
		firebase.auth().signOut();
		
		//go to login page
		window.location.href = "VCA-Login.html"
		
	});
	
	//realtime authorization listener 
	firebase.auth().onAuthStateChanged(user =>
	{
		//checks waht user is loged in
		//var user = firebase.auth().currentUser;
		
		//if a valid user is logging in...
		if (user) 
		{
			//at this stage we know that its a valid user, if the email used to log in contains "admin" the user is taken to the admin page
			if(user.email.includes("admin"))
			{
				// admin is signed in go to admin page
				window.location = "VCA-Admin.html";
			}
			//at this stage we know that the user is valid and is not an admin
			else
			{
				// User is signed in go to home page
				window.location = "VCA-Home.html";
			}
				
			//logs to console user info. can be commented out after testing to avid running every time and for security
			console.log(user);
			
		}
		//this code is executed if an invalid user tries to log in or at the start when no user us logged in
		else
		{
			// No user is signed in
			
			//logs to console a message. can be commented out after testing to avid running every time and for security
			console.log("user logedOut/not logged in...thx obama!");
			
		}
	});
	
	
}());