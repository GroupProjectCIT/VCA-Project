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
	
	
	//get elements for log in
	const emailIn = document.getElementById('emailInput');
	const passwordIn = document.getElementById('passwordInput');
	const logInBtn = document.getElementById('logInBtn');
	const logOutBtn = document.getElementById('logOutBtn');
	
	
	//add listener to login button
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
	
	//add listener to logOutBtn
	logOutBtn.addEventListener('click', e=>
	{
		//sign out the current user
		firebase.auth().signOut();
		
		//go to login page
		window.location.href = "VCA-Login.html"
			
	});
	
	
	//realtime authorization listener
	firebase.auth().onAuthStateChanged(firebaseUser =>
	{
		//checks waht user is loged in
		var user = firebase.auth().currentUser;
		
		if (user) 
		{
			// User is signed in go to home page
			window.location.href = "VCA-Home.html";
		}
		else
		{
			// No user is signed in do nothing
		}
		
		//log info on login to console
		if(firebaseUser)
		{
			//logs to console user info
			console.log(firebaseUser);
		}
		else
		{
			//logs to console a message
			console.log("user logedOut/not logged in...thx obama!");
		}
	});
	
	

	
}());