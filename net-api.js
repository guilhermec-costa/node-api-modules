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
  (conn) => {
    console.log("client connected through socket", conn.address());
    conn.on("data", (v) => {
      console.log("Received from the client: ", v.toString());
      const res = procReq(v);
      conn.write(res);
      conn.end();
    });

    conn.on("end", () => {
      console.log("Connection closed");
    });
  }
);

tcpServer.listen(8085, () => {
  console.log("TcpServer is listening on port ", String(8085));
});

tcpServer.on("connection", () => {
  tcpServer.getConnections((e, c) => {
    console.log(c);
  });
});
