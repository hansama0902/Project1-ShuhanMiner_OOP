/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the FinancialReport class.
 * How it was used: I used the generated code to design a test suite for class.
 */ 

import { jest } from "@jest/globals";
import { MonitoringSystem} from "../MinerDesign_Code/MonitoringSystem.js";
import { FinancialReport } from "../MinerDesign_Code/FinancialReport.js";

/**
 * 创建 `mock` 矿机数据
 */
const createMockMachine = (ip, hashRate) => ({
    ipAddress: ip,
    hashRate: hashRate,
    temperature: 70,
    status: "Active"
});

describe("FinancialReport Tests", () => {
    let monitoringSystem;
    let financialReport;

    beforeEach(() => {
        monitoringSystem = new MonitoringSystem();
        
        // 添加 3 台矿机
        monitoringSystem.addMachine(createMockMachine("192.168.1.1", 100));
        monitoringSystem.addMachine(createMockMachine("192.168.1.2", 120));
        monitoringSystem.addMachine(createMockMachine("192.168.1.3", 150));

        financialReport = new FinancialReport(monitoringSystem);
    });

    /**
     * 测试 `FinancialReport` 是否正确继承 `MonitoringReport`
     */
    test("Should be an instance of MonitoringReport", () => {
        expect(financialReport).toBeInstanceOf(FinancialReport);
    });

    /**
     * 测试 `generate()` 方法是否正确返回财务报告
     */
    test("Should generate a correct financial report", () => {
        const report = financialReport.generate();
        expect(report).toContain("Financial Report:");
        expect(report).toContain("Total revenue: $");
        expect(report).toContain("Total hashrate:");
        expect(report).toContain("Electricity cost:");
    });

    /**
     * 测试 `#calculateMetrics()` 是否正确计算总算力
     */
    test("Should correctly calculate total hashrate", () => {
        const expectedHashrate = 100 + 120 + 150; // 计算所有矿机的总算力
        const report = financialReport.generate();
        expect(report).toContain(`Total hashrate: ${expectedHashrate} TH/s`);
    });

    /**
     * 测试 `#calculateMetrics()` 是否正确计算电力成本
     */
    test("Should correctly calculate electricity cost", () => {
        const expectedCost = 3 * 0.1; // 3 台矿机，每台 0.1 美元电费
        const report = financialReport.generate();
        expect(report).toContain(`Electricity cost: $${expectedCost.toFixed(2)}`);
    });

    /**
     * 测试 `#calculateMetrics()` 是否正确计算收益
     */
    test("Should correctly calculate revenue", () => {
        const totalHashrate = 100 + 120 + 150;
        const expectedRevenue = (totalHashrate * 0.05) - (3 * 0.1);
        const report = financialReport.generate();
        expect(report).toContain(`Total revenue: $${expectedRevenue.toFixed(2)}`);
    });
});
