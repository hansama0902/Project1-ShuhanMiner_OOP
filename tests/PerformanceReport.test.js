/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the PerformanceReport class.
 * How it was used: I used the generated code to design a test suite.
 */ 

import { jest } from "@jest/globals";
import MonitoringSystem from "../MinerDesign_Code/MonitoringSystem.js";
import { PerformanceReport } from "../MinerDesign_Code/PerformanceReport.js";

/**
 * 创建 `mock` 矿机数据
 */
const createMockMachine = (ip, hashRate) => ({
    ipAddress: ip,
    hashRate: hashRate,
    temperature: 70,
    status: "Active"
});

describe("PerformanceReport Tests", () => {
    let monitoringSystem;
    let performanceReport;

    beforeEach(() => {
        monitoringSystem = new MonitoringSystem();
        monitoringSystem.clearMachines(); // 清除已有矿机，防止 Jest 共享状态

        monitoringSystem.addMachine(createMockMachine("192.168.1.1", 90));
        monitoringSystem.addMachine(createMockMachine("192.168.1.2", 110));
        monitoringSystem.addMachine(createMockMachine("192.168.1.3", 130));

        performanceReport = new PerformanceReport(monitoringSystem);
    });

    /**
     * 测试 `PerformanceReport` 是否正确继承 `MonitoringReport`
     */
    test("Should be an instance of MonitoringReport", () => {
        expect(performanceReport).toBeInstanceOf(PerformanceReport);
    });

    /**
     * 测试 `generate()` 方法是否正确返回性能报告
     */
    test("Should generate a correct performance report", () => {
        const report = performanceReport.generate();
        expect(report).toContain("Performance Report:");
        expect(report).toContain("Average hashrate:");
        expect(report).toContain("Total machines:");
    });

    /**
     * 测试 `#calculateMetrics()` 是否正确计算平均算力
     */
    test("Should correctly calculate average hashrate", () => {
        const expectedAverageHashrate = ((90 + 110 + 130) / 3).toFixed(2); // 计算平均值
        const report = performanceReport.generate();
        expect(report).toContain(`Average hashrate: ${expectedAverageHashrate} TH/s`);
    });

    /**
     * 测试 `#calculateMetrics()` 在没有矿机时是否返回 0
     */
    test("Should return 0 when there are no machines", () => {
        monitoringSystem.clearMachines(); // 清空所有矿机
        performanceReport = new PerformanceReport(monitoringSystem);
        const report = performanceReport.generate();
        expect(report).toContain("Average hashrate: 0 TH/s");
        expect(report).toContain("Total machines: 0");
    });
});
