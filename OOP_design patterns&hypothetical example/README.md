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

# OOP Pillars in ShuhanMiner

## Abstraction

### Why It's a Good Application of OOP
One of the best examples of **abstraction** in ShuhanMiner is the `MonitoringSystem` class. This class abstracts the complexities of managing mining machines and provides a clear, user-friendly interface for interacting with them. The class hides implementation details such as how mining machine data is stored and processed, allowing users to retrieve and manage machines without dealing with internal logic.

Key benefits of this abstraction:
- **Simplified Usage:** Users do not need to know how the mining machine tracking system works internally.
- **Improved Maintainability:** Changes to the internal structure do not affect users who rely on the `MonitoringSystem` interface.
- **Enhanced Security:** Private fields ensure that mining machine details are not modified directly, preserving system integrity.

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
The `MiningMachine` class is a great example of **encapsulation** in ShuhanMiner. It uses private fields to ensure that mining machine attributes such as temperature, status, and IP address are not directly modified by external code. Instead, controlled access methods (getters and setters) are provided to retrieve necessary details.

Key benefits of this encapsulation:
- **Data Integrity:** Prevents unintended modifications to mining machine properties.
- **Controlled Access:** Only authorized methods can modify machine attributes.
- **Code Maintainability:** Changes to the internal structure do not affect the interface used by other parts of the program.

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
This ensures that attributes like `temperature` cannot be modified directly, preserving system stability.

#### Hypothetical Example That Breaks Encapsulation
```javascript
class BankAccount {
    constructor(balance) {
        this.balance = balance; // Exposing the balance directly
    }
}
let account = new BankAccount(1000);
account.balance = -500; // Invalid modification
```
**Issue:** The balance should be accessed and modified via methods instead of being directly exposed.

---

## Inheritance

### Why It's a Good Application of OOP
ShuhanMiner effectively applies **inheritance** in its reporting system. The `FinancialReport` and `PerformanceReport` classes both extend the base `MonitoringReport` class, reusing shared functionalities while adding specific behaviors for financial and performance analysis.

Key benefits of this inheritance:
- **Code Reusability:** Common logic is shared in the base class to avoid redundancy.
- **Scalability:** New types of reports can be added by extending `MonitoringReport` without modifying the base class.
- **Flexibility:** Each report type can customize behavior while still adhering to a standard structure.

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
ShuhanMiner effectively utilizes **polymorphism** in its reporting system. The `MonitoringReportFactory` dynamically generates different types of reports (financial, performance) based on the input type. This ensures that different report types follow the same interface while executing their unique behaviors.

Key benefits of this polymorphism:
- **Flexible Code:** The system can create and use various report types without altering the main logic.
- **Extensibility:** New report types can be added without changing the factory's core implementation.
- **Code Maintainability:** Reduces the need for complex conditionals when handling multiple report types.

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

