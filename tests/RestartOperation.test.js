/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the RestartOperation class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import RestartOperation from "../MinerDesign_Code/RestartOperation.js";

/**
 * 创建 `mock` 矿机对象
 */
const createMockMachine = (name, shouldSucceed = true) => ({
    name,
    restart: jest.fn(() => Promise.resolve(shouldSucceed)) // 模拟 `restart()` 方法
});

describe("RestartOperation Tests", () => {
    let restartOperation;
    let mockMachines;

    beforeEach(() => {
        // 创建 3 台矿机，其中 2 台成功，1 台失败
        mockMachines = [
            createMockMachine("Machine 1", true),
            createMockMachine("Machine 2", true),
            createMockMachine("Machine 3", false) // 失败的矿机
        ];

        restartOperation = new RestartOperation(mockMachines);
    });

    /**
     * 测试 `RestartOperation` 是否正确初始化
     */
    test("Should initialize with default values", () => {
        expect(restartOperation.provideFeedback()).toContain("Restart completed at N/A");
        expect(restartOperation.provideFeedback()).toContain("Successful: 0");
        expect(restartOperation.provideFeedback()).toContain("Failed: 0");
        expect(restartOperation.provideFeedback()).toContain("Duration: 0.00 seconds");
    });

    /**
     * 测试 `selectMachines()` 方法
     */
    test("Should update the list of selected machines", () => {
        const newMachines = [
            createMockMachine("New Machine 1", true),
            createMockMachine("New Machine 2", false)
        ];
        restartOperation.selectMachines(newMachines);

        expect(restartOperation.provideFeedback()).toContain("Successful: 0");
        expect(restartOperation.provideFeedback()).toContain("Failed: 0");
    });

    /**
     * 测试 `executeRestart()` 方法
     */
    test("Should execute restart and track success/failure counts", async () => {
        await restartOperation.executeRestart();

        // 检查成功和失败的矿机数
        expect(mockMachines[0].restart).toHaveBeenCalled();
        expect(mockMachines[1].restart).toHaveBeenCalled();
        expect(mockMachines[2].restart).toHaveBeenCalled();

        expect(restartOperation.provideFeedback()).toContain("Successful: 2");
        expect(restartOperation.provideFeedback()).toContain("Failed: 1");
    });

    /**
     * 测试 `provideFeedback()` 方法
     */
    test("Should provide correct feedback after restart", async () => {
        await restartOperation.executeRestart();
        const feedback = restartOperation.provideFeedback();

        expect(feedback).toContain("Restart completed at"); // 确保有时间戳
        expect(feedback).toContain("Successful: 2");
        expect(feedback).toContain("Failed: 1");
        expect(feedback).toMatch(/Duration: \d+\.\d{2} seconds/); // 检查格式是否正确
    });

    /**
     * 测试 `formatDate()` 方法
     */
    test("Should format date correctly", () => {
        const testDate = new Date("2025-02-18T12:34:56Z");
        expect(RestartOperation.formatDate(testDate)).toContain("2/18/2025"); // 确保时间格式正确
    });
});
