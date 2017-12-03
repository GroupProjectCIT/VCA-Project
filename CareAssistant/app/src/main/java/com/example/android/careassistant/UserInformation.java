package com.example.android.careassistant;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jackj on 28/11/2017.
 */

public class UserInformation {
    private String fName;
    private String lName;
    private String fireBaseID;
    private double GeoLongitude;
    private double GeoLatitude;
    private String key;
    Double longitude, latitude;
    public String uid;
    private String address;
    private String email;
    private String password;
    private String phone;

    public UserInformation() {

    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public UserInformation(Double Latitude, Double Longitude) {
        this.latitude = Latitude;
        this.longitude = Longitude;
    }

    public UserInformation(String fireBaseID, String fName, String lName, double GeoLongitude, double GeoLatitude, String key, double longitude, double latitude,
                           String address, String email, String password, String phone) {
        this.fireBaseID = fireBaseID;
        this.fName = fName;
        this.GeoLatitude = GeoLatitude;
        this.GeoLongitude = GeoLongitude;
        this.key = key;
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.lName = lName;

    }

    public UserInformation(String key, String fName, String lName, double GeoLongitude, double GeoLatitude,
                           String fireBaseID) {
        this.uid = fireBaseID;
        this.fName = fName;
        this.GeoLatitude = GeoLatitude;
        this.GeoLongitude = GeoLongitude;

    }


    public Map<String, Object> toMap() {
        HashMap<String, Object> result = new HashMap<>();
        result.put("firebaseID", fireBaseID);
        result.put("fName", fName);
        result.put("lName", lName);
        result.put("longitude", longitude);
        result.put("latitude", latitude);
        result.put("GeoLatitude", GeoLatitude);
        result.put("GeoLongitude", GeoLongitude);
        result.put("address", address);
        result.put("email", email);
        result.put("password", password);
        result.put("phone", phone);


        return result;
    }

    public double getGeoLatitude() {
        return GeoLatitude;
    }


    public void setGeoLatitude(double GeoLatitude) {
        this.GeoLatitude = GeoLatitude;
    }

    public double getGeoLongitude() {
        return GeoLongitude;
    }

    public void setGeoLongitude(double GeoLongitude) {
        this.GeoLongitude = GeoLongitude;
    }
}