/**
 * @file display.cpp
 * @brief Definicje funkcji i zmiennych związanych z obsługą wyświetlacza 7-segmentowego.
 *
 * Plik zawiera implementację funkcji do obsługi wyświetlacza 7-segmentowego, w tym
 * inicjalizację pinów, wyświetlanie liczb oraz multipleksowanie wyświetlacza.
 */

#include "display.h"

const int segments[7] = {3, 4, 5, 6, 7, 8, 9};
const int digitPins[2] = {10, 11};

// Główna definicja currentDigits (bo w display.h mamy extern)
int currentDigits[2] = {0, 0};

const bool digitMatrix[10][7] = {
  {1, 1, 1, 1, 1, 1, 0}, // 0
  {0, 1, 1, 0, 0, 0, 0}, // 1
  {1, 1, 0, 1, 1, 0, 1}, // 2
  {1, 1, 1, 1, 0, 0, 1}, // 3
  {0, 1, 1, 0, 0, 1, 1}, // 4
  {1, 0, 1, 1, 0, 1, 1}, // 5
  {1, 0, 1, 1, 1, 1, 1}, // 6
  {1, 1, 1, 0, 0, 0, 0}, // 7
  {1, 1, 1, 1, 1, 1, 1}, // 8
  {1, 1, 1, 1, 0, 1, 1}  // 9
};

void setupDisplay() {
  for (int i = 0; i < 7; i++) {
    pinMode(segments[i], OUTPUT);
    digitalWrite(segments[i], LOW);
  }
  for (int i = 0; i < 2; i++) {
    pinMode(digitPins[i], OUTPUT);
    digitalWrite(digitPins[i], HIGH);
  }
}

void displayNumber(int number) {
  if (number < 0 || number > 99) return;
  currentDigits[0] = number / 10;
  currentDigits[1] = number % 10;
}

void multiplexDisplay() {
  for (int i = 0; i < 2; i++) {
    digitalWrite(digitPins[i], LOW);
    for (int j = 0; j < 7; j++) {
      digitalWrite(segments[j], digitMatrix[currentDigits[i]][j]);
    }
    delay(5);
    digitalWrite(digitPins[i], HIGH);
  }
}
