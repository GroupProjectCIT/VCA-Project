package com.example.android.careassistant;

/**
 * Created by jackj on 28/11/2017.
 */

public class UserInformation {
    private String fName;
    private String lName;
    private String fireBaseID;
    private String GeoLongitude;
    private String GeoLatitude;
    private String key;
    Double longitude, latitude;

    public UserInformation(){

    }

    public UserInformation(Double Latitude, Double Longitude){
        this.latitude = Latitude;
        this.longitude = Longitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        latitude = latitude;
    }

    public String getGeoLongitude() {
        return GeoLongitude;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public void setGeoLongitude(String geoLongitude) {
        GeoLongitude = geoLongitude;
    }

    public String getGeoLatitude() {
        return GeoLatitude;
    }

    public void setGeoLatitude(String geoLatitude) {
        GeoLatitude = geoLatitude;
    }

    public String getFireBaseID() {
        return fireBaseID;
    }

    public void setFireBaseID(String fireBaseID) {
        this.fireBaseID = fireBaseID;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    {

    }
}
