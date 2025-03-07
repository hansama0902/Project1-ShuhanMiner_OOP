import { MonitoringReport } from './MonitoringReport.js';;
/**
 * @description Provides financial insights on mining operations.
 * @extends {MonitoringReport}
 */
export class FinancialReport extends MonitoringReport {
    #totalHashrate;
    #electricityCost;
    #revenue;
    /**
    * @param {MonitoringSystem} monitoringSystem - The monitoring system instance.
    */
    constructor(monitoringSystem) {
        super(monitoringSystem);
        this.#calculateMetrics();
    }


    /**
     * @function calculateMetrics
     * @private
     * @returns {void}
     * Calculates financial metrics (total hashrate, electricity cost, revenue).
     */
    #calculateMetrics() {
        const monitoringSystem = this.getMonitoringSystem();
        this.#totalHashrate = monitoringSystem.getMachines().reduce((sum, machine) => sum + machine.hashRate, 0);
        this.#electricityCost = monitoringSystem.getMachines().length * 0.1; // Simulated cost per machine
        this.#revenue = (this.#totalHashrate * 0.05) - this.#electricityCost; // Simulated revenue calculation
    }

    /**
     * @function generate
     * @returns {string} - The financial report.
     * Generates a financial report.
     */
    generate() {
        return `Financial Report:
- Total revenue: $${this.#revenue.toFixed(2)}
- Total hashrate: ${this.#totalHashrate} TH/s
- Electricity cost: $${this.#electricityCost.toFixed(2)}`;
    }
}
