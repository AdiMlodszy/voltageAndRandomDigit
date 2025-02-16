# Dokumentacja Techniczna Projektu Woltomierza i Generatora Liczb Losowych

## Opis projektu

Projekt łączy funkcjonalność woltomierza z generatorem liczb losowych, wykorzystując Arduino oraz aplikację webową. System umożliwia pomiar napięcia, wyświetlanie wartości na wyświetlaczu 7-segmentowym oraz generowanie liczb losowych.

## Komponenty sprzętowe

- Arduino
- Wyświetlacz 7-segmentowy dwucyfrowy
- Potencjometr
- 2 przyciski (tryb i losowanie)
- Rezystory i przewody połączeniowe

## Struktura projektu

### Moduły Arduino

1. **Wyświetlacz (display.h/cpp)**

   - Obsługa wyświetlacza 7-segmentowego
   - Multipleksowanie cyfr
   - Wyświetlanie liczb 0-99

2. **Pomiar napięcia (voltage.h/cpp)**

   - Odczyt napięcia z potencjometru
   - Konwersja wartości analogowej na napięcie
   - Komunikacja przez Serial

3. **Przyciski (button.h/cpp, mode.h/cpp)**
   - Obsługa przycisku losowania
   - Obsługa przycisku trybu pracy
   - Eliminacja drgań styków (debouncing)

### Aplikacja webowa

1. **Interface użytkownika (index.html)**

   - Przyciski kontrolne
   - Wyświetlacz napięcia
   - Pasek postępu

2. **Logika (index.ts)**
   - Komunikacja szeregowa z Arduino
   - Generowanie losowych wartości napięcia
   - Zarządzanie stanem połączenia

## Funkcjonalności

- Pomiar napięcia (0-5V)
- Generowanie liczb losowych (0-99)
- Przełączanie trybów pracy
- Dwukierunkowa komunikacja Serial
- Wizualizacja danych w przeglądarce

## Wymagania techniczne

- Arduino IDE lub PlatformIO
- Przeglądarka z obsługą Web Serial API
- Połączenie USB

## Autorzy

Adrian Kasprzak, 2025
