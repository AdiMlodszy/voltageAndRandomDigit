/**
 * @file button.h
 * @brief Deklaracje funkcji i zmiennych do obsługi przycisku losowania.
 */

#ifndef BUTTON_H
#define BUTTON_H

#include <Arduino.h>

/**
 * @brief Konfiguruje pin przycisku losowania.
 */
void setupRandomButton();

/**
 * @brief Aktualizuje stan przycisku losowania i obsługuje zdarzenia.
 */
void updateRandomButton();

/**
 * @brief Sprawdza, czy tryb losowania jest włączony.
 * @return True, jeśli losowanie jest włączone, False w przeciwnym razie.
 */
bool isRandomizing();

#endif // BUTTON_H
