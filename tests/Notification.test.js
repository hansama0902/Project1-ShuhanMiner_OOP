/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the Notification class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import { Notification } from "../MinerDesign_Code/Notification.js";
import { User } from "../MinerDesign_Code/User.js";

describe("Notification Class Tests", () => {
    let notification;
    let mockUser;
    let mockTimestamp;

    beforeEach(() => {
        mockTimestamp = new Date("2025-02-18T12:00:00Z");
        mockUser = new User("user1", "admin");

        notification = new Notification("notif-123", "System Update Available", mockTimestamp, mockUser);
    });

    test("Should initialize with correct properties", () => {
        expect(notification.getId()).toBe("notif-123");
        expect(notification.getContent()).toBe("System Update Available");
        expect(notification.getTimestamp()).toEqual(mockTimestamp);
        expect(notification.getUser()).toBe(mockUser);
    });

   
    test("Should return correct notification details", () => {
        const details = notification.getNotificationDetails();
        expect(details).toEqual({
            id: "notif-123",
            content: "System Update Available",
            timestamp: mockTimestamp,
            user: mockUser.getUserId(),
        });
    });

  
    test("Should return the assigned user", () => {
        expect(notification.getUser()).toBe(mockUser);
    });

  
    test("Should return null if no user is assigned", () => {
        const notifWithoutUser = new Notification("notif-456", "No user assigned", new Date());
        expect(notifWithoutUser.getUser()).toBeNull();
    });
});
