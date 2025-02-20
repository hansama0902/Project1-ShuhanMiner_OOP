# **Design Patterns in SHUHANMINER**

This document explains the application of three design patterns in my SHUHANMINER: **Singleton, Factory, and Observer**. 
---

## **Singleton Pattern - MonitoringSystem.js**

###  **Implementation**
```js
export class MonitoringSystem {
    static #instance;
    #machines;

    constructor() {
        if (!MonitoringSystem.#instance) {
            this.#machines = [];
            MonitoringSystem.#instance = this;
        }
        return MonitoringSystem.#instance;
    }

    addMachine(machine) {
        if (!this.#miningMachines.some(m => m.ipAddress === machine.ipAddress)) {
            this.#miningMachines.push(machine);
            console.log(` Machine ${machine.model} with IP ${machine.ipAddress} added successfully.`);
        } else {
            console.log(`Machine with IP ${machine.ipAddress} is already in the system.`);
        }
    }
}
```

### **OOP application**
- **Encapsulation**: Private `#instance` ensures controlled access.
- **Ensures a single instance**: Prevents multiple instances managing different machine lists.
- **Improves memory efficiency**: Shared instance instead of redundant copies.

### **Incorrect Example - Breaking Singleton**
```js
class MonitoringSystem {
    constructor() {
        this.machines = [];
    }
}

const monitoring1 = new MonitoringSystem();
const monitoring2 = new MonitoringSystem();
console.log(monitoring1 !== monitoring2); // true, violating Singleton
```
**Why does this break Singleton?**
- **Multiple instances exist**, causing inconsistent data.
- **Every call to `new MonitoringSystem()` creates a new object**, instead of reusing an existing one.
```js
class DatabaseConnection {
    constructor() {
        this.connection = `Connected to DB at ${new Date()}`;
    }
}
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1.connection !== db2.connection); // true, breaking Singleton
```
- **Problem**: Each time a new instance is created, the database connection is duplicated, leading to resource mismanagement.
---

## **Factory Pattern - Monitoring Report Factory**

### **Implementation**
```js
export class MonitoringReportFactory {
    static generateReport(type, monitoringSystem) {
        switch (type.toLowerCase()) {
            case "financial":
                return new FinancialReport(monitoringSystem);
            case "performance":
                return new PerformanceReport(monitoringSystem);
            default:
                throw new Error(`Invalid report type: ${type}`);
        }
    }
}
```

### **OOP application**
- **Encapsulation**: Encapsulates object creation logic.
- **Open-Closed Principle**: New report types can be added without modifying the factory.
- **Simplifies object creation**: Users don’t need to know report class details.

### **Incorrect Example - Breaking Factory Pattern**
```js
const reportType = "financial";
let report;
if (reportType === "financial") {
    report = new FinancialReport(monitoringSystem);
} else if (reportType === "performance") {
    report = new PerformanceReport(monitoringSystem);
} else {
    throw new Error("Invalid report type");
}
```
**Why does this break Factory Pattern?**
- **Uses direct conditional logic (`if-else`) instead of a factory method**.
- **Hardcoded logic makes it harder to extend**.

---

## **Observer Pattern - User && Observer **

### **Implementation**
```js
export class User extends Observer {
    eceiveNotification(notification) {
        if (!notification || typeof notification.content !== "string") {
            throw new Error("Invalid notification object. Expected { content: string }.");
        }
        this.#notifications.push(notification);
        console.log(`User ${this.#userId} received notification: ${notification.content}`);
    }
}
```
```js
export class Observer {
    /**
 * Receives notification.
 * @param {Notification} notification - The received notification.
 * @throws {Error} If the method is not implemented.
 */
    receiveNotification(notification) {
        console.log("Notification received:", notification);
        throw new Error("Method 'update' must be implemented.");
    }
}
```

### **OOP application?**
- **Encapsulation**: Users handle their own notifications.
- **Loose Coupling**: The system doesn’t need to modify alert logic to add new users.
- **Scalability**: New notification types can be added without modifying `User`.

### **Incorrect Example - Breaking Observer Pattern**
```js
class Alert {
    notifyUsers(users) {
        for (let i = 0; i < users.length; i++) {
            console.log(`Notifying ${users[i]}`);
        }
    }
}
```
**Why does this break Observer Pattern?**
- **Doesn’t allow dynamic subscription of observers**.
- **Each `notifyUsers()` call requires a manual user list instead of an automatic subscription model**.
```js
class NewsPublisher {
    constructor() {
        this.subscribers = [];
    }

    notify(news) {
        this.subscribers.forEach(subscriber => {
            subscriber.receive(news);
        });
    }
}
const publisher = new NewsPublisher();
publisher.notify("Breaking News!"); // No subscribers added, notification fails
```
- **Problem**: Without a proper subscribe() method, no users can dynamically register, breaking the observer model.

# OOP and SOLID Principles in ShuhanMiner

## OOP Principles

### Abstraction
**Why it's a good application of OOP:**
- The `MonitoringSystem` class abstracts complex mining operations, exposing only necessary functionalities to the user.
- The `ElectricityPricing` class hides the internal calculations of electricity pricing fluctuations while providing an interface for alerts.

**Example from Code:**
```javascript
export class MonitoringSystem {
    static #instance; // Private static instance for Singleton

    #miningMachines;
    #faultType;
    #firmwareVersion;
    #overheatedMachines;

    constructor() {
        if (!MonitoringSystem.#instance) {
            MonitoringSystem.#instance = this;
            this.#miningMachines = [];
        }
        return MonitoringSystem.#instance;
    }

    getMachines() {
        return this.#miningMachines;
    }
}
```

---

### Encapsulation
**Why it's a good application of OOP:**
- The `MiningMachine` class uses private fields (`#temperature`, `#status`) to prevent direct modification from external classes.
- The `MonitoringSystem` class maintains private fields to ensure data integrity.

**Example from Code:**
```javascript
export class MiningMachine {
    #ipAddress;
    #hashRate;
    #temperature;
    #model;
    #status;

    constructor(ipAddress, hashRate, temperature, model, status) {
        this.#ipAddress = ipAddress;
        this.#hashRate = hashRate;
        this.#temperature = temperature;
        this.#model = model;
        this.#status = status;
    }

    getTemperature() {
        return this.#temperature;
    }
}
```

---

### Inheritance
**Why it's a good application of OOP:**
- `PerformanceReport` and `FinancialReport` both extend `MonitoringReport`, reusing shared reporting logic.
- `User` extends `Observer`, allowing users to receive notifications in a structured way.

**Example from Code:**
```javascript
import { MonitoringReport } from './MonitoringReport.js';

export class FinancialReport extends MonitoringReport {
    #totalHashrate;
    #electricityCost;
    #revenue;

    constructor(monitoringSystem) {
        super(monitoringSystem);
        this.#calculateMetrics();
    }
}
```

---

### Polymorphism
**Why it's a good application of OOP:**
- The `MonitoringReportFactory` uses polymorphism to generate different types of reports dynamically.
- `Observer` pattern allows different observer types to subscribe to notifications.

**Example from Code:**
```javascript
export class MonitoringReportFactory {
    static generateReport(type, monitoringSystem) {
        switch (type.toLowerCase()) {
            case "financial":
                return new FinancialReport(monitoringSystem);
            case "performance":
                return new PerformanceReport(monitoringSystem);
            default:
                throw new Error("Invalid report type");
        }
    }
}
```

---

## SOLID Principles

### Single Responsibility Principle (SRP)
**Why it's a good application of OOP:**
- The `Alert` class only handles alerts, separate from `MonitoringSystem`, which focuses on tracking machine performance.

**Example from Code:**
```javascript
export class Alert {
    #alertType;
    #alertLevel;
    #timestamp;
    #triggeredBy;
    #notifiedUsers;

    constructor(alertType, alertLevel, timestamp) {
        this.#alertType = alertType;
        this.#alertLevel = alertLevel;
        this.#timestamp = timestamp;
        this.#notifiedUsers = [];
    }
}
```

---

### Open-Closed Principle (OCP)
**Why it's a good application of OOP:**
- `MonitoringReportFactory` can generate new types of reports without modifying its existing logic.

**Example from Code:**
```javascript
export class MonitoringReportFactory {
    static generateReport(type, monitoringSystem) {
        switch (type.toLowerCase()) {
            case "financial":
                return new FinancialReport(monitoringSystem);
            case "performance":
                return new PerformanceReport(monitoringSystem);
            default:
                throw new Error("Invalid report type");
        }
    }
}
```

---

### Liskov Substitution Principle (LSP)
**Why it's a good application of OOP:**
- `FinancialReport` and `PerformanceReport` correctly extend `MonitoringReport`, ensuring they can replace it without issues.

**Example from Code:**
```javascript
export class PerformanceReport extends MonitoringReport {
    generate() {
        return "Performance data...";
    }
}
```

---

### Interface Segregation Principle (ISP)
**Why it's a good application of OOP:**
- `Observer` pattern ensures that observers only implement relevant notification methods.

**Example from Code:**
```javascript
export class Observer {
    update() {
        throw new Error("Method 'update()' must be implemented.");
    }
}
```

---

### Dependency Inversion Principle (DIP)
**Why it's a good application of OOP:**
- `IMonitoringSystem` ensures that high-level modules depend on abstractions instead of concrete implementations.

**Example from Code:**
```javascript
export class IMonitoringSystem {
    getMachines() {
        throw new Error("Method 'getMachines()' must be implemented.");
    }
}
```

By following OOP and SOLID principles correctly, ShuhanMiner ensures that its mining monitoring system is modular, scalable, and easy to maintain.


