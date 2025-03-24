const events = require("node:events");

class CustomEmitter extends events.EventEmitter {}
const emitter = new CustomEmitter();
emitter.on("event", function (a, b) {
  console.log("Listener 1", a, b);
});

emitter.on("event", function (a, b) {
  // queues the execution of the callback,
  // to execute after the end of the current event loop cycle, and before the start of the next one
  setImmediate(() => {
    console.log("Listener 2", a, b);
  });
});

emitter.on("event", function (a, b) {
  console.log("Listener 3", a, b);
});

// every listener executes just ONCE for the emmited event
emitter.once("eventOnce", () => {
  console.log("Reacting just once to this event");
});

emitter.once("eventOnce", () => {
  console.log("Reacting just once to this event callback 2");
});

emitter.on(
  "error",
  /**
   *
   * @param {Error} err
   */
  (err) => {
    console.log(err.message);
  }
);

setTimeout(() => {
  emitter.emit("event", 5, 10, 15);
}, 1000);

setTimeout(() => {
  emitter.emit("eventOnce");
  emitter.emit("eventOnce");
}, 2500);

setTimeout(() => {
  emitter.emit("error", new Error("Woosp, some error occured"));
}, 3000);
