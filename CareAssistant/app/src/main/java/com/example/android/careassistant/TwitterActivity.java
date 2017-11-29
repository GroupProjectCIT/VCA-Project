package com.example.android.careassistant;

import android.*;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.example.android.careassistant.Model.Coord;
import com.twitter.sdk.android.core.Callback;
import com.twitter.sdk.android.core.DefaultLogger;
import com.twitter.sdk.android.core.Result;
import com.twitter.sdk.android.core.Twitter;
import com.twitter.sdk.android.core.TwitterAuthConfig;
import com.twitter.sdk.android.core.TwitterConfig;
import com.twitter.sdk.android.core.TwitterCore;
import com.twitter.sdk.android.core.TwitterException;
import com.twitter.sdk.android.core.TwitterSession;
import com.twitter.sdk.android.core.identity.TwitterLoginButton;
import com.twitter.sdk.android.tweetcomposer.ComposerActivity;
import com.twitter.sdk.android.tweetcomposer.TweetComposer;

import static com.example.android.careassistant.WeatherActivity.lat;
import static com.example.android.careassistant.WeatherActivity.lng;


/**
 * Created by Shane on 29/11/2017.
 */

public class TwitterActivity extends AppCompatActivity {
    protected void onCreate(Bundle savedInstanceState) {
        TwitterConfig config = new TwitterConfig.Builder(this)
                .logger(new DefaultLogger(Log.DEBUG))
                .twitterAuthConfig(new TwitterAuthConfig("PKb8YptNQ6EXkXQgp69GE8U37", "XVxCP3ypqiBmaPdaZGshIRmFQpsFyQWh9MQfz3EWyK547EtHAz"))
                .debug(true)
                .build();
        Twitter.initialize(config);

        super.onCreate(savedInstanceState);
        setContentView(R.layout.twitter_activity);



        TwitterLoginButton loginButton = (TwitterLoginButton) findViewById(R.id.login_button);
        loginButton.setCallback(new Callback<TwitterSession>() {
            @Override
            public void success(Result<TwitterSession> result) {
                // Do something with result, which provides a TwitterSession for making API calls
                postTweet();
            }

            @Override
            public void failure(TwitterException exception) {
                // Do something on failure
            }
        });



    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Pass the activity result to the login button.
        TwitterLoginButton loginButton= (TwitterLoginButton) findViewById(R.id.login_button);
        loginButton.onActivityResult(requestCode, resultCode, data);
    }

    public void postTweet(){
        final TwitterSession session = TwitterCore.getInstance().getSessionManager()
                .getActiveSession();




        //Get Location
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        String provider = locationManager.getBestProvider(new Criteria(), false);
        int MY_PERMISSION = 0;

        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {


            ActivityCompat.requestPermissions(TwitterActivity.this, new String[]{
                    android.Manifest.permission.INTERNET,
                    android.Manifest.permission.ACCESS_COARSE_LOCATION,
                    android.Manifest.permission.ACCESS_FINE_LOCATION,
                    android.Manifest.permission.ACCESS_NETWORK_STATE,
                    android.Manifest.permission.SYSTEM_ALERT_WINDOW,
                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE


            }, MY_PERMISSION);
        }

        Location location = locationManager.getLastKnownLocation(provider);
        if (location == null)
            Log.e("TAG","No Location");

        double lat, lng;

        lat = location.getLatitude();
        lng = location.getLongitude();





        final Intent intent = new ComposerActivity.Builder(TwitterActivity.this)
                .session(session)
                .text(String.format("Lat: %s  Long: %s",lat,lng))
                .hashtags("#MyLocation #VirtualCareAssistant")
                .createIntent();
        startActivity(intent);

    }
}

