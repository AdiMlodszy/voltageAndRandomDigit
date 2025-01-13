/**
 * @file main.cpp
 * @brief Główny plik programu dla Arduino/PlatformIO.
 *
 * W tym pliku zapewniono:
 *  - konfigurację oraz odczyt wartości z potencjometru
 *  - obsługę przycisku losowania (z wykorzystaniem biblioteki Bounce2)
 *  - obsługę przycisku trybu pracy
 *  - inicjalizację funkcji wyświetlania informacji na wyświetlaczu 7-segmentowym (multipleksowanie)
 *  - ustawienie generatora liczb pseudolosowych na bazie odczytu z pinu analogowego
 *
 * Szczegóły funkcjonalne:
 *  - Funkcja setup() inicjalizuje niezbędne moduły (wyświetlacz, przyciski, napięcie) oraz ustawia prędkość transmisji szeregowej.
 *  - Funkcja loop() w kółko odczytuje napięcie, aktualizuje stan przycisków trybu i losowania oraz steruje wyświetlaniem.
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
