const { Worker } = require("worker_threads");
const express = require("express");
const app = express();
const port = 1234;

function runHeavyTask() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./heavytask.js");
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code != 0) {
        reject(new Error("Code exited"));
      }
    });
  });
}

//function to run the worker

app.get("/handle", (req, res) => {
  async function handle_req() {
    const result = await runHeavyTask();
    if (result) console.log("received");
    console.log(result);
    res.send(`${result}`);
  }
  handle_req();
});
//load route must be done
app.get("/load", (req, res) => {
  let c = 0;
  for (let i = 0; i < 1e10; i++) c += i;
  res.send(`${c}`);
});
app.get("/hi", (req, res) => {
  res.send("hi");
});
//handle_req();
app.listen(port, () => {
  console.log("server is running ");
});
