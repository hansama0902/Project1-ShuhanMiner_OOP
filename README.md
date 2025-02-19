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
1. **Test File Design:** ChatGPT 4o was used to help design structured and efficient test cases.
2. **JSDoc Example Creation:** ChatGPT 4o was used to generate an example JSDoc structure for documentation.
3. **Observer Pattern Example:** ChatGPT 4o assisted in finding an effective Observer Pattern example for notification handling.  
---
## License

This project is licensed under the **MIT License**.



