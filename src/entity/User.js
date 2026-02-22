/**
 * Entidade User
 * Representa a estrutura e as regras básicas de um usuário.
 * O estado (dados) vive no objeto, não na classe.
 */
class User {
  constructor({ id, name, email, age, createdAt = null, updatedAt = null }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = createdAt || new Date().toISOString();
    this.updatedAt = updatedAt || new Date().toISOString();
  }

  /**
   * Valida os dados do usuário
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate() {
    const errors = [];

    if (!this.name || this.name.trim().length < 2) {
      errors.push("O nome deve ter pelo menos 2 caracteres.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      errors.push("E-mail inválido.");
    }

    if (!this.age || isNaN(this.age) || this.age < 1 || this.age > 150) {
      errors.push("Idade deve ser um número entre 1 e 150.");
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Atualiza os dados do usuário
   * @param {{ name?: string, email?: string, age?: number }} data
   */
  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.email !== undefined) this.email = data.email;
    if (data.age !== undefined) this.age = data.age;
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Serializa o objeto para JSON
   * @returns {object}
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;
