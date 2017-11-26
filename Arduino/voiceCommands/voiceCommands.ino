#define CUSTOM_SETTINGS
#define INCLUDE_VOICE_RECOGNIZER_SHIELD

/* Include 1Sheeld library. */
#include <OneSheeld.h>

/* Voice commands set by the user. */
const char turnonLightCommand[] = "turn lights on";
const char turnoffLightCommand[] = "turn lights off";

const char turnonHeatCommand[] = "turn heat on";
const char turnoffHeatCommand[] = "turn heat off";

int ledPin = 13;
int heatPin = 7;
void setup()
{
  /* Start Communication. */
  OneSheeld.begin();
  /* Activate the voice recognition. */
  VoiceRecognition.start();
  pinMode(ledPin, OUTPUT);
  pinMode(heatPin, OUTPUT);
}

void loop () 
{
  /* Check if new command received. */
  if(VoiceRecognition.isNewCommandReceived())
  {
    /* Compare the turn on command. */
    if(!strcmp(turnonLightCommand,VoiceRecognition.getLastCommand()))
    {
      /* Turn on the LED. */
     digitalWrite(ledPin, HIGH);
    }
    /* Compare the turn off command. */
    else if (!strcmp(turnoffLightCommand,VoiceRecognition.getLastCommand()))
    {
      /* Turn off the LED. */
     digitalWrite(ledPin, LOW);
    }
    else if (!strcmp(turnonHeatCommand,VoiceRecognition.getLastCommand()))
    {
      /* Turn off the LED. */
     digitalWrite(heatPin, HIGH);
    }
    else if (!strcmp(turnoffHeatCommand,VoiceRecognition.getLastCommand()))
    {
      /* Turn off the LED. */
     digitalWrite(heatPin, LOW);
    }
  }
}
