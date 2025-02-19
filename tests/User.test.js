/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the User class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import { User } from "../MinerDesign_Code/User.js";


const createMockNotification = (content) => ({
    content: content,
    timestamp: new Date()
});

describe("User Class Tests", () => {
    let user;
    let mockNotification1, mockNotification2;

    beforeEach(() => {
        user = new User("user123", "Admin");
        mockNotification1 = createMockNotification("System Update Available");
        mockNotification2 = createMockNotification("Temperature Alert: Machine Overheating");
    });

    test("Should store correct user ID and role", () => {
        expect(user.getUserId()).toBe("user123");
        expect(user.getRole()).toBe("Admin");
    });

    test("Should receive notifications and store them", () => {
        user.receiveNotification(mockNotification1);
        user.receiveNotification(mockNotification2);

        expect(user.getNotifications().length).toBe(2);
        expect(user.getNotifications()[0]).toEqual(mockNotification1);
        expect(user.getNotifications()[1]).toEqual(mockNotification2);
    });

    test("Should return a copy of notifications", () => {
        user.receiveNotification(mockNotification1);
        const notifications = user.getNotifications();
        notifications.push({ content: "Fake Alert" });

        expect(user.getNotifications().length).toBe(1); 
    });

  
    test("Should throw error if notification is invalid", () => {
        expect(() => {
            user.receiveNotification(null);
        }).toThrow("Invalid notification object. Expected { content: string }.");

        expect(() => {
            user.receiveNotification({});
        }).toThrow("Invalid notification object. Expected { content: string }.");

        expect(() => {
            user.receiveNotification({ content: 123 });
        }).toThrow("Invalid notification object. Expected { content: string }.");
    });

 
    test("Should log received notifications", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        user.receiveNotification(mockNotification1);
        expect(consoleSpy).toHaveBeenCalledWith("User user123 received notification: System Update Available");

        user.receiveNotification(mockNotification2);
        expect(consoleSpy).toHaveBeenCalledWith("User user123 received notification: Temperature Alert: Machine Overheating");

        consoleSpy.mockRestore();
    });
});
