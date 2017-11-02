
//When page is loaded start getLocation()
window.addEventListener("load", getLocation);

(function()
{
    //alert("onStart function");

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


}); //to fix logOut issue please change this line to }());



function logOut()
{
    //alert("logOut function");
    //go to login page
    window.location.href = "VCA-Login.html"
}



//Weather variables
var wLatitude;
var wLongitude;
var wQuery;

//Get latitude and longitude of user
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(generateQuery);
    }
	else {
        document.getElementById("weather").innerHTML = "Geolocation is not supported by this browser.";
    }
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
		document.getElementById("weather").innerHTML = json.location.name + "<br>" + json.current.condition.text + "<br>" + json.current.temp_c + "&#8451" ;
 });
}
