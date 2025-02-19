/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the User class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import { User } from "../MinerDesign_Code/User.js";

/**
 * 创建 `mock` 通知对象
 */
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

    /**
     * 测试 `User` 是否正确存储用户 ID 和角色
     */
    test("Should store correct user ID and role", () => {
        expect(user.getUserId()).toBe("user123");
        expect(user.getRole()).toBe("Admin");
    });

    /**
     * 测试 `receiveNotification()` 是否正确存储通知
     */
    test("Should receive notifications and store them", () => {
        user.receiveNotification(mockNotification1);
        user.receiveNotification(mockNotification2);

        expect(user.getNotifications().length).toBe(2);
        expect(user.getNotifications()[0]).toEqual(mockNotification1);
        expect(user.getNotifications()[1]).toEqual(mockNotification2);
    });

    /**
     * 测试 `getNotifications()` 是否返回通知的拷贝
     */
    test("Should return a copy of notifications", () => {
        user.receiveNotification(mockNotification1);
        const notifications = user.getNotifications();
        notifications.push({ content: "Fake Alert" });

        expect(user.getNotifications().length).toBe(1); // `user.notifications` 不应被外部修改
    });

    /**
     * 测试 `receiveNotification()` 方法是否正确抛出错误
     */
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

    /**
     * 测试 `receiveNotification()` 方法是否正确输出日志
     */
    test("Should log received notifications", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        user.receiveNotification(mockNotification1);
        expect(consoleSpy).toHaveBeenCalledWith("📩 User user123 received notification: System Update Available");

        user.receiveNotification(mockNotification2);
        expect(consoleSpy).toHaveBeenCalledWith("📩 User user123 received notification: Temperature Alert: Machine Overheating");

        consoleSpy.mockRestore();
    });
});
