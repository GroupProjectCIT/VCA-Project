package com.example.android.careassistant;

import android.content.Intent;
import android.media.MediaMetadataRetriever;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by Shane on 27/11/2017.
 */

public class MusicActivity extends AppCompatActivity {
    MediaPlayer play;

    protected void onPause() {
        super.onPause();
        play.stop();
        play.release();

    }
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music);

        play = MediaPlayer.create(this,R.raw.song);

        TextView title, artist;
        title = findViewById(R.id.songTitle);
        artist = findViewById(R.id.songArtist);

        //Get Song Name
        Uri songPath = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.song);
        MediaMetadataRetriever retriever = new MediaMetadataRetriever();
        retriever.setDataSource(this, songPath);
        String songTitle = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
        String songArtist = retriever.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);

        title.setText(String.format("%s",songTitle));
        artist.setText(String.format("%s",songArtist));


        Button playButton = (Button) findViewById(R.id.playButton);

        playButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                if (play.isPlaying() == true)
                {
                    play.seekTo(0);
                }
                play.start();
            }
        });


    }


}
