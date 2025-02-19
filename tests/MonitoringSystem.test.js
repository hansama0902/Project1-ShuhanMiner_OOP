/**
 * AI Usage:
 * Model: ChatGPT 4o
 * Prompts: 
 * Help me design a test suite for the MonitoringSystem class.
 * How it was used: I used the generated code to design a test suite for the MonitoringSystem class.
 */ 
import { jest } from "@jest/globals";
import MonitoringSystem from '../MinerDesign_Code/MonitoringSystem.js';

describe("MonitoringSystem Tests", () => {
    let monitoringSystem;
    let machine1, machine2, machine3;

    beforeEach(() => {
        monitoringSystem = new MonitoringSystem();
        machine1 = { ipAddress: "192.168.1.1", temperature: 75, status: "Active", hashRate: 100 };
        machine2 = { ipAddress: "192.168.1.2", temperature: 85, status: "Active", hashRate: 120 };
        machine3 = { ipAddress: "192.168.1.3", temperature: 90, status: "Failed", hashRate: 110 };
        
        monitoringSystem.addMachine(machine1);
        monitoringSystem.addMachine(machine2);
        monitoringSystem.addMachine(machine3);
    });

    test("Should enforce Singleton pattern", () => {
        const anotherInstance = new MonitoringSystem();
        expect(anotherInstance).toBe(monitoringSystem); // Both instances should be the same
    });

    test("Should add mining machines without duplicates", () => {
        monitoringSystem.addMachine(machine1);
        expect(monitoringSystem.getMiningMachines().length).toBe(3); 
    });
    
    test("Should detect overheated machines", () => {
        monitoringSystem.monitorTemperature();
        expect(monitoringSystem.getOverheatedMachines().length).toBe(2); 
    });

    test("Should update firmware when new version is provided", () => {
        console.log = jest.fn(); // Mock console.log
        monitoringSystem.firmwareUpdate("v1.1.0");
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Updating firmware to version v1.1.0"));
    });

    test("Should not update firmware if version is the same", () => {
        console.log = jest.fn(); // Mock console.log
        monitoringSystem.firmwareUpdate("v1.0.0");
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Firmware is already up-to-date"));
    });

    test("Should not update firmware if version is invalid", () => {
        console.error = jest.fn(); // Mock console.error
        monitoringSystem.firmwareUpdate("");
        expect(console.error).toHaveBeenCalledWith("Invalid firmware version provided.");
    });
});
