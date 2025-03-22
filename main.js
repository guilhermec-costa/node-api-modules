const { Buffer } = require("node:buffer");
const {FsPromiseBasedApi} = require("./fs-api.js");

const instance = new FsPromiseBasedApi();
instance.linkPath("./main.js", "newMainLink.js");
instance.unlinkPath("newMainLink.js")
instance.openFile("some file")
instance.createFile("./testfile", "some content")

const buf = new Buffer.alloc(1024);
instance.readFile("./testfile", buf).then(() => {
  console.log(buf.toString())
}).catch((err) => {
  console.log(err)
});

instance.readFileWithBuffer("./testfile").then((c) => {
  console.log("content: ", c.toString())
})

instance.loopLines("./testfile")