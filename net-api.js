const net = require("node:net");
const buf = require("node:buffer");

// Communication Protocols: sets of rules that every node on the network must follow in order to share and receive data

const ipsBlocklist = new net.BlockList();
ipsBlocklist.addAddress("127.0.0.1", "ipv4");

function extractHttpMethod(req) {
  return req.substring(0, req.search("/")).trim();
}
/**
 *
 * @param {buf.Buffer} data
 */
function procReq(data) {
  const requestData = data.toString();
  const requestMethod = extractHttpMethod(requestData);
  if (requestData.startsWith("GET / HTTP/1.1")) {
    return `HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{"requestMethod":"${requestMethod}"}`;
  } else {
    return "HTTP/1.1 400 Bad Request\r\nContent-Type: text/plain\r\n\r\nInvalid Request";
  }
}

const tcpServer = net.createServer(
  {
    blockList: ipsBlocklist,
  },
  (socket) => {
    console.log("client connected through socket", socket.address());
    socket.on("data", (v) => {
      console.log("Received from the client: ", v.toString());
      // const res = procReq(v);
      console.log("Bytes written: ", socket.bytesWritten);
      socket.write("from server");
      // socket.end();
    });

    socket.on("ready", () => {
      console.log("Socket is ready");
    });

    setTimeout(() => {
      socket.end();
    }, 5000);
    socket.on("end", () => {
      console.log("connection ended");
    });

    socket.on("close", () => {
      console.log("connection closed");
      console.log("Is socket on server closed: ", socket.closed);
    });
  }
);

tcpServer.listen(8085, () => {
  console.log("TcpServer is listening on port ", String(8085));
});

tcpServer.on("connection", () => {
  tcpServer.getConnections((err, count) => {
    console.log("count: ", count);
  });
});

const socket = new net.Socket();
socket.connect(8085, "localhost");

socket.on("end", () => {
  console.log("client socket has ended");
});
