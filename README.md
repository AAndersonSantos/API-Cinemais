<h1 align="center">Backend App Cinemais 🎬</h1>


## `📋 Sobre`
API para gerenciamento de mídias (filmes e séries) e favoritos de usuários, construída com Node.js, Fastify, TypeScript e MongoDB.
O projeto é totalmente containerizado com Docker e conta com validações usando Zod e testes automatizados com Jest.

## `🚀 Tecnologias utilizadas`
* [Node.js (v22)](https://nodejs.org/pt)
* [Fastify](https://fastify.dev/) → framework HTTP rápido e minimalista
* [TypeScript](https://www.typescriptlang.org/) → tipagem estática e segurança em tempo de desenvolvimento
* [MongoDB](https://www.mongodb.com/) → banco de dados NoSQL
* [Zod](https://zod.dev/) → validação de esquemas
* [Jest](https://jestjs.io/) → testes unitários
* [Docker](https://www.docker.com/) → para containerização do ambiente

## `📂 Estrutura do projeto`

```
├── docker-compose.yml       # Orquestração de containers
├── Dockerfile.dev           # Configuração da imagem da API
├── jest.config.js           # Configuração do Jest
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração do TypeScript
├── src                      # Código-fonte da aplicação
│   ├── controllers          # Lógica das rotas (camada de controle)
│   ├── db.ts                # Conexão com o MongoDB
│   ├── models               # Camada de acesso ao banco (Mongo)
│   ├── routes               # Definição de rotas Fastify
│   ├── schemas              # Schemas de validação (Zod)
│   ├── services             # Regras de negócio (camada de serviço)
│   └── server.ts            # Ponto de entrada da aplicação
├── tests                    # Testes automatizados
│   ├── controllers
│   └── services
```

## `⚙️ Configuração e execução`
### 🔧 Pré-requisitos

* Docker → instalado

* Docker Compose → instalado

## `▶️ Rodando com Docker`

### 1. Crie um arquivo .env na raiz do projeto:
```
MONGO_URL=mongodb://database-cinemais:27017/cinemais
```
### 2. Instale as dependências localmente (para VSCode funcionar):
```
npm install
```
### 3. Suba os containers:
```
docker compose up -d --build
```
### 3. A API estará disponível em:
👉 http://localhost:3000

## `▶️ Rodando localmente (sem Docker)`

### 1. Instale as dependências:
```
npm install
```

### 2. Suba o MongoDB localmente (necessário ter o Mongo instalado) ou use Docker:
```
docker run -d -p 27017:27017 --name mongo-cinemais mongo:7
```

### 3. Configure o arquivo .env:
```
MONGO_URL=mongodb://localhost:27017/cinemais
```
### 4. Configure o arquivo .env:
```
npm run dev
```

## `🧪 Testes`
O projeto utiliza Jest para testes unitários das camadas de service e controller.

Rodar testes:
```
npx jest --verbose
```

## `📌 Arquitetura em Camadas (Layered Architecture)`
* ### Controllers
    * recebem as requisições, validam entradas e retornam respostas HTTP.

* ### Services
    * camada de regras de negócio (ex: adicionar/remover favoritos).

* ### Models
    * abstraem operações com o MongoDB.

* ### Schemas (Zod)
    * garantem a validação de dados de entrada.


## `🧪 Testando a API com cURL`

Após subir os containers com Docker, você pode testar os endpoints com os comandos abaixo.
A API roda por padrão em `http://localhost:3000`.

### ➕ Criar uma mídia

```bash
curl -X POST http://localhost:3000/media \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Matrix",
    "description": "Um clássico da ficção científica",
    "type": "movie",
    "releaseYear": 1999,
    "genre": "Sci-Fi"
  }'
```

### 📝 Listar todas as mídias

```bash
curl http://localhost:3000/media
```

### 🔍 Buscar uma mídia pelo ID

```bash
curl http://localhost:3000/media/<id_da_midia>
```

### ⭐ Adicionar uma mídia aos favoritos de um usuário

```bash
curl -X POST http://localhost:3000/users/<userId>/favorites \
  -H "Content-Type: application/json" \
  -d '{"mediaId": "<id_da_midia>"}'
```

### 📜 Listar favoritos de um usuário

```bash
curl http://localhost:3000/users/<userId>/favorites
```

### ⛔️ Remover uma mídia dos favoritos de um usuário

```bash
curl -X DELETE http://localhost:3000/users/<userId>/favorites/<id_da_midia>
```
