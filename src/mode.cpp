#include "mode.h"
#include <Bounce2.h>

const int modeButtonPin = 12; // Pin przycisku zmiany trybu
bool receiveMode = false;     // Flaga trybu odbioru danych

Bounce modeButton = Bounce(); // Obiekt debouncera dla przycisku zmiany trybu

void setupModeButton() {
  pinMode(modeButtonPin, INPUT_PULLUP);
  modeButton.attach(modeButtonPin);
  modeButton.interval(5);
}

void updateModeButton() {
  modeButton.update();
  if (modeButton.rose()) {
    receiveMode = !receiveMode;
    Serial.println(receiveMode ? "Receive Mode ON" : "Receive Mode OFF");
  }
}

bool isReceiveMode() {
  return receiveMode;
}
