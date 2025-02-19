
/**
 * @class Alert
 * @description Represents an alert triggered by a mining machine or electricity pricing.
 * 
 * Implements:
 * - **Encapsulation**: Uses private fields for data protection.
 */
import { User } from "./User.js";
export default class Alert {
    #alertType;
    #alertLevel;
    #timestamp;
    #triggeredBy;
    #notifiedUsers;

    /**
     * @constructor
     * @param {string} alertType - Type of alert (e.g., "Temperature", "Electricity").
     * @param {string} alertLevel - Severity of alert (e.g., "High", "Critical").
     * @param {Date} timestamp - Time when the alert was triggered.
     * @param {string} triggeredBy - The entity that triggered the alert (MiningMachine or ElectricityPricing).
     */
    constructor(alertType, alertLevel, timestamp, triggeredBy) {
        this.#alertType = alertType;
        this.#alertLevel = alertLevel;
        this.#timestamp = timestamp;
        this.#triggeredBy = triggeredBy;
        this.#notifiedUsers = [];
    }

    /**
     * Triggers the alert and notifies all subscribed users.
     * @param {User[]} users - List of users to notify.
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
     * Notifies users about the alert.
     * @param {User[]} users - Users to be notified.
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
    

    /**
     * Retrieves alert details.
     * @returns {object} - Alert details.
     */
    retrieveDetails() {
        return {
            type: this.#alertType,
            level: this.#alertLevel,
            timestamp: this.#timestamp,
            triggeredBy: this.#triggeredBy,
            notifiedUsers: [...this.#notifiedUsers], 
        };
    }
    
}
