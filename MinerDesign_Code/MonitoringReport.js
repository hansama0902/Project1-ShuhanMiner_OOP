/**
 * @class MonitoringReport
 * @description Abstract class for generating mining reports.
 * 
 * Implements:
 * - **Encapsulation**: Uses private fields for data protection.
 * - **Open-Closed Principle**: Allows extension for new report types.
 */
export class MonitoringReport {
    #monitoringSystem;

    /**
     * @constructor
     * @param {MonitoringSystem}} monitoringSystem - The monitoring system instance.
     */
    constructor(monitoringSystem) {
        if (new.target === MonitoringReport) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.#monitoringSystem = monitoringSystem;
    }

    /**
     * Generates a report. Must be implemented by subclasses.
     * @returns {string}
     */
    generate() {
        throw new Error("Generate method must be implemented by subclasses.");
    }

    /**
    * Retrieves the monitoring system instance.
    * @returns {MonitoringSystem} - The monitoring system instance.
    */
    getMonitoringSystem() {
        return this.#monitoringSystem;
    }
}

