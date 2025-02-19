/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the MonitoringReport class.
 * How it was used: I used the generated code to design a test suite.
 */ 
import { jest } from "@jest/globals";
import { MonitoringSystem } from "../MinerDesign_Code/MonitoringSystem.js";
import { MonitoringReport } from "../MinerDesign_Code/MonitoringReport.js";

/**
 * Mock class extending MonitoringReport to allow instantiation.
 */
class MockMonitoringReport extends MonitoringReport {
    generate() {
        return "Mock report generated successfully.";
    }
}

describe("MonitoringReport Tests", () => {
    let monitoringSystem;
    let report;

    beforeEach(() => {
        monitoringSystem = new MonitoringSystem();
        report = new MockMonitoringReport(monitoringSystem);
    });

    test("Should throw error when instantiating abstract class", () => {
        expect(() => new MonitoringReport(monitoringSystem)).toThrow(
            "Cannot instantiate an abstract class."
        );
    });

    test("Should throw error when generate() is not implemented", () => {
        class IncompleteReport extends MonitoringReport {}
        const incompleteReport = new IncompleteReport(monitoringSystem);

        expect(() => incompleteReport.generate()).toThrow(
            "Generate method must be implemented by subclasses."
        );
    });

    test("Should allow subclass to implement generate() method", () => {
        expect(report.generate()).toBe("Mock report generated successfully.");
    });

    test("Should return the monitoring system instance", () => {
        expect(report.getMonitoringSystem()).toBe(monitoringSystem);
    });
});
