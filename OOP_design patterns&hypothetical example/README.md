# **Design Patterns in SHUHANMINER**

This document explains the application of three design patterns in my SHUHANMINER: **Singleton, Factory, and Observer**. 
---

## **Singleton Pattern - MonitoringSystem.js**

###  **Implementation**
```js
export class MonitoringSystem {
    static #instance; // Private static instance for Singleton

    #miningMachines;
    #faultType;
    #firmwareVersion;
    #overheatedMachines;

   constructor() {
        if (!MonitoringSystem.#instance) {
            this.#miningMachines = [];
            this.#faultType = null; // Default: No faults
            this.#firmwareVersion = "v1.0.0"; // Default firmware version
            this.#overheatedMachines = [];
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
    static factoryName = "Mining Report Factory"; // Custom factory property

    /**
     * @function generateReport
     * @param {string} type - The type of report ("financial", "performance", "maintenance").
     * @param {MonitoringSystem} monitoringSystem - The monitoring system instance.
     * @returns {MonitoringReport} - A new report instance.
     * @throws {Error} If an invalid report type is provided.
     * Generates a specific type of monitoring report.
     */
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
    #userId;
    #role;
    #notifications;
    constructor(userId, role) {
        super();
        this.#userId = userId;
        this.#role = role;
        this.#notifications = [];
    }
     receiveNotification(notification) {
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

# OOP Pillars in ShuhanMiner

## Abstraction

### Why It's a Good Application of OOP
The examples of **abstraction** in ShuhanMiner is the `MonitoringSystem` class. This class abstracts the complexities of managing mining machines and provides a clear, user-friendly interface for interacting with them. The class hides implementation details such as how mining machine data is stored and processed, allowing users to retrieve and manage machines without dealing with internal logic.


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
            this.#miningMachines = [];
            this.#faultType = null; // Default: No faults
            this.#firmwareVersion = "v1.0.0"; // Default firmware version
            this.#overheatedMachines = [];
            MonitoringSystem.#instance = this;
        }
        return MonitoringSystem.#instance;
    }

     getMiningMachines() {
        return this.#miningMachines;
    }
    getOverheatedMachines() {
        return this.#overheatedMachines;
    }
}
```
This implementation ensures that external users only interact with the `getMachines()` method while the actual machine details and logic remain hidden.

#### Hypothetical Example That Breaks Abstraction
```javascript
class Car {
    constructor() {
        this.fuelLevel = 100;
    }
    drive() {
        console.log("Driving...");
        this.fuelLevel -= 10;
    }
    getFuelLevel() {
        return this.fuelLevel;
    }
}
```
**Issue:** The `fuelLevel` property is directly exposed, rather than being encapsulated and accessed through controlled methods.

---

## Encapsulation

### Why It's a Good Application of OOP
The `MiningMachine` class is a example of **encapsulation** in ShuhanMiner. It uses private fields to ensure that mining machine attributes such as temperature, status, and IP address are not directly modified by external code. Instead, controlled access methods (getters and setters) are provided to retrieve necessary details.  

**Example from Code:**
```javascript
export class MiningMachine {
   #ipAddress;
    #hashRate;
    #temperature;
    #model;
    #status;
    #highTemperatureMode;
    #alerts; // List of alert messages

      constructor(ipAddress, hashRate, temperature, model, status, highTemperatureMode) {
        this.#ipAddress = ipAddress;
        this.#hashRate = Number(hashRate) || 0;;
        this.#temperature = temperature;
        this.#model = model;
        this.#status = status;
        this.#highTemperatureMode = highTemperatureMode;
        this.#alerts = []; // Store alert messages
    }

   get temperature() {
        return this.#temperature;
    }
}
```
This ensures that attributes like `temperature` cannot be modified directly, preserving system stability.

#### Hypothetical Example That Breaks Encapsulation
```javascript
class BankAccount {
    constructor(balance) {
        this.balance = balance; 
    }
}
let account = new BankAccount(1000);
account.balance = -500; 
```
**Issue:** The balance should be accessed and modified via methods instead of being directly exposed.

---

## Inheritance

### Why It's a Good Application of OOP
ShuhanMiner applies **inheritance** in its reporting system. The `FinancialReport` and `PerformanceReport` classes both extend the base `MonitoringReport` class, reusing shared functionalities while adding specific behaviors for financial and performance analysis.  

**Example from Code:**
```javascript
import { MonitoringReport } from './MonitoringReport.js';;
export class FinancialReport extends MonitoringReport {
    #totalHashrate;
    #electricityCost;
    #revenue;
    constructor(monitoringSystem) {
        super(monitoringSystem);
        this.#calculateMetrics();
    }

    #calculateMetrics() {
        const monitoringSystem = this.getMonitoringSystem();
        this.#totalHashrate = monitoringSystem.getMachines().reduce((sum, machine) => sum + machine.hashRate, 0);
        this.#electricityCost = monitoringSystem.getMachines().length * 0.1; // Simulated cost per machine
        this.#revenue = (this.#totalHashrate * 0.05) - this.#electricityCost; // Simulated revenue calculation
    }
    generate() {
            return `Financial Report:
        - Total revenue: $${this.#revenue.toFixed(2)}
        - Total hashrate: ${this.#totalHashrate} TH/s
        - Electricity cost: $${this.#electricityCost.toFixed(2)}`;
    }
}
```
The `FinancialReport` class inherits from `MonitoringReport`, leveraging its base functionalities while adding financial-specific metrics.

#### Hypothetical Example That Breaks Inheritance
```javascript
class Animal {
    move() {
        console.log("Moving...");
    }
}
class Dog extends Animal {
    move() {
        console.log("Dogs cannot move!");
    }
}
```
**Issue:** The subclass (`Dog`) contradicts the base class behavior instead of extending it correctly.

---

## Polymorphism

### Why It's a Good Application of OOP
ShuhanMiner utilizes **polymorphism** in its reporting system. The `MonitoringReportFactory` dynamically generates different types of reports (financial, performance) based on the input type. This ensures that different report types follow the same interface while executing their unique behaviors.
**Example from Code:**
```javascript
import {FinancialReport} from "./FinancialReport.js";
import {PerformanceReport} from "./PerformanceReport.js";
export class MonitoringReportFactory {
    static factoryName = "Mining Report Factory"; // Custom factory property
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
This implementation ensures that new report types can be added without modifying existing logic.

#### Hypothetical Example That Breaks Polymorphism
```javascript
class Bird {
    fly() {
        console.log("Flying...");
    }
}
class Penguin extends Bird {
    fly() {
        throw new Error("Penguins cannot fly!");
    }
}
```
**Issue:** The `Penguin` class overrides `fly()` in a way that contradicts the expectations of the parent class.

---

By following OOP principles correctly, ShuhanMiner ensures that its mining monitoring system is modular, scalable, and easy to maintain.  

# SOLID Principles in ShuhanMiner

## Single Responsibility Principle (SRP)

### Why It's a Good Application of OOP
The `User` class in ShuhanMiner follows SRP by only handling user-related notifications. It does not handle notification management, which is managed separately by the `NotificationManager`. This ensures that the user-related logic remains focused and isolated.

**Example from Code:**
```javascript
import { Observer } from "./Observer.js";
export class User extends Observer {
    #userId;
    #role;
    #notifications;

    constructor(userId, role) {
        super();
        this.#userId = userId;
        this.#role = role;
        this.#notifications = [];
    }

    receiveNotification(notification) {
        if (!notification || typeof notification.content !== "string") {
            throw new Error("Invalid notification object. Expected { content: string }.");
        }
        this.#notifications.push(notification);
        console.log(`User ${this.#userId} received notification: ${notification.content}`);
    }
}
```

#### Hypothetical Example That Breaks SRP
```javascript
class Report {
    generateReport() {
        return "Report Data";
    }
    saveToFile(filename) {
        fs.writeFileSync(filename, this.generateReport());
    }
}
```
**Issue:** This class handles both report generation and file saving, violating SRP.

---

## Open-Closed Principle (OCP)

### Why It's a Good Application of OOP
The `MonitoringReport` class is designed to be easily extended without modifying existing code. By defining `MonitoringReport` as an abstract class, new types of reports can be added without changing the base implementation, making the system flexible and scalable.

**Example from Code:**
```javascript
export class FinancialReport extends MonitoringReport {
    generate() {
        return "Generating Financial Report...";
    }
}

export class PerformanceReport extends MonitoringReport {
    generate() {
        return "Generating Performance Report...";
    }
}
```

### Hypothetical Example That Breaks OCP
```javascript
class Report {
    generate(type) {
        if (type === "financial") {
            return "Generating Financial Report...";
        } else if (type === "performance") {
            return "Generating Performance Report...";
        } else {
            throw new Error("Invalid report type");
        }
    }
}
```
**Issue:** Here, adding a new report type would require modifying `generate()`, violating OCP. Instead, it should be handled via subclassing.

---

## Liskov Substitution Principle (LSP)

### Why It's a Good Application of OOP
The `MonitoringReport` subclasses (`FinancialReport`, `PerformanceReport`) extend `MonitoringReport` without altering its expected behavior, ensuring they can be used interchangeably.

**Example from Code:**
```javascript
export class PerformanceReport extends MonitoringReport {
    generate() {
        return "Performance Data Generated";
    }
}
```

### Hypothetical Example That Breaks LSP
```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = this.height = width;
    }
}
```
**Issue:** `Square` overrides `setWidth()` in a way that changes the expected behavior of `Rectangle`, violating LSP.

---

## **Interface Segregation Principle (ISP)**

### **Why It's a Good Application of OOP**
In `Alert.js`, the `Alert` class only provides `trigger()&& notifyUsers()` without forcing unnecessary methods.

### **Code Example**
```javascript
import { User } from "./User.js";
/**
 * @description Represents an alert triggered by a mining machine or electricity pricing.
 * 
 * Implements:
 * - **Encapsulation**: Uses private fields for data protection.
 */
export class Alert {
    #alertType;
    #alertLevel;
    #timestamp;
    #triggeredBy;
    #notifiedUsers;

    constructor(alertType, alertLevel, timestamp, triggeredBy) {
        this.#alertType = alertType;
        this.#alertLevel = alertLevel;
        this.#timestamp = timestamp;
        this.#triggeredBy = triggeredBy;
        this.#notifiedUsers = [];
    }

    /**
     * @function trigger
     * @param {User[]} users - List of users to notify.
     * @returns {void}
     * Triggers the alert and notifies all subscribed users.
     */
    trigger(users) {
        console.log(`Alert Triggered: ${this.#alertType} - Level: ${this.#alertLevel}`);
    
        if (!Array.isArray(users) || users.length === 0) {
            console.warn("No users to notify.");
            return;
        }
        
        this.notifyUsers(users);
    }

    /**
     * @function notifyUsers
     * @param {User[]} users - Users to be notified.
     * @returns {void}
     * Notifies users about the alert.
     */
    notifyUsers(users) {
        users.forEach(user => {
            if (user instanceof User) {
                const notification = {
                    content: `Alert: ${this.#alertType} - Level: ${this.#alertLevel}`,
                    timestamp: this.#timestamp
                };
                user.receiveNotification(notification); 
                this.#notifiedUsers.push(user.getUserId());
            }
        });
    }
}
```

### **Hypothetical Example That Breaks ISP**
```javascript
class Worker {
    work() {}
    eat() {}
}
class Robot extends Worker {
    eat() {
        throw new Error("Robots do not eat!");
    }
}
```

**Issue:** `Robot` is forced to implement `eat()`, which it does not need.

---

## Dependency Inversion Principle (DIP)

### Why It's a Good Application of OOP
The `MonitoringReportFactory` follows DIP by ensuring that high-level modules depend on an abstract `MonitoringReport`, rather than concrete implementations of `MonitoringSystem`. This allows easy extension and substitution of different report types without modifying existing logic.

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

### Hypothetical Example That Breaks DIP
```javascript
class FinancialReport {
    constructor(monitoringSystem) {
        this.monitoringSystem = monitoringSystem;
    }

    generate() {
        const data = this.monitoringSystem.getData();
        return `Financial Report: ${data}`;
    }
}
```
**Issue:** `FinancialReport` directly depends on `MonitoringSystem`, making it hard to extend or replace `MonitoringSystem` with another data source, violating DIP.

