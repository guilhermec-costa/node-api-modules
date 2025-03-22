const fsP = require("node:fs").promises;
const fsC = require("node:fs");

class FsPromiseBasedApi {

  /**
   * @param {string} path - The path to unlink
   */
  unlinkPath(path) {
    fsP.unlink(path)
      .then((v) => {
        console.log("Path unlinked");
      })
      .catch((err) => {
        console.log("Failed to unlink path: ", err);
      })
  }

  /**
   * 
   * @param {string} targetPath - source to symlink
   * @param {string} linkName - link name
   */
  async linkPath(targetPath, linkName) {
    try {
      fsP.link(targetPath, linkName)
    } catch (error) {
      console.log("Failed to link path: ", error) 
    }
  }
}

const instance = new FsPromiseBasedApi();
instance.linkPath("./main.js", "newMainLink.js");