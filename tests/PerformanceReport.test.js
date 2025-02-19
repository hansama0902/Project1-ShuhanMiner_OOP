/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the PerformanceReport class.
 * How it was used: I used the generated code to design a test suite.
 */ 

import { jest } from "@jest/globals";
import { MonitoringSystem } from "../MinerDesign_Code/MonitoringSystem.js";
import { PerformanceReport } from "../MinerDesign_Code/PerformanceReport.js";


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
        monitoringSystem.clearMachines(); 

        monitoringSystem.addMachine(createMockMachine("192.168.1.1", 90));
        monitoringSystem.addMachine(createMockMachine("192.168.1.2", 110));
        monitoringSystem.addMachine(createMockMachine("192.168.1.3", 130));

        performanceReport = new PerformanceReport(monitoringSystem);
    });

    
    test("Should be an instance of MonitoringReport", () => {
        expect(performanceReport).toBeInstanceOf(PerformanceReport);
    });

  
    test("Should generate a correct performance report", () => {
        const report = performanceReport.generate();
        expect(report).toContain("Performance Report:");
        expect(report).toContain("Average hashrate:");
        expect(report).toContain("Total machines:");
    });

    
    test("Should correctly calculate average hashrate", () => {
        const expectedAverageHashrate = ((90 + 110 + 130) / 3).toFixed(2); 
        const report = performanceReport.generate();
        expect(report).toContain(`Average hashrate: ${expectedAverageHashrate} TH/s`);
    });

    test("Should return 0 when there are no machines", () => {
        monitoringSystem.clearMachines(); 
        performanceReport = new PerformanceReport(monitoringSystem);
        const report = performanceReport.generate();
        expect(report).toContain("Average hashrate: 0 TH/s");
        expect(report).toContain("Total machines: 0");
    });
});
