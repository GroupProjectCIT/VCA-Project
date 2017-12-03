package com.example.android.careassistant;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.net.Uri;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;


import java.util.HashMap;
import java.util.Map;

public class HomeActivity extends AppCompatActivity {

    //create firebase auth
    private FirebaseAuth myAuth;
    private ListView listView;

    private static final int REQUEST_PERMISSIONS_REQUEST_CODE = 34;

    //create an on state listener for the auth
    private FirebaseAuth.AuthStateListener myAuthListener;
    private FusedLocationProviderClient mFusedLocationClient;
    private double curLat;
    private double curLong;
    private Handler handler, getPatient;
    private CountDownTimer timer;
    private String userID;
    private String usersKey;


    // [START declare_database_ref]
    private DatabaseReference mDatabase;


    //initialize muAuthListener


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);


        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        listView = (ListView) findViewById(R.id.listView);

        ArrayAdapter<String> mAdapter = new ArrayAdapter<String>(HomeActivity.this,
                android.R.layout.simple_list_item_1,
                getResources().getStringArray(R.array.listItems));

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Memory Game")) {
                    Intent intent = new Intent(HomeActivity.this, GameActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Post Location")) {
                    Intent intent = new Intent(HomeActivity.this, TwitterActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Play Music")) {
                    Intent intent = new Intent(HomeActivity.this, MusicActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Geo Fence")) {
                    Intent intent = new Intent(HomeActivity.this, GeoMainActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Appointments")) {
                    Intent intent = new Intent(HomeActivity.this, AppActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Weather")) {
                    Intent intent = new Intent(HomeActivity.this, WeatherActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Play Time")) {
                    Intent intent = new Intent(HomeActivity.this, TimeActivity.class);
                    startActivity(intent);
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Lights and Heating")) {
                    Intent launchIntent = getPackageManager().getLaunchIntentForPackage("com.integreight.onesheeld");
                    try {
                        startActivity(launchIntent);
                    } catch (Exception e) {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("http://play.google.com/store/apps/details?id=com.integreight.onesheeld")));
                    }
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Order Takeaway")) {
                    Intent launchIntent = getPackageManager().getLaunchIntentForPackage("com.justeat.app.ie");
                    try {
                        startActivity(launchIntent);
                    } catch (Exception e) {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("http://play.google.com/store/apps/details?id=com.justeat.app.ie")));
                    }
                } else if (listView.getItemAtPosition(i).toString().equalsIgnoreCase("Order Taxi")) {
                    Intent launchIntent = getPackageManager().getLaunchIntentForPackage("taxi.android.client");
                    try {
                        startActivity(launchIntent);
                    } catch (Exception e) {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("http://play.google.com/store/apps/details?id=taxi.android.client")));
                    }
                }

            }
        });
        listView.setAdapter(mAdapter);
        myAuth = FirebaseAuth.getInstance();


        //listener for is there a user signed in
        myAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                //if a user is not signed in
                if (firebaseAuth.getCurrentUser() == null) {
                    //go to login activity
                    startActivity(new Intent(HomeActivity.this, LoginActivity.class));
                }
            }
        };

        if (ActivityCompat.checkSelfPermission(HomeActivity.this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(HomeActivity.this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(HomeActivity.this, new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION}, 1);
            return;
        }else {
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

            FirebaseUser currentFirebaseUser = FirebaseAuth.getInstance().getCurrentUser();

            userID = currentFirebaseUser.getUid();


            getPatient = new Handler();
            getPatient.postDelayed(new Runnable() {
                @Override
                public void run() {
                    Query query = mDatabase.child("patients").orderByChild("firebaseID").equalTo(userID);

                    query.addValueEventListener(new ValueEventListener() {
                        @Override
                        public void onDataChange(DataSnapshot dataSnapshot) {
                            for (DataSnapshot patient : dataSnapshot.getChildren()) {
                                String value = patient.getValue().toString();
                                UserInformation user = patient.getValue(UserInformation.class);
                                usersKey = patient.getKey();
                            }
                        }

                        @Override
                        public void onCancelled(DatabaseError databaseError) {

                        }
                    });
                }
            }, 3000);


            handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    submitPost();
                }
            }, 10000);
        }

        timer = new CountDownTimer(60000, 20) {

            @Override
            public void onTick(long millisUntilFinished) {

            }

            @Override
            public void onFinish() {
                try {
                    submitPost();
                } catch (Exception e) {
                    Log.e("Error", "Error: " + e.toString());
                }
            }
        };
    }

    private void submitPost() {

        //"-KySdfqhHypaTuGyNR0r";

        final String userId = usersKey;
        mDatabase.child("patients").child(userId).addListenerForSingleValueEvent(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {

                        User user = dataSnapshot.getValue(User.class);

                        if (user == null) {
                            // User is null, error out

                            Toast.makeText(HomeActivity.this,
                                    "Error: could not fetch user.",
                                    Toast.LENGTH_SHORT).show();
                        } else {
                            timer.start();
                            writeNewPost(user.firebaseID, user.fName, user.lName, user.GeoLongitude, user.GeoLatitude, userId,
                                    user.longitude, user.latitude, user.address, user.email, user.password, user.phone);
                            Toast.makeText(HomeActivity.this, "Posted", Toast.LENGTH_SHORT);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {

                    }
                });
    }

    private void writeNewPost(String fireBaseID, String fName, String lName, double GeoLongitude, double GeoLatitude, String key, double longitude, double latitude,
                              String address, String email, String password, String phone) {
        //String key = mDatabase.child("patients").push().getKey();

        UserInformation user = new UserInformation(fireBaseID, fName, lName, GeoLongitude, GeoLatitude, key, curLong, curLat, address, email, password, phone);
        Map<String, Object> postValues = user.toMap();

        Map<String, Object> childUpdates = new HashMap<>();
        childUpdates.put("/patients/" + key, postValues);

        // childUpdates.put("/patients/" + userId + "/" + key, postValues);

        mDatabase.updateChildren(childUpdates);
    }
}
