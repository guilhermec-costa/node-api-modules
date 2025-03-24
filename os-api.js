const os = require("node:os");
const fs = require("node:fs/promises");

const systemEOL = os.EOL;
const systemArch = os.arch();
const logicalCpuCores = os.cpus();
const freeMemory = os.freemem();
const homeDir = os.homedir();
const host = os.hostname();
const machineType = os.machine();
const userInfo = os.userInfo();

console.log(logicalCpuCores.length, "locical cpu cores");
console.log(logicalCpuCores.length / 2, "phisical cpu cores");
console.log("Free memory(GB): ", freeMemory / 1e9);
console.log("Home dir: ", homeDir);
console.log("Hostname: ", host);
console.log("Machine: ", machineType);
console.log("User info: ", userInfo);
console.log("Uptime (h)", Math.floor(os.uptime() / 60 / 60));
console.log("OS Type: ", os.type());
console.log("Total RAM: ", os.totalmem() / 1e9);
console.log("OS platform: ", os.platform());
