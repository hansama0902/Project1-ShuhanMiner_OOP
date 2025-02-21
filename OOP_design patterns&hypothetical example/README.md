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
The `MiningMachine` class is a example of **encapsulation** in ShuhanMiner. It uses private fields to ensure that mining machine attributes such as temperature, status, and IP address are not directly modified by external code. Instead, controlled access methods (getters and setters) are provided to retrieve necessary details.  

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
ShuhanMiner utilizes **polymorphism** in its reporting system. The `MonitoringReportFactory` dynamically generates different types of reports (financial, performance) based on the input type. This ensures that different report types follow the same interface while executing their unique behaviors.
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
The `MonitoringReport` class follows OCP by allowing new report types to be added without modifying its existing logic. Instead of modifying the base class, new report types can be introduced via subclassing.

**Example from Code:**
```javascript
export class MonitoringReport {
    #monitoringSystem;

    constructor(monitoringSystem) {
        if (new.target === MonitoringReport) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.#monitoringSystem = monitoringSystem;
    }

    generate() {
        throw new Error("Generate method must be implemented by subclasses.");
    }
}
```

#### Hypothetical Example That Breaks OCP
```javascript
class Discount {
    applyDiscount(customerType, price) {
        if (customerType === "VIP") {
            return price * 0.8;
        } else {
            return price * 0.9;
        }
    }
}
```
**Issue:** Adding new customer types requires modifying this class instead of extending it.

---

## Liskov Substitution Principle (LSP)

### Why It's a Good Application of OOP
The `MiningMachine` class is designed to allow different mining models to be extended while ensuring that they can be substituted without affecting system behavior.

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
        this.#hashRate = Number(hashRate) || 0;
        this.#temperature = temperature;
        this.#model = model;
        this.#status = status;
    }
}
```

#### Hypothetical Example That Breaks LSP
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
**Issue:** `Square` modifies `setWidth()` in a way that changes expected behavior.

---

## Interface Segregation Principle (ISP)

### Why It's a Good Application of OOP
The `Observer` class in ShuhanMiner ensures that observers only implement relevant notification methods, preventing clients from being forced to depend on methods they do not use.

**Example from Code:**
```javascript
export class Observer {
    receiveNotification(notification) {
        console.log("Notification received:", notification);
        throw new Error("Method 'update' must be implemented.");
    }
}
```

#### Hypothetical Example That Breaks ISP
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
**Issue:** The `Robot` class is forced to implement a method (`eat()`) it doesn't need.

---

## Dependency Inversion Principle (DIP)

### Why It's a Good Application of OOP
The `Observer` class adheres to DIP by ensuring that high-level modules depend on abstractions rather than concrete implementations.

**Example from Code:**
```javascript
export class Observer {
    receiveNotification(notification) {
        console.log("Notification received:", notification);
        throw new Error("Method 'update' must be implemented.");
    }
}
```

#### Hypothetical Example That Breaks DIP
```javascript
class FileLogger {
    log(message) {
        console.log(`Logging to file: ${message}`);
    }
}
class UserService {
    constructor() {
        this.logger = new FileLogger();
    }
    registerUser(username) {
        this.logger.log(`User ${username} registered`);
    }
}
```
**Issue:** `UserService` is tightly coupled to `FileLogger`, making it hard to switch to another logging mechanism.

By following SOLID principles correctly, ShuhanMiner ensures that its mining monitoring system is modular, scalable, and easy to maintain.

