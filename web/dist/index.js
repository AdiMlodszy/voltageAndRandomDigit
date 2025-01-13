"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Zmienna przechowująca referencję do portu szeregowego.
 */
let port = null;
/**
 * Zmienna przechowująca referencję do writer'a strumienia.
 */
let writer = null;
/**
 * Zmienna przechowująca identyfikator interwału wysyłania danych.
 */
let sendingInterval = null;
/**
 * Zmienna przechowująca obietnicę wysłania danych do Arduino.
 */
let pipePromise = null;
/**
 * Flaga wskazująca, czy połączenie z Arduino jest aktywne.
 */
let isConnected = false;
/**
 * Flaga wskazująca, czy dane są aktualnie wysyłane do Arduino.
 */
let isSending = false;
/**
 * Referencja do przycisku Connect/Disconnect.
 */
// const connectBtn = document.getElementById("connectButton") as HTMLButtonElement;
const connectBtn = document.getElementById("connectButton");
console.log(connectBtn); // sprawdź w konsoli, czy nie jest "null"
if (connectBtn) {
    connectBtn.addEventListener("click", () => toggleConnection());
}
else {
    console.error("Element o ID 'connectButton' nie istnieje w DOM!");
}
/**
 * Referencja do przycisku Start.
 */
const startBtn = document.getElementById("startButton");
/**
 * Referencja do przycisku Stop.
 */
const stopBtn = document.getElementById("stopButton");
/**
 * Referencja do elementu wyświetlającego napięcie.
 */
const voltageDisplayEl = document.getElementById("voltageDisplay");
/**
 * Referencja do paska postępu wyświetlającego napięcie.
 */
const voltageBar = document.getElementById("voltageBar");
/**
 * Obsługa kliknięcia przycisku Connect/Disconnect.
 * Łączy lub rozłącza z Arduino w zależności od aktualnego stanu połączenia.
 */
function toggleConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isConnected) {
            yield connect();
        }
        else {
            yield disconnect();
        }
    });
}
/**
 * Funkcja łączenia z Arduino.
 * Otwiera port szeregowy i przygotowuje strumień do wysyłania danych.
 * Odblokowuje przyciski Start/Stop po pomyślnym połączeniu.
 */
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Requesting port...");
            port = yield navigator.serial.requestPort();
            console.log("Port selected:", port);
            yield port.open({ baudRate: 9600 });
            // Tworzymy strumień do wysyłania
            const textEncoder = new TextEncoderStream();
            pipePromise = textEncoder.readable.pipeTo(port.writable);
            writer = textEncoder.writable.getWriter();
            isConnected = true;
            if (connectBtn) {
                connectBtn.textContent = "Rozłącz z Arduino";
            }
            console.log("Port connected successfully");
            // Odblokowanie przycisków Start/Stop
            startBtn.disabled = false;
            stopBtn.disabled = false;
        }
        catch (error) {
            console.error("Connection failed:", error);
        }
    });
}
/**
 * Rozłączenie z Arduino.
 * Zatrzymuje wysyłanie danych, zamyka writer i port.
 * Blokuje przyciski Start/Stop po rozłączeniu.
 */
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Disconnecting...");
            // 1. Zatrzymaj wysyłanie, aby setInterval nie pisał do strumienia
            stopSending();
            // 2. Zamknij writer (jeśli istnieje) - zapobiega "Cannot write to a CLOSED writable stream"
            if (writer) {
                console.log("Closing writer...");
                yield writer.close();
                writer = null;
            }
            // Oczekaj na zakończenie pipe'a, aby uniknąć błędów
            if (pipePromise) {
                console.log("Waiting for pipe to finish...");
                yield pipePromise.catch((error) => console.error("Pipe error:", error));
                pipePromise = null;
            }
            // 3. Zamknij port (jeśli istnieje)
            if (port) {
                console.log("Closing port...");
                yield port.close();
                port = null;
            }
            isConnected = false;
            if (connectBtn) {
                connectBtn.textContent = "Połącz z Arduino";
            }
            // Zablokuj przyciski start/stop
            startBtn.disabled = true;
            stopBtn.disabled = true;
            console.log("Port disconnected");
        }
        catch (error) {
            console.error("Disconnection failed:", error);
        }
    });
}
/**
 * Uruchom wysyłanie losowych wartości napięcia do Arduino.
 * Aktualizuje wyświetlacz napięcia i pasek postępu co 5s.
 */
function startSending() {
    if (!isConnected || !writer) {
        console.error("Cannot start sending: Not connected or no writer available");
        return;
    }
    // Jeśli już coś wysyłamy, zatrzymaj poprzedni interwał
    stopSending();
    isSending = true;
    sendingInterval = window.setInterval(() => {
        // Jeśli writer zniknął w trakcie, zakończ
        if (!writer || !isSending)
            return;
        let voltage = (Math.random() * 5).toFixed(1);
        voltageDisplayEl.value = `${voltage} V`;
        voltageBar.value = parseFloat(voltage);
        try {
            writer.write(voltage + "\n");
        }
        catch (error) {
            console.error("Error writing:", error);
            stopSending();
        }
    }, 5000);
    console.log("Started sending data");
}
/**
 * Zatrzymaj wysyłanie danych do Arduino.
 * Czyści interwał wysyłania i ustawia flagę isSending na false.
 */
function stopSending() {
    if (sendingInterval !== null) {
        clearInterval(sendingInterval);
        sendingInterval = null;
    }
    isSending = false;
    console.log("Stopped sending data");
}
/**
 * Event Listeners
 * Dodaje nasłuchiwanie na kliknięcia przycisków Connect, Start i Stop.
 */
if (connectBtn) {
    connectBtn.addEventListener("click", () => toggleConnection());
}
startBtn.addEventListener("click", () => startSending());
stopBtn.addEventListener("click", () => stopSending());
