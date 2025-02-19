import FinancialReport from "./FinancialReport.js";
import PerformanceReport from "./PerformanceReport.js";
/**
 * @class MonitoringReportFactory
 * @description Factory for generating different types of monitoring reports.
 */
export class MonitoringReportFactory {
    static factoryName = "Mining Report Factory"; // Custom factory property

    /**
     * Generates a specific type of monitoring report.
     * @param {string} type - The type of report ("financial", "performance", "maintenance").
     * @param {import('./MonitoringSystem.js').default} monitoringSystem - The monitoring system instance.
     * @returns {MonitoringReport} - A new report instance.
     * @throws {Error} If an invalid report type is provided.
     */
    static generateReport(type, monitoringSystem) {
        switch (type.toLowerCase()) {
            case "financial":
                return new FinancialReport(monitoringSystem);
            case "performance":
                return new PerformanceReport(monitoringSystem);
            default:
                throw new Error(`Invalid report type: ${type}`);
        }
    }
}

