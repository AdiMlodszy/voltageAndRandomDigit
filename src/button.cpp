
/**
 * @file button.cpp
 * @brief Implementacja obsługi przycisku losowania oraz trybu losowania.
 */

#include "button.h"
#include <Bounce2.h>
#include "display.h"

const int randomButtonPin = 2; ///< Pin przycisku losowania
bool randomizingMode = false; ///< Flaga trybu losowania

Bounce randomButton = Bounce(); ///< Obiekt debouncera dla przycisku losowania

/**
 * @brief Funkcja inicjalizująca przycisk losowania.
 * 
 * Ustawia tryb pracy pinu przycisku oraz konfiguruje obiekt debouncera.
 */
void setupRandomButton();

/**
 * @brief Funkcja aktualizująca stan przycisku losowania.
 * 
 * Sprawdza, czy przycisk został naciśnięty i zmienia tryb losowania.
 * W trybie losowania generuje losowe liczby i wyświetla je na wyświetlaczu.
 */
void updateRandomButton();

/**
 * @brief Funkcja zwracająca stan trybu losowania.
 * 
 * @return true jeśli tryb losowania jest włączony, false w przeciwnym razie.
 */
bool isRandomizing();

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
