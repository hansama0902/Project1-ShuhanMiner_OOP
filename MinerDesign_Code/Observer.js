/**
 * @description Defines the contract for objects that observe notifications.
 * 
 * Implements:
 * - **Dependency Inversion Principle (DIP)**: High-level modules depend on abstractions, not concrete classes.
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: I asked Chat 4o how to design a piece of code to comply with DIP
 * export class IMonitoringSystem {
 * getMachines() {
 *     throw new Error("Method 'getMachines()' must be implemented.");
 * }
 * getFaultType() {
 *  throw new Error("Method 'getFaultType()' must be implemented.");
 *  }
 * }
 * How it was used:I designed an interface based on the code above as a reference.
 * 
 */


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
