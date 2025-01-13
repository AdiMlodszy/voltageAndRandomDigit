interface Navigator {
  serial: any;
}

let port: any = null;
let writer: WritableStreamDefaultWriter | null = null;
let sendingInterval: number | null = null;

// Flagi
let isConnected = false;
let isSending = false;

// Pobranie referencji do przycisków i elementów HTML
const connectBtn = document.getElementById("connectButton") as HTMLButtonElement;
const startBtn = document.getElementById("startButton") as HTMLButtonElement;
const stopBtn = document.getElementById("stopButton") as HTMLButtonElement;
const voltageDisplayEl = document.getElementById("voltageDisplay") as HTMLOutputElement;
const voltageBar = document.getElementById("voltageBar") as HTMLProgressElement;

/**
 * Obsługa kliknięcia przycisku Connect/Disconnect
 */
async function toggleConnection() {
  if (!isConnected) {
    await connect();
  } else {
    await disconnect();
  }
}

/**
 * Funkcja łączenia z Arduino
 */
async function connect() {
  try {
    console.log("Requesting port...");
    port = await navigator.serial.requestPort();
    console.log("Port selected:", port);

    await port.open({ baudRate: 9600 });

    // Tworzymy strumień do wysyłania
    const textEncoder = new TextEncoderStream();
    // textEncoder -> port.writable
    textEncoder.readable.pipeTo(port.writable);

    writer = textEncoder.writable.getWriter();

    isConnected = true;
    connectBtn.textContent = "Disconnect";
    console.log("Port connected successfully");

    // Odblokowanie przycisków Start/Stop
    startBtn.disabled = false;
    stopBtn.disabled = false;
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

/**
 * Rozłączenie z Arduino
 */
async function disconnect() {
  try {
    console.log("Disconnecting...");

    // 1. Zatrzymaj wysyłanie, aby setInterval nie pisał do strumienia
    stopSending();

    // 2. Zamknij writer (jeśli istnieje) - zapobiega "Cannot write to a CLOSED writable stream"
    if (writer) {
      console.log("Closing writer...");
      await writer.close();  // Tutaj może pojawić się wyjątek, jeśli strumień jest już zamknięty
      // writer = null;
    }

    // 3. Zamknij port (jeśli istnieje)
    if (port) {
      console.log("Closing port...");
      await port.close();    // Tutaj też może pojawić się wyjątek
      // port = null;
    }

    isConnected = false;
    connectBtn.textContent = "Connect to Arduino";

    // Zablokuj przyciski start/stop
    startBtn.disabled = true;
    stopBtn.disabled = true;

    console.log("Port disconnected");
  } catch (error) {
    console.error("Disconnection failed:", error);
  }
}

/**
 * Uruchom wysyłanie losowych wartości
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
    if (!writer || !isSending) return;

    const voltage = (Math.random() * 5).toFixed(2);
    voltageDisplayEl.value = `${voltage} V`;
    voltageBar.value = parseFloat(voltage);

    try {
      writer.write(voltage + "\n");
    } catch (error) {
      console.error("Error writing:", error);
    }
  }, 500);

  console.log("Started sending data");
}

/**
 * Zatrzymaj wysyłanie danych
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
 */
connectBtn.addEventListener("click", () => toggleConnection());
startBtn.addEventListener("click", () => startSending());
stopBtn.addEventListener("click", () => stopSending());
