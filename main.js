const { Buffer } = require("node:buffer");
const {FsPromiseBasedApi} = require("./fs-api.js");

async function fsApi() {
  const instance = new FsPromiseBasedApi();
  await instance.linkPath("./main.js", "newMainLink.js");
  instance.unlinkPath("newMainLink.js")
  await instance.openFile("some file")
  await instance.createFile("./testfile", "some content")
  
  const buf = new Buffer.alloc(1024);
  instance.readFile("./testfile", buf).then(() => {
    console.log(buf.toString())
  }).catch((err) => {
    console.log(err)
  });
  
  instance.readFileWithBuffer("./testfile").then((c) => {
    console.log("content: ", c.toString())
  })
  
  await instance.loopLines("./testfile")
}

async function netApi() {
  require("./net-api.js")
}

(async function() {
  // await fsApi();
  await netApi();
})()
