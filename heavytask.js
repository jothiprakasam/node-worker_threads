const { parentPort } = require("worker_threads");

let c = 0;
for (let i = 0; i < 1e10; i++) c += i;
parentPort.postMessage(c);
