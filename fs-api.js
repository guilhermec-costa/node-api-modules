const fsP = require("node:fs").promises;
const fsC = require("node:fs");

class FsPromiseBasedApi {
  /**
   * @param {string} path - The path to unlink
   */
  unlinkPath(path) {
    fsP
      .unlink(path)
      .then((v) => {
        console.log("Path unlinked");
      })
      .catch((err) => {
        console.log("Failed to unlink path: ", err);
      });
  }

  /**
   *
   * @param {string} targetPath - source to symlink
   * @param {string} linkName - link name
   */
  async linkPath(targetPath, linkName) {
    try {
      fsP.link(targetPath, linkName);
    } catch (error) {
      console.log("Failed to link path: ", error);
    }
  }

  /**
   * @param {string} path
   */
  async openFile(path) {
    try {
      const handler = await fsP.open(path, "r");
      await handler.writeFile("content of the file");
      handler.close();
    } catch (error) {
      console.log(error.message);
    }
  }

  async createFile(path, content, encoder) {
    const handler = await fsP.open(path, "w");
    handler.writeFile(content, {
      encoding: encoder,
    });
    handler.close();
  }

  /**
   *
   * @param {string} path
   * @returns {Promise<void>}
   */
  async readFile(path, buffer) {
    try {
      const fHandler = await fsP.open(path, "r+");
      // takes a buf reference
      await fHandler.read(buffer, 0, 100, null);
      fHandler.close();
    } catch (error) {
      console.log("Failed to read file: ");
    }
  }

  async readFileWithBuffer(path) {
    const handler = await fsP.open(path, "r+");
    // returns a buf reference
    const content = await handler.readFile();
    handler.close();
    return content;
  }

  async loopLines(path) {
    const handler = await fsP.open(path, "r+");
    for await (const line of handler.readLines()) {
      console.log(line);
    }
  }

  async createReadStream(path) {
    const hd = await fsP.open(path, "r+");
    const stream = hd.createReadStream();
    stream.on("data");
  }
}

module.exports = {
  FsPromiseBasedApi,
};
