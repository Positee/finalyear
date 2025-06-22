#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Keypad.h>
#include <HardwareSerial.h>
#include <ArduinoJson.h>  // ✅ New JSON library

// === CONFIG ===
const char* ssid = "SHOLA_COKER_HOTSPOT";
const char* password = "daddyplease";
const char* api_url = "http://172.20.10.4:3000/api/attendance"; 

#define SOLENOID_PIN 4 

#define FINGER_RX 16
#define FINGER_TX 17
HardwareSerial fingerSerial(2);
uint8_t response[32];

#define SS_PIN 5
#define RST_PIN 2
MFRC522 rfid(SS_PIN, RST_PIN);

const byte ROWS = 4, COLS = 4;
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {13, 12, 14, 27};
byte colPins[COLS] = {26, 25, 33, 32};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup() {
  Serial.begin(115200);
  fingerSerial.begin(57600, SERIAL_8N1, FINGER_RX, FINGER_TX);
  SPI.begin();
  rfid.PCD_Init();
  pinMode(SOLENOID_PIN, OUTPUT);
  digitalWrite(SOLENOID_PIN, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\n✅ WiFi connected");
}

void loop() {
  Serial.println("Place finger to start 3FA authentication...");
  while (!detectFinger()) delay(300);
  Serial.println("✓ Finger detected");

  // RFID
 String rfidUID = "";
Serial.println(">> Scan your RFID card");
unsigned long rfidStart = millis();

while ((millis() - rfidStart < 10000) && rfidUID == "") {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < rfid.uid.size; i++) {
      if (rfid.uid.uidByte[i] < 0x10) rfidUID += "0";  // Pad with 0
      rfidUID += String(rfid.uid.uidByte[i], HEX);
    }
    rfidUID.toUpperCase();  // Final formatted string e.g. "7322B810"
    
    Serial.println("📡 RFID UID: " + rfidUID);

    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
  delay(100);
}

  if (rfidUID == "") {
    Serial.println("❌ RFID not scanned. Session aborted.\n");
    return;
  }

  // PIN
  String pinCode = "";
  Serial.println(">> Enter PIN and press #:");

  while (pinCode.length() < 4) {
    char key = keypad.getKey();
    if (key) {
      if (key == '#') break;
      if (key == '*') {
        pinCode = "";
        Serial.println("\nPIN cleared");
      } else {
        pinCode += key;
        Serial.print("*");
      }
    }
    delay(100);
  }

  if (pinCode == "") {
    Serial.println("\n❌ PIN not entered. Session aborted.\n");
    return;
  }


  // ✅ Build JSON with ArduinoJson
  Serial.println("\n📡 Sending data to API...");

  HTTPClient http;
  http.begin(api_url);
  http.addHeader("Content-Type", "application/json");

  DynamicJsonDocument doc(256);
  doc["fingerprint_detected"] = true;
  doc["rfid"] = rfidUID;
  doc["pin"] = pinCode;
  doc["locationId"] = 1;  // You can change this dynamically

  String payload;
  serializeJson(doc, payload);
  Serial.println("Payload: " + payload);

  int httpCode = http.POST(payload);
  String response = http.getString();

  Serial.printf("📨 API Response [%d]: %s\n", httpCode, response.c_str());
 if (httpCode == 200) {
  Serial.println("✅ Authentication successful!");
  digitalWrite(SOLENOID_PIN, LOW);  // 🔓 Unlock
  delay(6000);
  digitalWrite(SOLENOID_PIN, HIGH);   // 🔒 Lock again
  Serial.println("🔒 Door locked.");
} else {
  Serial.println("❌ Authentication failed.");
}
  http.end();

  delay(3000);  // cooldown
}

// === GenImg command ===
bool detectFinger() {
  static const uint8_t cmd[] = {
    0xEF,0x01,0xFF,0xFF,0xFF,0xFF,
    0x01,0x00,0x03,0x01,0x00,0x05
  };

  while (fingerSerial.available()) fingerSerial.read();
  fingerSerial.write(cmd, sizeof(cmd));
  delay(200);

  if (fingerSerial.available() >= 12) {
    for (int i = 0; i < 12; i++) response[i] = fingerSerial.read();
    return (response[9] == 0x00);
  }
  return false;
}
