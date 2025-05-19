## Worker Threads in NodeJs
We know node is a single threaded , Non-Blocking Architecture , every task queued in the single threads . Heavy Computation like Bigger Loops or any other computation 
in the single thread it will affect the all task in the event Loop . So that application may crash with single Thread. So that Creating a Worker thread is good one.
it will create a thread which we can run other task concurrently .
# Example in expressJs
here is the code from **heavytask.js**
```
let c = 0;
for (let i = 0; i < 1e10; i++) c += i;

```
You can change it later.

The below code from the **server.js**
```
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
```
which is respomsible for creating a thread for the heavy task.
When you run the heavy task in normal , it will took time to complete , it will load the server and at the same time when you access the another route it
will not open.

So you can access any route safetly by creating a thread.

Hope you like it .
Thank You

Jothi Prakasam Ramesh 
Sri sairam Institute of technollogy.





```
