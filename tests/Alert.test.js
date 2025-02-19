/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the Alert class.
 * How it was used: I used the generated code to design a test suite for class.
 */ 
import { jest } from "@jest/globals";
import Alert from "../MinerDesign_Code/Alert.js";
import { User } from "../MinerDesign_Code/User.js";

describe("Alert Class Tests", () => {
    let alert;
    let mockUser1, mockUser2;
    let mockTimestamp;

    beforeEach(() => {
        mockTimestamp = new Date("2025-02-18T12:00:00Z");

        // 创建两个 mock 用户
        mockUser1 = new User("user1", "admin");
        mockUser2 = new User("user2", "engineer");

        // Mock 用户 `receiveNotification` 方法
        jest.spyOn(mockUser1, "receiveNotification");
        jest.spyOn(mockUser2, "receiveNotification");

        // 创建 `Alert` 实例
        alert = new Alert("Temperature", "Critical", mockTimestamp, "MiningMachine");
    });

    /**
     * 测试 `Alert` 是否正确初始化
     */
    test("Should initialize with correct properties", () => {
        const details = alert.retrieveDetails();
        expect(details.type).toBe("Temperature");
        expect(details.level).toBe("Critical");
        expect(details.timestamp).toEqual(mockTimestamp);
        expect(details.triggeredBy).toBe("MiningMachine");
        expect(details.notifiedUsers).toEqual([]); // 初始通知用户应为空
    });

    /**
     * 测试 `trigger()` 方法是否调用 `notifyUsers()`
     */
    test("Should trigger the alert and notify users", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        alert.trigger([mockUser1, mockUser2]);

        // 确保 `console.log` 触发了正确的警报信息
        expect(consoleSpy).toHaveBeenCalledWith("Alert Triggered: Temperature - Level: Critical");

        consoleSpy.mockRestore();
    });

    /**
     * 测试 `notifyUsers()` 是否正确通知用户
     */
    test("Should notify users and update the notified list", () => {
        alert.notifyUsers([mockUser1, mockUser2]);

        // 确保 `receiveNotification()` 收到正确的 `notification` 对象
        expect(mockUser1.receiveNotification).toHaveBeenCalledWith(
            expect.objectContaining({ 
                content: "Alert: Temperature - Level: Critical",
                timestamp: mockTimestamp
            })
        );
        expect(mockUser2.receiveNotification).toHaveBeenCalledWith(
            expect.objectContaining({ 
                content: "Alert: Temperature - Level: Critical",
                timestamp: mockTimestamp
            })
        );

        // 确保 `#notifiedUsers` 里正确存储了用户
        const details = alert.retrieveDetails();
        expect(details.notifiedUsers).toContain(mockUser1.getUserId());
        expect(details.notifiedUsers).toContain(mockUser2.getUserId());
    });

    /**
     * 测试 `retrieveDetails()` 方法是否正确返回警报详情
     */
    test("Should return correct alert details", () => {
        alert.notifyUsers([mockUser1]);
        const details = alert.retrieveDetails();

        expect(details).toEqual({
            type: "Temperature",
            level: "Critical",
            timestamp: mockTimestamp,
            triggeredBy: "MiningMachine",
            notifiedUsers: [mockUser1.getUserId()], // 确保 `User.getUserId()` 被调用
        });
    });

    /**
     * 测试 `notifyUsers()` 方法是否只接受 `User` 实例
     */
    test("Should not notify invalid users", () => {
        const invalidUser = { userId: "fakeUser", receiveNotification: jest.fn() };
        alert.notifyUsers([mockUser1, invalidUser]);

        // **确保 `mockUser1` 被正确通知**
        expect(mockUser1.receiveNotification).toHaveBeenCalledWith(
            expect.objectContaining({ 
                content: "Alert: Temperature - Level: Critical",
                timestamp: mockTimestamp
            })
        );
        expect(alert.retrieveDetails().notifiedUsers).toContain(mockUser1.getUserId());

        // `invalidUser` 不是 `User` 实例，不应被通知
        expect(invalidUser.receiveNotification).not.toHaveBeenCalled();
        expect(alert.retrieveDetails().notifiedUsers).not.toContain("fakeUser");
    });
});



