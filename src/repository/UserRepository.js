const { v4: uuidv4 } = require("uuid");
const User = require("../entity/User");

/**
 * UserRepository
 * Responsável pelo acesso e persistência dos dados de usuários.
 * Isola o armazenamento do restante do sistema.
 * (Armazenamento em memória — substitua por banco de dados quando necessário)
 */
class UserRepository {
  constructor() {
    this._users = []; // estado interno do repositório
  }

  /**
   * Retorna todos os usuários
   * @returns {User[]}
   */
  findAll() {
    return this._users.map((u) => new User(u));
  }

  /**
   * Busca um usuário pelo ID
   * @param {string} id
   * @returns {User|null}
   */
  findById(id) {
    const data = this._users.find((u) => u.id === id);
    return data ? new User(data) : null;
  }

  /**
   * Busca um usuário pelo e-mail
   * @param {string} email
   * @returns {User|null}
   */
  findByEmail(email) {
    const data = this._users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    return data ? new User(data) : null;
  }

  /**
   * Cria e salva um novo usuário
   * @param {{ name: string, email: string, age: number }} data
   * @returns {User}
   */
  create(data) {
    const user = new User({
      id: uuidv4(),
      name: data.name,
      email: data.email,
      age: data.age,
    });

    this._users.push(user.toJSON());
    return user;
  }

  /**
   * Atualiza um usuário existente
   * @param {string} id
   * @param {{ name?: string, email?: string, age?: number }} data
   * @returns {User|null}
   */
  update(id, data) {
    const index = this._users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const user = new User(this._users[index]);
    user.update(data);
    this._users[index] = user.toJSON();
    return user;
  }

  /**
   * Remove um usuário pelo ID
   * @param {string} id
   * @returns {boolean}
   */
  delete(id) {
    const index = this._users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this._users.splice(index, 1);
    return true;
  }
}

module.exports = UserRepository;
