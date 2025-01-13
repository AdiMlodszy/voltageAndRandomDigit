/**
 * @file voltage.h
 * @brief Deklaracje funkcji i zmiennych do obsługi woltomierza.
 */

#ifndef VOLTAGE_H
#define VOLTAGE_H

#include <Arduino.h>

/**
 * @brief Konfiguruje pin woltomierza.
 */
void setupVoltage();

/**
 * @brief Aktualizuje odczyt napięcia i wysyła dane do Serial.
 */
void updateVoltage();

#endif // VOLTAGE_H
