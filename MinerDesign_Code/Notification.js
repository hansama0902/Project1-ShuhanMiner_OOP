/**
 * @class Notification
 * @description Represents a system notification.
 * 
 * Implements:
 * - **Single Responsibility Principle (SRP)**: This class is solely responsible for holding notification data.
 * - **Observer Pattern**: Acts as a message object passed to observers.
 */
export class Notification {
    /**
     * @constructor
     * @param {string} id - Unique notification ID.
     * @param {string} content - Notification message.
     * @param {Date} timestamp - Notification timestamp.
     * @param {User} user - The recipient user (optional).
     */
    constructor(id, content, timestamp, user) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.user = user;
    }

    /**
     * Retrieves notification details.
     * @returns {object} - Notification details.
     */
    sendNotification() {
        return {
            id: this.id,
            content: this.content,
            timestamp: this.timestamp,
            user: this.user ? this.user.userId : null,
        };
    }
}
