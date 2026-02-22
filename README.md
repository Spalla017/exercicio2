# API Orientada a Objetos — Node.js + Express

> Projeto da **Aula 9 — Projeto Orientado a Objetos**  
> IFF Itaperuna · Prof. Leonardo Rodrigues Solar

---

## 📁 Estrutura do Projeto

```
api-usuarios-oo/
├── public/
│   ├── index.html           ← Frontend (interface do usuário)
│   └── script.js            ← Lógica do frontend (fetch API)
├── src/
│   ├── entity/
│   │   └── User.js          ← Entidade: atributos + validação
│   ├── repository/
│   │   └── UserRepository.js ← Acesso e persistência dos dados
│   ├── service/
│   │   └── UserService.js   ← Regras de negócio
│   ├── controller/
│   │   └── UserController.js ← Recebe requisições HTTP
│   ├── routes/
│   │   └── userRoutes.js    ← Mapeamento das rotas
│   ├── app.js               ← Configuração do Express
│   └── server.js            ← Ponto de entrada da aplicação
├── .gitignore
├── package.json
└── README.md
```

---

## 🏗️ Arquitetura MVC em Camadas

```
Requisição HTTP
      ↓
 UserController   → recebe, valida entrada, devolve resposta
      ↓
  UserService     → aplica as regras de negócio
      ↓
UserRepository    → acessa e persiste os dados
      ↓
 User (Entity)    → define atributos, estado e validações
```

---

## 🚀 Como rodar

### 1. Instale as dependências
```bash
npm install
```

### 2. Inicie o servidor
```bash
# Produção
npm start

# Desenvolvimento (com hot reload)
npm run dev
```

### 3. Acesse no navegador
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3000/api/users

---

## 📡 Endpoints da API

| Método | Rota              | Descrição                 |
|--------|-------------------|---------------------------|
| GET    | /api/users        | Lista todos os usuários   |
| GET    | /api/users/:id    | Busca usuário por ID      |
| POST   | /api/users        | Cria um novo usuário      |
| PUT    | /api/users/:id    | Atualiza um usuário       |
| DELETE | /api/users/:id    | Remove um usuário         |

### Exemplo — POST /api/users

**Body:**
```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "age": 25
}
```

**Resposta (201):**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso!",
  "data": {
    "id": "uuid-gerado",
    "name": "João da Silva",
    "email": "joao@email.com",
    "age": 25,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

---

## 🧠 Conceitos da Aula 9 aplicados

| Conceito                  | Onde está no código             |
|---------------------------|---------------------------------|
| Classe e Objeto           | Todas as classes do projeto     |
| Estado encapsulado        | `this._users` no Repository     |
| Entidade com estado       | `User` guarda seus atributos    |
| Responsabilidade única    | Cada camada faz só uma coisa    |
| MVC em camadas            | Controller → Service → Repository → Entity |
| `toJSON()`                | Serialização controlada em `User.js` |
| Validação na entidade     | `user.validate()` em `User.js`  |

---

## 🔗 Subindo no GitHub

```bash
git init
git add .
git commit -m "feat: API orientada a objetos - Aula 9"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

> 💡 Os dados são salvos em memória. Ao reiniciar o servidor, os dados são apagados.
# exercicio2
