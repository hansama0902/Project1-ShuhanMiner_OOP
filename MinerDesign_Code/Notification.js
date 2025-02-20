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
     * @function getNotificationDetails
     * @returns {object} - Notification details.
     * Retrieves notification details.
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
     * @function getUser
     * @returns {User|null} - The recipient user, or null if not assigned.
     * Retrieves the user who received the notification.
     */
    getUser() {
        return this.#user;
    }

    /**
     * @function getId
     * @returns {string} - The unique notification ID.
     * Retrieves the notification ID.
     */
    getId() {
        return this.#id;
    }

    /**
     * @function getContent
     * @returns {string} - The notification message.
     * Retrieves the notification content.
     */
    getContent() {
        return this.#content;
    }

    /**
     * @function getTimestamp
     * @returns {Date} - The timestamp of the notification.
     * Retrieves the notification timestamp.
     */
    getTimestamp() {
        return this.#timestamp;
    }
}
