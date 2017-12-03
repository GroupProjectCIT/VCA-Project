package com.example.android.careassistant;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TimePicker;

import java.util.Calendar;

/**
 * Created by Shane on 03/12/2017.
 */

public class NotificationActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notification);


    }



    public void setNotification(){
//Alarm ------------------------------------------------

        TimePicker timePicker;
        timePicker = findViewById(R.id.timePicker);

        int hour = timePicker.getCurrentHour();
        int minute = timePicker.getCurrentMinute();

        Calendar calendarAlarm = Calendar.getInstance();

        calendarAlarm.set(Calendar.HOUR_OF_DAY,hour);
        calendarAlarm.set(Calendar.MINUTE,minute);
        calendarAlarm.set(Calendar.SECOND,00);

        Intent alarmIntent = new Intent(getApplicationContext(), Notification_receiver.class);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(getApplicationContext(),100,alarmIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        AlarmManager am = (AlarmManager) getSystemService(ALARM_SERVICE);
        am.setRepeating(AlarmManager.RTC_WAKEUP, calendarAlarm.getTimeInMillis(), AlarmManager.INTERVAL_DAY, pendingIntent);

        //Alarm ------------------------------------------------
    }
}
