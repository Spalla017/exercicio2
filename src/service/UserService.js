const UserRepository = require("../repository/UserRepository");

/**
 * UserService
 * Concentra a lógica de negócio relacionada ao usuário.
 * Coordena as operações entre o Controller e o Repository.
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Lista todos os usuários cadastrados
   * @returns {{ success: boolean, data: object[], count: number }}
   */
  listUsers() {
    const users = this.userRepository.findAll();
    return {
      success: true,
      data: users.map((u) => u.toJSON()),
      count: users.length,
    };
  }

  /**
   * Busca um usuário pelo ID
   * @param {string} id
   * @returns {{ success: boolean, data?: object, message?: string }}
   */
  getUserById(id) {
    const user = this.userRepository.findById(id);
    if (!user) {
      return { success: false, message: "Usuário não encontrado." };
    }
    return { success: true, data: user.toJSON() };
  }

  /**
   * Cria um novo usuário aplicando regras de negócio
   * @param {{ name: string, email: string, age: number }} data
   * @returns {{ success: boolean, data?: object, message: string, errors?: string[] }}
   */
  createUser(data) {
    // Regra: e-mail não pode estar em uso
    const existing = this.userRepository.findByEmail(data.email);
    if (existing) {
      return { success: false, message: "E-mail já cadastrado no sistema." };
    }

    // Cria o usuário e valida pela entidade
    const user = this.userRepository.create(data);
    const validation = user.validate();

    if (!validation.valid) {
      return { success: false, message: "Dados inválidos.", errors: validation.errors };
    }

    return {
      success: true,
      message: "Usuário cadastrado com sucesso!",
      data: user.toJSON(),
    };
  }

  /**
   * Atualiza os dados de um usuário
   * @param {string} id
   * @param {{ name?: string, email?: string, age?: number }} data
   * @returns {{ success: boolean, data?: object, message: string }}
   */
  updateUser(id, data) {
    if (data.email) {
      const existing = this.userRepository.findByEmail(data.email);
      if (existing && existing.id !== id) {
        return { success: false, message: "E-mail já utilizado por outro usuário." };
      }
    }

    const user = this.userRepository.update(id, data);
    if (!user) {
      return { success: false, message: "Usuário não encontrado." };
    }

    return {
      success: true,
      message: "Usuário atualizado com sucesso!",
      data: user.toJSON(),
    };
  }

  /**
   * Remove um usuário pelo ID
   * @param {string} id
   * @returns {{ success: boolean, message: string }}
   */
  deleteUser(id) {
    const deleted = this.userRepository.delete(id);
    if (!deleted) {
      return { success: false, message: "Usuário não encontrado." };
    }
    return { success: true, message: "Usuário removido com sucesso!" };
  }
}

module.exports = UserService;
