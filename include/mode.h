/**
 * @file mode.h
 * @brief Deklaracje funkcji i zmiennych do obsługi przycisku zmiany trybu.
 */

#ifndef MODE_H
#define MODE_H

#include <Arduino.h>

/**
 * @brief Konfiguruje pin przycisku zmiany trybu.
 */
void setupModeButton();

/**
 * @brief Aktualizuje stan przycisku zmiany trybu i obsługuje zdarzenia.
 */
void updateModeButton();

/**
 * @brief Sprawdza, czy tryb odbioru danych jest włączony.
 * @return True, jeśli Serial ma odbierać dane, False w przeciwnym razie.
 */
bool isReceiveMode();

#endif // MODE_H
