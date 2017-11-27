package com.example.android.careassistant;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

/**
 * Created by Shane on 27/11/2017.
 */

public class TimeActivity extends AppCompatActivity {
    //Text to Speech
    TextToSpeech toSpeech;
    int result;
    String text;


    DateFormat timeFormat = new SimpleDateFormat("HH:mm");
    DateFormat timeAndDateFormat = new SimpleDateFormat("HH:mm dd/MM/yyyy");
    String time;
    String timeAndDate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.time_activity);

        //Display Time and Date
        TextView timeView;
        timeView = findViewById(R.id.timeText);

        //Setting time and date
        time = timeFormat.format(Calendar.getInstance().getTime());
        timeAndDate = timeAndDateFormat.format(Calendar.getInstance().getTime());

        //Display time
        timeView.setText(String.format("%s",time));

        //Text to Speech
        toSpeech = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if(status==TextToSpeech.SUCCESS) {
                    result = toSpeech.setLanguage(Locale.US);
                } else {
                    Toast.makeText(getApplicationContext(), "Feature is not supported", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    public void speakTime(View view) {
        switch (view.getId()) {
            case R.id.playTime:
                if(result==TextToSpeech.LANG_MISSING_DATA || result==TextToSpeech.LANG_NOT_SUPPORTED) {
                    Toast.makeText(getApplicationContext(), "Feature is not supported", Toast.LENGTH_SHORT).show();
                } else {
                    text = "It is " + timeAndDate;
                    toSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null);
                }
                break;
        }
    }
}

