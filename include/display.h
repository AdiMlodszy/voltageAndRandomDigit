/**
 * @file display.h
 * @brief Deklaracje funkcji i zmiennych do obsługi wyświetlacza 7-segmentowego.
 */

#ifndef DISPLAY_H
#define DISPLAY_H

#include <Arduino.h>

/**
 * @brief Globalna tablica przechowująca bieżące cyfry (dziesiątki i jedności).
 */
extern int currentDigits[2];

/**
 * @brief Konfiguruje piny wyświetlacza 7-segmentowego.
 */
void setupDisplay();

/**
 * @brief Ustawia wartość obu cyfr do wyświetlenia.
 * @param number Liczba z przedziału 0-99.
 */
void displayNumber(int number);

/**
 * @brief Realizuje multipleksowanie (naprzemienne wyświetlanie) obu cyfr.
 * 
 * Funkcja powinna być wywoływana w pętli `loop()`.
 */
void multiplexDisplay();

#endif // DISPLAY_H
