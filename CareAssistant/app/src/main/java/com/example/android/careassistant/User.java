package com.example.android.careassistant;

import com.google.firebase.database.IgnoreExtraProperties;

// [START blog_user_class]
@IgnoreExtraProperties
public class User {

    public String fName;
    public String email;
    public String lName;
    public double GeoLatitude;
    public double GeoLongitude;
    public String address;
    public String firebaseID;
    public double longitude;
    public double latitude;
    public String password;
    public String phone;
    public String key;

    public User() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public User(String fireBaseID, String fName, String lName, double GeoLongitude, double GeoLatitude, String key, double longitude, double latitude,
                String address, String email, String password, String phone) {
       this.firebaseID = firebaseID;
       this.fName =fName;
       this.GeoLongitude = GeoLongitude;
       this.GeoLatitude = GeoLatitude;
       this.key = key;
       this. longitude = longitude;
       this.latitude = latitude;
       this.address = address;
       this.email = email;
       this.password = password;
       this.phone = phone;
       this.lName = lName;
    }
}
