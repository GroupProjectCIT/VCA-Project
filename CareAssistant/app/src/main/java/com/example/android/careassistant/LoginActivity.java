package com.example.android.careassistant;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;

public class LoginActivity extends AppCompatActivity {

    //create "my" variables for elements on the login screen
    private EditText myEmailField;
    private EditText myPasswordField;
    private Button myLoginBtn;

    //create firebase auth
    private FirebaseAuth myAuth;

    //create an on state listener for the auth
    private FirebaseAuth.AuthStateListener  myAuthListener;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        //get an instance from firebase
        myAuth = FirebaseAuth.getInstance();

        // initialize "my" variables with elements on the login screen
        myEmailField=(EditText) findViewById(R.id.emailField);
        myPasswordField=(EditText) findViewById(R.id.passwordField);
        myLoginBtn=(Button) findViewById(R.id.loginBtn);

        //initialize muAuthListener
        myAuthListener = new FirebaseAuth.AuthStateListener()
        {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth)
            {
                //if a user is signed in
                if(firebaseAuth.getCurrentUser() != null)
                {
                    //go to the HomeActivity
                    startActivity(new Intent(LoginActivity.this,HomeActivity.class));
                }
            }
        };

        //add a listener to the login button
        myLoginBtn.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                //call signInProcess on click
                signInProcess();
            }
        });

    }


    @Override
    protected void onStart()//on start
    {
        super.onStart();//on supers start

        //add myAuthListener to myAuth
        myAuth.addAuthStateListener(myAuthListener);
    }




    //starts the sign in process
    private void signInProcess()
    {
        //fetch entered login details
        String email = myEmailField.getText().toString();
        String pass = myPasswordField.getText().toString();

        //if email or pass are empty
        if(TextUtils.isEmpty(email) || TextUtils.isEmpty(pass))
        {
            //make a toast with the error message in the LoginActivity
            Toast.makeText(LoginActivity.this, "Please fill in both fields", Toast.LENGTH_LONG).show();

        }
        else
        {
            //try to sign into firebase
            myAuth.signInWithEmailAndPassword(email, pass).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                @Override
                public void onComplete(@NonNull Task<AuthResult> task) {
                    //if user did not sign in succesfully
                    if (!task.isSuccessful()) {
                        //make a toast with the error message in the LoginActivity
                        Toast.makeText(LoginActivity.this, "Sign in failed", Toast.LENGTH_LONG).show();
                    }
                }
            });
        }
    }
}
