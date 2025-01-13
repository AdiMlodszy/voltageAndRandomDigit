/**
 * @file main.cpp
 * @brief Główny plik programu Arduino / PlatformIO.
 * 
 * Zajmuje się:
 * - konfiguracją pinu potencjometru
 * - odczytem napięcia
 * - obsługą przycisku z wykorzystaniem Bounce2
 * - uruchamianiem losowania (tryb isRandomizing)
 * - wyświetlaniem wartości na 7-seg
 */

#include <Arduino.h>
#include "voltage.h"
#include "button.h"
#include "display.h"
#include "mode.h"

void setup() {
  Serial.begin(9600);

  // Inicjalizacja modułów
  setupDisplay();
  setupRandomButton();
  setupVoltage();
  setupModeButton();

  // Ustawienie ziarna generatora losowego
  randomSeed(analogRead(A0));
}

void loop() {
  // Odczyt napięcia
  updateVoltage();

  // Aktualizacja stanu przycisku losowania
  updateRandomButton();

  // Aktualizacja stanu przycisku trybu
  updateModeButton();

  // Wyświetlanie (multipleksowanie)
  multiplexDisplay();
}
