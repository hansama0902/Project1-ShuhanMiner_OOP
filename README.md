# Project1-ShuhanMiner_OOP
This was a multi-million-dollar idea to design an application for monitoring, managing, and maintaining mining machines.

## Author
**Shuhan Dong**

## **Overview**
ShuhanMiner is an **OOP-based mining farm management system** designed to efficiently monitor, manage, and optimize large-scale mining operations. It provides **real-time monitoring**, **batch management**, **firmware upgrades**, and **performance/financial reports** to help administrators, investors, and cloud operators maximize efficiency and profitability.

---

## **Key Features**
- **Real-Time Monitoring:** Track mining machines' IP, hashrate, temperature, status, and electricity price fluctuations.
- **Batch Operations:** Restart multiple machines and update firmware in bulk to reduce downtime.
- **Smart Alerts:** Receive notifications for overheating, machine failures, and electricity price spikes.
- **Performance & Financial Reports:** Evaluate mining efficiency and profitability based on automated data analysis.
- **Scalable Architecture:** Designed to handle thousands of machines with minimal performance impact.

---

## **Installation & Setup**
### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/Project1-ShuhanMiner_OOP.git
cd Project1-ShuhanMiner_OOP
```

### **2. Install Dependencies**
Ensure you have **Node.js** installed, then run:
```bash
npm install
```

### **3. Run the Application**
To start the monitoring system:
```bash
node demo_example/demo.js
```
To run Jest tests:
```bash
npm test
```
### **4. View JSDoc Documentation**  
To open the `out/index.html` in your browser:
```bash
npx http-server out
```

---

## **Technical Implementation**
### **OOP Principles Applied**
- **Encapsulation:** Private properties protect machine and system data integrity.
- **Abstraction:** Simplified monitoring and management interfaces hide implementation complexities.
- **Inheritance:** `MonitoringReport` subclasses handle financial and performance analytics.
- **Polymorphism:** Different report types can be generated using a single `generate()` method.

### **SOLID Principles Implemented**
- **Single Responsibility:** Each class has a well-defined purpose (e.g., `MonitoringSystem`, `Alert`).
- **Open-Closed:** Easily extendable monitoring reports without modifying existing logic.
- **Liskov Substitution:** `FinancialReport` and `PerformanceReport` extend `MonitoringReport` seamlessly.
- **Interface Segregation:** Users only interact with the necessary system components.
- **Dependency Inversion:** High-level modules depend on abstract monitoring and reporting interfaces.

### **Design Patterns Used**
- **Singleton:** `MonitoringSystem` ensures only one instance manages mining data.
- **Factory Pattern:** `MonitoringReportFactory` dynamically creates financial and performance reports.
- **Observer Pattern:** `User` class receives notifications via alerts.

---

## **Class Structure Overview**
- **`MonitoringSystem`** - Manages the entire mining operation, including tracking machine performance and sending alerts.
- **`MiningMachine`** - Represents individual mining devices, storing information like hashrate, temperature, and status.
- **`Alert`** - Handles system notifications for overheating, failures, and abnormal electricity price fluctuations.
- **`MonitoringReport`** (Abstract Class) - Base class for generating mining performance and financial reports.
  - **`PerformanceReport`** - Extends `MonitoringReport` to analyze efficiency metrics like hashrate trends.
  - **`FinancialReport`** - Extends `MonitoringReport` to provide financial insights, including electricity cost and profitability.
- **`User`** - Represents system users (admins, investors) and receives alerts using the Observer pattern.
- **`MonitoringReportFactory`** - Implements the Factory pattern to dynamically create `PerformanceReport` or `FinancialReport` instances.
- **`ElectricityPricing`** - Tracks electricity cost fluctuations and triggers alerts when thresholds are exceeded.
- **`Observer`** (Interface) - Defines the contract for classes that observe and respond to system updates.
- **`Notification`** - Represents system notifications and messages sent to users.
- **`RestartOperation`** - Manages batch restart operations for mining machines, ensuring safe and efficient restarts.
- **`ObserverManager`** - Manages registered observers and broadcasts updates to them.
---

## **Testing**
ShuhanMiner uses **Jest** for unit testing. To run tests:
```bash
npm test
```
- Tests cover **monitoring, alerts, batch operations, and reporting**.
- Mock modules simulate mining machine behavior for reliability.

---

## **AI Usage**
This project has integrated AI assistance in the following ways:
1. **Test File Design:**
   - **Model Used:** ChatGPT 4o
   - **Prompt:** "Help me design a test suite for classes."
   - **How it was used:** The generated code was used as a reference to design structured and efficient test cases for different classes.

2. **JSDoc Example Creation:**
   - **Model Used:** ChatGPT 4o
   - **Prompt:** "Can you give me an example of a JSDoc document? I want to use it to document my code."
   - **How it was used:** The provided JSDoc example was used to create structured documentation for the project.

3. **Observer Pattern Implementation:**
   - **Model Used:** ChatGPT 4o
   - **Prompt:** "Find an effective Observer Pattern example for notification handling."
   - **How it was used:** The generated example was adapted to design the alert notification system using the Observer pattern.

---

## **Resources**
- [Video](https://youtu.be/R1kZ3-wLV_E)  
- [UML](https://lucid.app/lucidchart/c2aea4c8-6297-4041-a0c9-86d3542032d7/edit?viewport_loc=-1724%2C-881%2C4911%2C2993%2C0_0&invitationId=inv_2ccd1b6b-e5bf-4e7c-9735-a7919fcdd857)  
- [Figma](https://www.figma.com/design/LzSmddUo5EEPUXzetZANBV/ShuhanMiner?node-id=0-1&m=dev&t=JuRjF2fUYOPkUmnD-1)  
- [OOP Design Patterns & Hypothetical Example](https://github.com/hansama0902/Project1-ShuhanMiner_OOP/tree/main/OOP_design%20patterns%26hypothetical%20example)  
- [Business Requirements](https://github.com/hansama0902/Project1-ShuhanMiner_OOP/blob/main/Business%20Requirements/ShuhanMiner%20Business%20Requirements%20Document.pdf)

---

## **License**
This project is licensed under the **MIT License**.





