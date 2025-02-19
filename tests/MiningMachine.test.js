/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the MiningMachine class.
 * How it was used: I used the generated code to design a test suite for the MiningMachine class.
 */ 
import { jest } from "@jest/globals";
import { MiningMachine} from "../MinerDesign_Code/MiningMachine.js";

describe("MiningMachine Class", () => {
    let miningMachine;

    beforeEach(() => {
        miningMachine = new MiningMachine("192.168.1.100", 50, 70, "Antminer S19", "Operational", false);
    });

    /** ✅ 1. 测试构造函数 */
    test("should initialize with correct properties", () => {
        expect(miningMachine.monitorStatus()).toContain("Machine Antminer S19 at 192.168.1.100 is currently Operational");
        expect(miningMachine.monitorStatus()).toContain("Hashrate: 50 TH/s");
        expect(miningMachine.monitorStatus()).toContain("Temperature: 70°C");
    });

    /** ✅ 2. 测试 monitorStatus() 方法 */
    test("should return correct status report", () => {
        const statusReport = miningMachine.monitorStatus();
        expect(statusReport).toContain("Antminer S19");
        expect(statusReport).toContain("Operational");
        expect(statusReport).toContain("50 TH/s");
    });

    /** ✅ 3. 测试异步 restart() 方法 */
    test("should restart successfully", async () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.9); // 90% 成功率
        await expect(miningMachine.restart()).resolves.toBe(true);
        expect(miningMachine.monitorStatus()).toContain("Operational");

        global.Math.random.mockRestore();
    });

    test("should fail restart", async () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.05); // 10% 失败率
        await expect(miningMachine.restart()).resolves.toBe(false);
        expect(miningMachine.monitorStatus()).toContain("Failed");

        global.Math.random.mockRestore();
    });

    /** ✅ 4. 测试高温警报 checkTemperature() */
    test("should trigger high temperature alert", () => {
        miningMachine = new MiningMachine("192.168.1.100", 50, 85, "Antminer S19", "Operational", false);
        miningMachine.checkTemperature();
        expect(miningMachine.monitorStatus()).toContain("High temperature alert");
    });

    /** ✅ 5. 测试 addAlert() */
    test("should store alerts correctly", () => {
        miningMachine.addAlert("Test Alert 1");
        miningMachine.addAlert("Test Alert 2");

        expect(miningMachine.monitorStatus()).toContain("Test Alert 1");
        expect(miningMachine.monitorStatus()).toContain("Test Alert 2");
    });
});
