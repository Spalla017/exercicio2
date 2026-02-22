const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

/**
 * Classe App
 * Configura e inicializa o servidor Express.
 */
class App {
  constructor() {
    this.app = express();
    this._configureMiddlewares();
    this._configureRoutes();
  }

  _configureMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    // Serve os arquivos estáticos do frontend
    this.app.use(express.static(path.join(__dirname, "..", "public")));
  }

  _configureRoutes() {
    // Health check
    this.app.get("/api/health", (req, res) => {
      res.json({ status: "ok", message: "API rodando! 🚀" });
    });

    // Rotas de usuários
    this.app.use("/api/users", userRoutes);

    // Fallback para o frontend
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;
