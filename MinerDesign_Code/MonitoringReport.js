/**
 * @description Abstract class for generating mining reports.
 * 
 * Implements:
 * - **Encapsulation**: Uses private fields for data protection.
 * - **Open-Closed Principle**: Allows extension for new report types.
 */
export class MonitoringReport {
    #monitoringSystem;

    /**
     * @param {MonitoringSystem} monitoringSystem - The monitoring system instance.
     */
    constructor(monitoringSystem) {
        if (new.target === MonitoringReport) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.#monitoringSystem = monitoringSystem;
    }

    /**
     * @function generate
     * @returns {string}
     * Generates a report. Must be implemented by subclasses.
     */
    generate() {
        throw new Error("Generate method must be implemented by subclasses.");
    }

    /**
    * @function getMonitoringSystem
    * @returns {MonitoringSystem} - The monitoring system instance.
    *  Retrieves the monitoring system instance.
    */
    getMonitoringSystem() {
        return this.#monitoringSystem;
    }
}

