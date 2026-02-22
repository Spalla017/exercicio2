const { Router } = require("express");
const UserController = require("../controller/UserController");

const router = Router();
const userController = new UserController();

// GET    /api/users        → lista todos os usuários
router.get("/", userController.index);

// GET    /api/users/:id    → retorna um usuário por ID
router.get("/:id", userController.show);

// POST   /api/users        → cria um novo usuário
router.post("/", userController.store);

// PUT    /api/users/:id    → atualiza um usuário
router.put("/:id", userController.update);

// DELETE /api/users/:id    → remove um usuário
router.delete("/:id", userController.destroy);

module.exports = router;
