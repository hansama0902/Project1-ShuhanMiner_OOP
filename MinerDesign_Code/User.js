import { Observer } from "./Observer.js";
/**
 * @description Represents a system user. Implements Observer to receive notifications.
 * Implements:
 * - **Single Responsibility Principle (SRP)**: User handles its own notifications.
 * - **Observer Pattern**: Acts as an observer that receives updates from `NotificationManager`.
 */
export class User extends Observer {
    #userId;
    #role;
    #notifications;

    /**
     * @param {string} userId - Unique user ID.
     * @param {string} role - User role (e.g., Admin, Operator).
     */
    constructor(userId, role) {
        super();
        this.#userId = userId;
        this.#role = role;
        this.#notifications = [];
    }

    /**
     * @function receiveNotification
     * @param {Notification} notification - The received notification.
     * @throws {Error} If the notification is invalid.
     * Receives a notification.
     */
    receiveNotification(notification) {
        if (!notification || typeof notification.content !== "string") {
            throw new Error("Invalid notification object. Expected { content: string }.");
        }
        this.#notifications.push(notification);
        console.log(`User ${this.#userId} received notification: ${notification.content}`);
    }

    /**
     * @function getNotifications
     * @returns {Notification[]} - List of notifications.
     * Retrieves all notifications received by the user.
     */
    getNotifications() {
        return [...this.#notifications]; 
    }

    /**
     * @function  getUserId
     * @returns {string} - The user ID.
     * Retrieves the user ID.
     */
    getUserId() {
        return this.#userId;
    }

    /**
     * @function getRole
     * @returns {string} - The user role.
     * Retrieves the user role.
     */
    getRole() {
        return this.#role;
    }
}
