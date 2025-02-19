import MonitoringSystem from "../MinerDesign_Code/MonitoringSystem.js";
import MiningMachine from "../MinerDesign_Code/MiningMachine.js";
import ElectricityPricing from "../MinerDesign_Code/ElectricityPricing.js";
import { FinancialReport } from "../MinerDesign_Code/FinancialReport.js";
import { PerformanceReport } from "../MinerDesign_Code/PerformanceReport.js";
import { MonitoringReportFactory } from "../MinerDesign_Code/MonitoringReportFactory.js";
import { User } from "../MinerDesign_Code/User.js";
import Alert from "../MinerDesign_Code/Alert.js";


// **1️⃣ 初始化监控系统**
const monitoringSystem = new MonitoringSystem();

// **2️⃣ 添加矿机**
const miner1 = new MiningMachine("Antminer S19", "192.168.1.101", 85, 90, "Active");
const miner2 = new MiningMachine("Whatsminer M30S", "192.168.1.102", 90, 80, "Active");

monitoringSystem.addMachine(miner1);
monitoringSystem.addMachine(miner2);

console.log("✅ 矿机添加完成");

// **3️⃣ 监控矿机温度**
monitoringSystem.monitorTemperature();

// **4️⃣ 初始化电价监控**
const electricityPricing = new ElectricityPricing(0.12, 0.15);
electricityPricing.monitorFluctuations(0.16, []); // 触发警报

// **5️⃣ 生成财务报告**
const financialReport = new FinancialReport(monitoringSystem);
console.log(financialReport.generate());

// **6️⃣ 生成性能报告**
const performanceReport = new PerformanceReport(monitoringSystem);
console.log(performanceReport.generate());

// **7️⃣ 使用工厂模式创建报告**
const report1 = MonitoringReportFactory.generateReport("financial", monitoringSystem);
console.log(report1.generate());

const report2 = MonitoringReportFactory.generateReport("performance", monitoringSystem);
console.log(report2.generate());

// **8️⃣ 创建用户并发送警报**
const user1 = new User("user1", "admin");
const user2 = new User("user2", "engineer");

const alert = new Alert("Temperature", "Critical", new Date(), "MiningMachine");
alert.trigger([user1, user2]);

// **9️⃣ 矿机重启**
miner1.restart();
miner2.restart();

console.log("✅ Demo 运行完成！");
