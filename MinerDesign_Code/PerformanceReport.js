/**
 * @class PerformanceReport
 * @description Provides performance insights, including average hashrate.
 * Implements: Interface Segregation Principle, ISP
 */
import MonitoringReport from './MonitoringReport.js';
export class PerformanceReport extends MonitoringReport {
    #averageHashrate;

    /**
     * @constructor
     * @param {import('./MonitoringSystem.js').default} monitoringSystem - The monitoring system instance.
     */
    constructor(monitoringSystem) {
        super(monitoringSystem);
        this.#calculateMetrics();
    }

    /**
     * Calculates performance metrics (average hashrate).
     * @private
     */
    #calculateMetrics() {
        const machines = this.getMonitoringSystem().getMachines();
        this.#averageHashrate = machines.length
            ? (machines.reduce((sum, m) => sum + m.hashRate, 0) / machines.length).toFixed(2)
            : 0;
    }

    /**
     * Generates a performance report.
     * @returns {string} - The performance report.
     */
    generate() {
        return `Performance Report:
- Average hashrate: ${this.#averageHashrate} TH/s
- Total machines: ${this.getMonitoringSystem().getMachines().length}`;
    }
}
