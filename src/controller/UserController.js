const UserService = require("../service/UserService");

/**
 * UserController
 * Recebe as requisições HTTP, aciona o Service e devolve a resposta.
 */
class UserController {
  constructor() {
    this.userService = new UserService();

    // Bind necessário para manter o contexto do 'this' nas rotas
    this.index   = this.index.bind(this);
    this.show    = this.show.bind(this);
    this.store   = this.store.bind(this);
    this.update  = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * GET /api/users
   * Lista todos os usuários
   */
  index(req, res) {
    const result = this.userService.listUsers();
    return res.status(200).json(result);
  }

  /**
   * GET /api/users/:id
   * Retorna um usuário específico
   */
  show(req, res) {
    const { id } = req.params;
    const result = this.userService.getUserById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  }

  /**
   * POST /api/users
   * Cria um novo usuário
   */
  store(req, res) {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
      return res.status(400).json({
        success: false,
        message: "Os campos nome, e-mail e idade são obrigatórios.",
      });
    }

    const result = this.userService.createUser({ name, email, age });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  }

  /**
   * PUT /api/users/:id
   * Atualiza os dados de um usuário
   */
  update(req, res) {
    const { id } = req.params;
    const result = this.userService.updateUser(id, req.body);

    if (!result.success) {
      const status = result.message.includes("não encontrado") ? 404 : 400;
      return res.status(status).json(result);
    }

    return res.status(200).json(result);
  }

  /**
   * DELETE /api/users/:id
   * Remove um usuário
   */
  destroy(req, res) {
    const { id } = req.params;
    const result = this.userService.deleteUser(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  }
}

module.exports = UserController;
