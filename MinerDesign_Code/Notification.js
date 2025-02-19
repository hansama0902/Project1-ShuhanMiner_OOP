/**
 * @class Notification
 * @description Represents a system notification.
 * 
 * Implements:
 * - **Single Responsibility Principle (SRP)**: This class is solely responsible for holding notification data.
 * - **Observer Pattern**: Acts as a message object passed to observers.
 * 
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: Is My code ES2024 compliant?
 * id, content, timestamp, user should be private fields
 * In ES2024, it is recommended to use # to encapsulate private fields to prevent external direct modification of these properties.
 * Optimization: Change this.id → this.#id and provide getter method access
 * How it was used:I change code apply Es2024.
 * 
 */
export class Notification {
    #id;
    #content;
    #timestamp;
    #user;

    /**
     * @constructor
     * @param {string} id - Unique notification ID.
     * @param {string} content - Notification message.
     * @param {Date} timestamp - Notification timestamp.
     * @param {User} user - The recipient user (optional).
     */
    constructor(id, content, timestamp, user = null) {
        this.#id = id;
        this.#content = content;
        this.#timestamp = timestamp;
        this.#user = user;
    }

    /**
     * Retrieves notification details.
     * @returns {object} - Notification details.
     */
    getNotificationDetails() {
        return {
            id: this.#id,
            content: this.#content,
            timestamp: this.#timestamp,
            user: this.#user ? this.#user.getUserId() : null, // 确保 `userId` 可访问
        };
    }

    /**
     * Retrieves the user who received the notification.
     * @returns {User|null} - The recipient user, or null if not assigned.
     */
    getUser() {
        return this.#user;
    }

    /**
     * Retrieves the notification ID.
     * @returns {string} - The unique notification ID.
     */
    getId() {
        return this.#id;
    }

    /**
     * Retrieves the notification content.
     * @returns {string} - The notification message.
     */
    getContent() {
        return this.#content;
    }

    /**
     * Retrieves the notification timestamp.
     * @returns {Date} - The timestamp of the notification.
     */
    getTimestamp() {
        return this.#timestamp;
    }
}
