const { v4: uuidv4 } = require("uuid"),
  crossOrigin = require("diet-cross-origin"),
  server = require("diet"),
  app = server(),
  express = require("express"),
  ap2 = express(),
  http = require("http").createServer(ap2),
  io = require("socket.io")(http),
  port = 8889,
  opts = {
    defaults: {
      origin: "*",
      "allow-headers": "content-type",
    },
  };

let users = [],
  messages = [],
  counter_connections = 0;
app.listen("http://localhost:8888");

app.get("/", function ($) {
  $.end("welcome to my website");
});

app.post("/login", function ($) {
  console.log($.body);
  const username = JSON.parse($.body).username,
    search = users.filter((user) => user.user == username),
    obj = aggregate(search, username);
  $.json(obj);
});

app.post("/logout", function ($) {
  const token = JSON.parse($.body).token;
  users = users.filter((user) => user.token != token);
  $.end(`${token} is gone`);
});

function aggregate(obj, user) {
  if (obj.length == 0) {
    const register = {
      user: user,
      token: uuidv4(),
    };
    users.push(register);
    return register;
  }
  return obj;
}

app.header(crossOrigin(opts));

http.listen(port, () => {
  console.log("Web Socket on localhost:%d", port);
});

io.on("connection", (socket) => {
  counter_connections++;
  console.log("User IN", counter_connections);
  socket.broadcast.emit("connections", {
    counter_connections,
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    counter_connections--;
    console.log("User Out", counter_connections);
    socket.broadcast.emit("bye bye user", {
      message: "Ha salido un usuario del Chat",
    });
  });
});
