(function()
{
	alert("onStart function");
	
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
		
	});
	
	
	//realtime authorization listener // can be commented out after testing to avid running every time
	firebase.auth().onAuthStateChanged(user =>
	{
		
		if (user) 
		{	
			//logs to console user info
			console.log(user);
		}
		else
		{
			// No user is signed in
			
			//logs to console a message
			console.log("user logedOut/not logged in...thx obama!");
		}
	});
	

}());



function logOut()
{
		alert("logOut function");
		//go to login page
		window.location.href = "VCA-Login.html"
}