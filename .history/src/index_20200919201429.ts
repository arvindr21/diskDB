import { DiskDB } from "./lib/diskdb";

const db = new DiskDB(__dirname, ['asd']);

console.log(db);