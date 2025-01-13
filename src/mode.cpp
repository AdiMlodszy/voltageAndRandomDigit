/**
 * @file mode.cpp
 * @brief Plik odpowiedzialny za obsługę przycisku zmiany trybu odbioru danych.
 *
 * Ten plik wykorzystuje bibliotekę Bounce2 w celu eliminowania drgań styków
 * przycisku. Umożliwia przełączanie między trybem odbioru danych, a trybem
 * podstawowym. Informacja o aktualnym stanie trybu jest wyświetlana w konsoli
 * szeregowej w momencie zmiany.
 *
 * Funkcje:
 * - setupModeButton(): Konfiguruje pin przycisku w trybie INPUT_PULLUP
 *   oraz ustawia parametry debouncera.
 * - updateModeButton(): Aktualizuje stan przycisku na podstawie biblioteki
 *   Bounce2, a następnie zmienia tryb oraz komunikuje to przez Serial.
 * - isReceiveMode(): Zwraca aktualną wartość flagi określającej, czy
 *   włączony jest tryb odbioru danych.
 */
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
