import { MonitoringReport } from './MonitoringReport.js';/**
 * @description Provides performance insights, including average hashrate.
 * Implements: Interface Segregation Principle, ISP
 */
export class PerformanceReport extends MonitoringReport {
    #averageHashrate;

    /**
     * @constructor
     * @param {MonitoringSystem} monitoringSystem - The monitoring system instance.
     */
    constructor(monitoringSystem) {
        super(monitoringSystem);
        this.#calculateMetrics();
    }

    /**
     * @private
     * @function calculateMetrics
     * Calculates performance metrics (average hashrate).
     */
    #calculateMetrics() {
        const machines = this.getMonitoringSystem().getMachines();
        this.#averageHashrate = machines.length
            ? (machines.reduce((sum, m) => sum + m.hashRate, 0) / machines.length).toFixed(2)
            : 0;
    }

    /**
     * @function generate
     * @returns {string} - The performance report.
     * Generates a performance report.
     */
    generate() {
        return `Performance Report:
- Average hashrate: ${this.#averageHashrate} TH/s
- Total machines: ${this.getMonitoringSystem().getMachines().length}`;
    }
}
