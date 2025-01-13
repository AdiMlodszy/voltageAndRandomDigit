var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Zmienna przechowująca referencję do portu szeregowego.
 */
var port = null;
/**
 * Zmienna przechowująca referencję do writer'a strumienia.
 */
var writer = null;
/**
 * Zmienna przechowująca identyfikator interwału wysyłania danych.
 */
var sendingInterval = null;
/**
 * Zmienna przechowująca obietnicę wysłania danych do Arduino.
 */
var pipePromise = null;
/**
 * Flaga wskazująca, czy połączenie z Arduino jest aktywne.
 */
var isConnected = false;
/**
 * Flaga wskazująca, czy dane są aktualnie wysyłane do Arduino.
 */
var isSending = false;
/**
 * Referencja do przycisku Connect/Disconnect.
 */
// const connectBtn = document.getElementById("connectButton") as HTMLButtonElement;
var connectBtn = document.getElementById("connectButton");
console.log(connectBtn); // sprawdź w konsoli, czy nie jest "null"
if (connectBtn) {
    connectBtn.addEventListener("click", function () { return toggleConnection(); });
}
else {
    console.error("Element o ID 'connectButton' nie istnieje w DOM!");
}
/**
 * Referencja do przycisku Start.
 */
var startBtn = document.getElementById("startButton");
/**
 * Referencja do przycisku Stop.
 */
var stopBtn = document.getElementById("stopButton");
/**
 * Referencja do elementu wyświetlającego napięcie.
 */
var voltageDisplayEl = document.getElementById("voltageDisplay");
/**
 * Referencja do paska postępu wyświetlającego napięcie.
 */
var voltageBar = document.getElementById("voltageBar");
/**
 * Obsługa kliknięcia przycisku Connect/Disconnect.
 * Łączy lub rozłącza z Arduino w zależności od aktualnego stanu połączenia.
 */
function toggleConnection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isConnected) return [3 /*break*/, 2];
                    return [4 /*yield*/, connect()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, disconnect()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Funkcja łączenia z Arduino.
 * Otwiera port szeregowy i przygotowuje strumień do wysyłania danych.
 * Odblokowuje przyciski Start/Stop po pomyślnym połączeniu.
 */
function connect() {
    return __awaiter(this, void 0, void 0, function () {
        var textEncoder, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("Requesting port...");
                    return [4 /*yield*/, navigator.serial.requestPort()];
                case 1:
                    port = _a.sent();
                    console.log("Port selected:", port);
                    return [4 /*yield*/, port.open({ baudRate: 9600 })];
                case 2:
                    _a.sent();
                    textEncoder = new TextEncoderStream();
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
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Connection failed:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Rozłączenie z Arduino.
 * Zatrzymuje wysyłanie danych, zamyka writer i port.
 * Blokuje przyciski Start/Stop po rozłączeniu.
 */
function disconnect() {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    console.log("Disconnecting...");
                    // 1. Zatrzymaj wysyłanie, aby setInterval nie pisał do strumienia
                    stopSending();
                    if (!writer) return [3 /*break*/, 2];
                    console.log("Closing writer...");
                    return [4 /*yield*/, writer.close()];
                case 1:
                    _a.sent();
                    writer = null;
                    _a.label = 2;
                case 2:
                    if (!pipePromise) return [3 /*break*/, 4];
                    console.log("Waiting for pipe to finish...");
                    return [4 /*yield*/, pipePromise.catch(function (error) { return console.error("Pipe error:", error); })];
                case 3:
                    _a.sent();
                    pipePromise = null;
                    _a.label = 4;
                case 4:
                    if (!port) return [3 /*break*/, 6];
                    console.log("Closing port...");
                    return [4 /*yield*/, port.close()];
                case 5:
                    _a.sent();
                    port = null;
                    _a.label = 6;
                case 6:
                    isConnected = false;
                    if (connectBtn) {
                        connectBtn.textContent = "Połącz z Arduino";
                    }
                    // Zablokuj przyciski start/stop
                    startBtn.disabled = true;
                    stopBtn.disabled = true;
                    console.log("Port disconnected");
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error("Disconnection failed:", error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
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
    sendingInterval = window.setInterval(function () {
        // Jeśli writer zniknął w trakcie, zakończ
        if (!writer || !isSending)
            return;
        var voltage = (Math.random() * 5).toFixed(1);
        voltageDisplayEl.value = "".concat(voltage, " V");
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
    connectBtn.addEventListener("click", function () { return toggleConnection(); });
}
startBtn.addEventListener("click", function () { return startSending(); });
stopBtn.addEventListener("click", function () { return stopSending(); });
