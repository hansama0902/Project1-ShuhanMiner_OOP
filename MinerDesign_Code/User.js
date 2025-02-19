import { Observer } from "./Observer.js";

/**
 * @class User
 * @description Represents a system user. Implements Observer to receive notifications.
 * 
 * Implements:
 * - **Single Responsibility Principle (SRP)**: User handles its own notifications.
 * - **Observer Pattern**: Acts as an observer that receives updates from `NotificationManager`.
 */
export class User extends Observer {
    /**
     * @constructor
     * @param {string} userId - Unique user ID.
     * @param {string} role - User role (e.g., Admin, Operator).
     */
    constructor(userId, role) {
        super();
        this.userId = userId;
        this.role = role;
        this.notifications = []; // Stores received notifications
    }

    /**
     * Receives a notification.
     * @param {Notification} notification - The received notification.
     */
    receiveNotification(notification) {
        this.notifications.push(notification);
        console.log(`📩 User ${this.userId} received notification: ${notification.content}`);
    }

    /**
     * Retrieves all notifications received by the user.
     * @returns {Notification[]} - List of notifications.
     */
    getNotifications() {
        return [...this.notifications];
    }
}
