const documentModel = require("./models/documentModel");
const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const defaultValue = "";
io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findTheDocumentByIdOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await documentModel.findByIdAndUpdate(documentId, { data });
    });
  });
});
async function findTheDocumentByIdOrCreateDocument(id) {
  if (id == null) return;
  const document = await documentModel.findById(id);
  if (document) return document;
  return await documentModel.create({ _id: id, data: defaultValue });
}
