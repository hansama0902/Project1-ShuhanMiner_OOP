/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the MonitoringReportFactory class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import  { MonitoringSystem } from "../MinerDesign_Code/MonitoringSystem.js";
import { MonitoringReportFactory } from "../MinerDesign_Code/MonitoringReportFactory.js";
import { FinancialReport } from "../MinerDesign_Code/FinancialReport.js";
import { PerformanceReport } from "../MinerDesign_Code/PerformanceReport.js";

describe("MonitoringReportFactory Tests", () => {
    let monitoringSystem;

    beforeEach(() => {
        monitoringSystem = new MonitoringSystem();
    });

    test("Should generate a FinancialReport instance", () => {
        const report = MonitoringReportFactory.generateReport("financial", monitoringSystem);
        expect(report).toBeInstanceOf(FinancialReport);
    });


    test("Should generate a PerformanceReport instance", () => {
        const report = MonitoringReportFactory.generateReport("performance", monitoringSystem);
        expect(report).toBeInstanceOf(PerformanceReport);
    });

 
    test("Should throw error for invalid report type", () => {
        expect(() => {
            MonitoringReportFactory.generateReport("invalidType", monitoringSystem);
        }).toThrow("Invalid report type: invalidType");
    });


    test("Should have correct factoryName property", () => {
        expect(MonitoringReportFactory.factoryName).toBe("Mining Report Factory");
    });
});
