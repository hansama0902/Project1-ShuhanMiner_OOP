/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the MonitoringReportFactory class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import  MonitoringSystem from "../MinerDesign_Code/MonitoringSystem.js";
import { MonitoringReportFactory } from "../MinerDesign_Code/MonitoringReportFactory.js";
import { FinancialReport } from "../MinerDesign_Code/FinancialReport.js";
import { PerformanceReport } from "../MinerDesign_Code/PerformanceReport.js";

describe("MonitoringReportFactory Tests", () => {
    let monitoringSystem;

    beforeEach(() => {
        monitoringSystem = new MonitoringSystem();
    });

    /**
     * 测试 `MonitoringReportFactory` 是否正确创建 `FinancialReport`
     */
    test("Should generate a FinancialReport instance", () => {
        const report = MonitoringReportFactory.generateReport("financial", monitoringSystem);
        expect(report).toBeInstanceOf(FinancialReport);
    });

    /**
     * 测试 `MonitoringReportFactory` 是否正确创建 `PerformanceReport`
     */
    test("Should generate a PerformanceReport instance", () => {
        const report = MonitoringReportFactory.generateReport("performance", monitoringSystem);
        expect(report).toBeInstanceOf(PerformanceReport);
    });

    /**
     * 测试 `generateReport()` 方法是否对无效的类型抛出错误
     */
    test("Should throw error for invalid report type", () => {
        expect(() => {
            MonitoringReportFactory.generateReport("invalidType", monitoringSystem);
        }).toThrow("Invalid report type: invalidType");
    });

    /**
     * 测试 `factoryName` 静态属性是否正确设置
     */
    test("Should have correct factoryName property", () => {
        expect(MonitoringReportFactory.factoryName).toBe("Mining Report Factory");
    });
});
