/**
 * @file voltage.cpp
 * @brief Plik odpowiedzialny za obsługę pomiaru napięcia oraz odbieranie i przetwarzanie danych z portu szeregowego.
 *
 * Ten plik zawiera funkcje umożliwiające:
 *  - Inicjalizację pinu odpowiadającego za pomiar napięcia.
 *  - Odczytywanie wartości napięcia z potencjometru i wysyłanie jej przez Serial.
 *  - Odbieranie danych z aplikacji zewnętrznej, przetwarzanie ich do postaci liczbowej
 *    oraz wyświetlanie na wyświetlaczu 7-segmentowym.
 *
 * @author 
 * @date 
 */
#include "voltage.h"
#include "display.h"
#include "mode.h"

const byte voltometerPin = A1;
int voltageBinary = 0;
float voltageV = 0.0;

void setupVoltage() {
  pinMode(voltometerPin, INPUT);
}

void updateVoltage() {
  if (!isReceiveMode()) {
    // Tryb wysyłania napięcia z potencjometru do Serial
    voltageBinary = analogRead(voltometerPin);
    voltageV = voltageBinary * (5.0 / 1023.0);
    Serial.println(voltageV);

  } else {
    // Tryb odbioru danych z aplikacji
    if (Serial.available() > 0) {
      String receivedData = Serial.readStringUntil('\n');

      // Krok 1: Konwertuj tekst na float
      float receivedFloat = receivedData.toFloat();
      
      // Krok 2: Zaokrąglij do jednej cyfry po przecinku
      // np. 3.33 V => 3.3, 4.56 => 4.6
      // (lub zachowaj 2 cyfry po przecinku, jeśli wolisz)
      float roundedFloat = roundf(receivedFloat * 10.0f) / 10.0f;

      // Krok 3: Zamień to na liczbę całkowitą, którą wyświetlisz
      // Np. 3.3 => 33, 4.6 => 46
      // Wtedy "3.3" staje się dwoma cyframi: '3' '3'
      int displayValue = (int) roundf(roundedFloat * 10.0f);

      // Krok 4: Upewnij się, że mieści się w zakresie 0-99
      if (displayValue < 0)   displayValue = 0;
      if (displayValue > 99) displayValue = 99;

      // Krok 5: Wyświetl dwie cyfry na 7-seg
      displayNumber(displayValue);
    }
  }
}
