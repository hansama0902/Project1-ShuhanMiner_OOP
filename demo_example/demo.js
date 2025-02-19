import { MonitoringSystem } from "../MinerDesign_Code/MonitoringSystem.js";
import { MiningMachine } from "../MinerDesign_Code/MiningMachine.js";
import { ElectricityPricing } from "../MinerDesign_Code/ElectricityPricing.js";
import { FinancialReport } from "../MinerDesign_Code/FinancialReport.js";
import { PerformanceReport } from "../MinerDesign_Code/PerformanceReport.js";
import { MonitoringReportFactory } from "../MinerDesign_Code/MonitoringReportFactory.js";
import { User } from "../MinerDesign_Code/User.js";
import { Alert } from "../MinerDesign_Code/Alert.js";

// (Initialize Monitoring System)**
const monitoringSystem = new MonitoringSystem();

// *(Add Mining Machines)**
const miner1 = new MiningMachine("192.168.1.101", 85, 90, "Antminer S19", "Active", false);
const miner2 = new MiningMachine("192.168.1.102", 90, 80, "Whatsminer M30S", "Active", false);

monitoringSystem.addMachine(miner1);
monitoringSystem.addMachine(miner2);

console.log(" (Mining machines added successfully)");

// (Monitor Mining Machine Temperature)**
monitoringSystem.monitorTemperature();

//  (Initialize Electricity Pricing Monitoring)**
const electricityPricing = new ElectricityPricing(0.12, 0.15);
electricityPricing.monitorFluctuations(0.16, []); 

//  (Generate Financial Report)**
const financialReport = new FinancialReport(monitoringSystem);
console.log(financialReport.generate());

//  (Generate Performance Report)**
const performanceReport = new PerformanceReport(monitoringSystem);
console.log(performanceReport.generate());

// (Generate Reports Using Factory Pattern)**
const report1 = MonitoringReportFactory.generateReport("financial", monitoringSystem);
console.log(report1.generate());

const report2 = MonitoringReportFactory.generateReport("performance", monitoringSystem);
console.log(report2.generate());

// (Create Users and Send Alerts)**
const user1 = new User("user1", "admin");
const user2 = new User("user2", "engineer");

const alert = new Alert("Temperature", "Critical", new Date(), "MiningMachine");
alert.trigger([user1, user2]);

// (Restart Mining Machines)**
miner1.restart();
miner2.restart();

console.log(" Demo completed successfully!");
