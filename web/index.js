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
var port = null;
var writer = null;
var isConnected = false; // Flaga stanu połączenia
// Elementy z HTML
var connectBtn = document.getElementById("connectButton");
var startBtn = document.getElementById("startButton");
var stopBtn = document.getElementById("stopButton");
var voltageDisplayEl = document.getElementById("voltageDisplay");
var voltageBar = document.getElementById("voltageBar");
var sendingInterval = null;
/**
 * Funkcja obsługująca kliknięcie przycisku Connect/Disconnect
 */
function toggleConnection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isConnected) return [3 /*break*/, 2];
                    // Jeśli nie jest jeszcze połączone, spróbuj połączyć
                    return [4 /*yield*/, connect()];
                case 1:
                    // Jeśli nie jest jeszcze połączone, spróbuj połączyć
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: 
                // Jeśli jest już połączone, rozłącz
                return [4 /*yield*/, disconnect()];
                case 3:
                    // Jeśli jest już połączone, rozłącz
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Funkcja nawiązuje połączenie z Arduino
 */
function connect() {
    return __awaiter(this, void 0, void 0, function () {
        var textEncoder, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, navigator.serial.requestPort()];
                case 1:
                    // Użytkownik wybiera port
                    port = _a.sent();
                    return [4 /*yield*/, port.open({ baudRate: 9600 })];
                case 2:
                    _a.sent();
                    textEncoder = new TextEncoderStream();
                    textEncoder.readable.pipeTo(port.writable);
                    writer = textEncoder.writable.getWriter();
                    // Aktualizacja stanu i etykiety
                    isConnected = true;
                    connectBtn.textContent = "Disconnect";
                    console.log("Port connected successfully");
                    // Odblokuj przyciski Start / Stop
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
 * Funkcja rozłączania
 */
function disconnect() {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    // Zatrzymaj ewentualne wysyłanie, żeby nie próbowało pisać do zamkniętego portu
                    stopSending();
                    if (!writer) return [3 /*break*/, 2];
                    return [4 /*yield*/, writer.close()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!port) return [3 /*break*/, 4];
                    return [4 /*yield*/, port.close()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    // Aktualizacja stanu i etykiety
                    isConnected = false;
                    connectBtn.textContent = "Connect to Arduino";
                    console.log("Port disconnected");
                    // Zablokuj przyciski Start / Stop
                    startBtn.disabled = true;
                    stopBtn.disabled = true;
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("Disconnection failed:", error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Start wysyłania losowych napięć
 */
function startSending() {
    if (!isConnected || !writer) {
        console.error("Cannot start sending: Not connected or no writer available");
        return;
    }
    // Jeśli już wysyłamy dane, zatrzymaj poprzedni interwał
    if (sendingInterval !== null) {
        clearInterval(sendingInterval);
    }
    sendingInterval = window.setInterval(function () {
        var voltage = (Math.random() * 5).toFixed(2);
        voltageDisplayEl.value = "".concat(voltage, " V");
        voltageBar.value = parseFloat(voltage);
        try {
            writer === null || writer === void 0 ? void 0 : writer.write(voltage + "\n");
        }
        catch (error) {
            console.error("Error writing:", error);
        }
    }, 5000);
    console.log("Started sending data");
}
/**
 * Stop wysyłania danych
 */
function stopSending() {
    if (sendingInterval !== null) {
        clearInterval(sendingInterval);
        sendingInterval = null;
    }
    console.log("Stopped sending data");
}
// Event Listeners
connectBtn.addEventListener("click", toggleConnection);
startBtn.addEventListener("click", startSending);
stopBtn.addEventListener("click", stopSending);
/**
 * Upewnij się, że w pliku HTML (index.html) przyciski Start i Stop
 * mają disabled="true" na starcie, aby były odblokowane dopiero po połączeniu:
 *
 * <button id="startButton" disabled>Start sending data</button>
 * <button id="stopButton" disabled>Stop sending data</button>
 */
