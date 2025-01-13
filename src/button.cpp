#include "button.h"
#include <Bounce2.h>
#include "display.h"

const int randomButtonPin = 2; // Pin przycisku losowania
bool randomizingMode = false; // Flaga trybu losowania

Bounce randomButton = Bounce(); // Obiekt debouncera dla przycisku losowania

void setupRandomButton() {
  pinMode(randomButtonPin, INPUT_PULLUP);
  randomButton.attach(randomButtonPin);
  randomButton.interval(5);
}

void updateRandomButton() {
  randomButton.update();
  if (randomButton.rose()) {
    randomizingMode = !randomizingMode;
    Serial.println(randomizingMode ? "Randomizing ON" : "Randomizing OFF");
  }

  // Logika losowania
  if (randomizingMode) {
    static unsigned long previousMillis = 0;
    const long interval = 50;
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval) {
      previousMillis = currentMillis;

      // Wygeneruj losową liczbę
      int randomNumber = random(0, 100);
      currentDigits[0] = randomNumber / 10;
      currentDigits[1] = randomNumber % 10;
      displayNumber(randomNumber); // Wyświetl liczbę na wyświetlaczu
    }
  }
}

bool isRandomizing() {
  return randomizingMode;
}
