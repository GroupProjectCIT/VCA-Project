package com.example.android.careassistant;

import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.ActivityCompat;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;
import java.util.Map;

public class Test extends Information {

    private static final String TAG = "NewPostActivity";
    private static final String REQUIRED = "Required";

    private FusedLocationProviderClient mFusedLocationClient;
    private double curLat;
    private double curLong;
    private Handler handler;
    private CountDownTimer timer;


    // [START declare_database_ref]
    private DatabaseReference mDatabase;
    // [END declare_database_ref]

    private EditText mTitleField;
    private EditText mBodyField;
    private FloatingActionButton mSubmitButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);

        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling


        }
        mFusedLocationClient.getLastLocation()
                .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        // Got last known location. In some rare situations this can be null.
                        if (location != null) {
                            curLat = location.getLatitude();
                            curLong = location.getLongitude();

                        }
                    }
                });


        mDatabase = FirebaseDatabase.getInstance().getReference();
        // [END initialize_database_ref]

        mTitleField = findViewById(R.id.mTitleField);
        mBodyField = findViewById(R.id.mBodyField);
        mSubmitButton = findViewById(R.id.mSubmitButton);


           /* handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    submitPost();
                }
            }, 5000); */

        timer = new CountDownTimer(5000, 20) {

            @Override
            public void onTick(long millisUntilFinished) {

            }

            @Override
            public void onFinish() {
                try{
                    submitPost();
                }catch(Exception e){
                    Log.e("Error", "Error: " + e.toString());
                }
            }
        }.start();




    }

    private void submitPost() {
        final String title = mTitleField.getText().toString();
        final String body = mBodyField.getText().toString();

        if (TextUtils.isEmpty(title)) {
            mTitleField.setError(REQUIRED);
            return;
        }

        // Body is required
        if (TextUtils.isEmpty(body)) {
            mBodyField.setError(REQUIRED);
            return;
        }

        setEditingEnabled(false);
        Toast.makeText(this, "Posting...", Toast.LENGTH_SHORT).show();

        final String userId = "-KySdfqhHypaTuGyNR0r";
        mDatabase.child("patients").child(userId).addListenerForSingleValueEvent(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {

                        User user = dataSnapshot.getValue(User.class);

                        if (user == null) {
                            // User is null, error out
                            Log.e(TAG, "User " + userId + " is unexpectedly null");
                            Toast.makeText(Test.this,
                                    "Error: could not fetch user.",
                                    Toast.LENGTH_SHORT).show();
                        } else {
                            // Write new post
                            writeNewPost(user.firebaseID, user.fName, user.lName, user.GeoLongitude, user.GeoLatitude, userId,
                                    user.longitude, user.latitude, user.address, user.email, user.password, user.phone);
                            timer.start();
                            Toast.makeText(Test.this, "Posted", Toast.LENGTH_SHORT);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {

                    }
                });
    }

    private void writeNewPost(String fireBaseID, String fName, String lName, double GeoLongitude, double GeoLatitude, String key, double longitude, double latitude,
                              String address, String email, String password, String phone){
        //String key = mDatabase.child("patients").push().getKey();
        String f = "jack";
        UserInformation user = new UserInformation(fireBaseID, f, lName, GeoLongitude, GeoLatitude, key, curLong, curLat, address, email, password, phone);
        Map<String, Object> postValues = user.toMap();

        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/patients/" + key, postValues);

       // childUpdates.put("/patients/" + userId + "/" + key, postValues);

        mDatabase.updateChildren(childUpdates);
    }

    private void setEditingEnabled(boolean enabled) {
        mTitleField.setEnabled(enabled);
        mBodyField.setEnabled(enabled);
        if (enabled) {
            mSubmitButton.setVisibility(View.VISIBLE);
        } else {
            mSubmitButton.setVisibility(View.GONE);
        }
    }
}
