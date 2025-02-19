/**
 * @class User
 * @description Represents a system user. Implements Observer to receive notifications.
 * 
 * Implements:
 * - **Single Responsibility Principle (SRP)**: User handles its own notifications.
 * - **Observer Pattern**: Acts as an observer that receives updates from `NotificationManager`.
 */
import { Observer } from "./Observer.js";
export class User extends Observer {
    #userId;
    #role;
    #notifications;

    /**
     * @constructor
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
     * Receives a notification.
     * @param {object} notification - The received notification.
     * @throws {Error} If the notification is invalid.
     */
    receiveNotification(notification) {
        if (!notification || typeof notification.content !== "string") {
            throw new Error("Invalid notification object. Expected { content: string }.");
        }
        this.#notifications.push(notification);
        console.log(`📩 User ${this.#userId} received notification: ${notification.content}`);
    }

    /**
     * Retrieves all notifications received by the user.
     * @returns {object[]} - List of notifications.
     */
    getNotifications() {
        return [...this.#notifications]; // 返回一个拷贝，防止外部修改
    }

    /**
     * Retrieves the user ID.
     * @returns {string} - The user ID.
     */
    getUserId() {
        return this.#userId;
    }

    /**
     * Retrieves the user role.
     * @returns {string} - The user role.
     */
    getRole() {
        return this.#role;
    }
}
