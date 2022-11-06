const io = require("socket.io")();

io.on("connection", (socket) => {
  socket.on("sendBarInfo", (barInfo) => {
    io.sockets.emit("receiveBarInfo", barInfo);
  });

  socket.on("sendCurrentSlot", (currentSlot) => {
    io.sockets.emit("receiveCurrentSlot", currentSlot);
  });

  socket.on("sendSelectedChampion", (selectedChampion, currentSlot) => {
    io.sockets.emit("receiveSelectedChampion", selectedChampion, currentSlot);
  });

  socket.on("sendPlayerIGNs", (playerIGNs) => {
    io.sockets.emit("receivePlayerIGNs", playerIGNs);
  });

  socket.on("sendStartTimer", () => {
      io.sockets.emit("receiveStartTimer");
  });

  socket.on("sendUpdatedPicks", (newPicks) => {
    io.sockets.emit("receiveUpdatedPicks", newPicks);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
