# Projekt: Arduino 7-Segment Display + Random Voltage Logger

## Opis
Ten projekt służy do wyświetlania mierzonego napięcia (0-5 V) na zewnętrznym wyświetlaczu 7-segmentowym oraz do losowego generowania liczb 0-99 po wciśnięciu przycisku. 

## Funkcjonalności
- Pomiar napięcia z pinu A1 i wypisywanie go w monitorze szeregowym (port Serial). 
- Przycisk (podłączony do pinu 2) aktywuje/wyłącza tryb losowania liczb.
- Wyświetlanie wartości na dwucyfrowym wyświetlaczu 7-segmentowym (wspólna katoda).

## Wymagania sprzętowe
- Płytka Arduino (Uno / Nano / inna AVR).
- Wyświetlacz 7-segmentowy dwucyfrowy lub dwa pojedyncze wyświetlacze.
- Potencjometr podłączony do A1 (lub stałe źródło napięcia w zakresie 0-5 V).
- Przycisk podłączony do pinu 2 (z użyciem rezystora pull-up lub trybu INPUT_PULLUP w Arduino).

## Użyte biblioteki
- [Bounce2](https://github.com/thomasfredericks/Bounce2) do debouncu przycisku.

## Instrukcja kompilacji i wgrania
1. Sklonuj repozytorium / pobierz kod.
2. Zainstaluj [PlatformIO IDE](https://platformio.org/) w Visual Studio Code (lub użyj Arduino IDE). 
3. Zainstaluj bibliotekę Bounce2 (w PlatformIO `platformio lib install "Bounce2"`).
4. Otwórz projekt w VS Code -> PlatformIO -> Build -> Upload (lub w Arduino IDE).
5. Sprawdź w menedżerze urządzeń, jaki port COM przypisano Arduino i ustaw go w `platformio.ini` (jeśli potrzeba).

## Architektura projektu
- `src/display.cpp` + `include/display.h` - obsługa wyświetlacza 7-segmentowego (multipleksowanie, ustawianie cyfr).
- `src/main.cpp` - główny kod: inicjalizacja, pętla `loop()`, pomiar napięcia, obsługa przycisku, losowanie.
- `platformio.ini` (jeśli używasz PlatformIO).

## Autor
- Imię i Nazwisko lub pseudonim (Rok).

## Licencja
Opcjonalnie, np. MIT License, GPLv3 itp.
