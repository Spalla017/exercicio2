const App = require("./app");

const PORT = process.env.PORT || 3000;

const appInstance = new App();
const server = appInstance.getApp();

server.listen(PORT, () => {
  console.log("╔════════════════════════════════════════╗");
  console.log("║   API Orientada a Objetos - Node.js    ║");
  console.log("╠════════════════════════════════════════╣");
  console.log(`║  🚀 Servidor rodando na porta ${PORT}      ║`);
  console.log(`║  📡 API:      http://localhost:${PORT}/api  ║`);
  console.log(`║  🌐 Frontend: http://localhost:${PORT}      ║`);
  console.log("╚════════════════════════════════════════╝");
});
