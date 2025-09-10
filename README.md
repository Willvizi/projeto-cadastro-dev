# Projeto cadastro de desenvolvedores

Este projeto consiste em uma aplicação para cadastro de desenvolvedores associados a diferentes níveis. A aplicação é composta por um backend que oferece uma API RESTful construida em Node.js e um frontend que é uma SPA (Single Page Application) React interligada à API.

# Como rodar
Com o docker instalado, navegue até a pasta raiz do projeto e execute o comando:

```docker compose up --build  ```

Portas para acesso:

- [Frontend](http://localhost:5173): http://localhost:5173
- [Backend](http://localhost:3000): http://localhost:3000
- [pgAdmin](http://localhost:5050): http://localhost:5050


> **Possiveis problemas:** 
>- O projeto utiliza TypeORM que faz a migration automatica das tabelas, por padrão deve rodar normalmente e criar as tabelas, mas caso não crie na primeira rode os comandos abaixo:
> ```docker-compose down``` 
>
>   ```docker compose up --build```
> - Certifique-se de que as portas não estão sendo usadas por outro projeto
# Tecnologias utilizadas
Para esse projeto foram utilizadas algumas tecnologias

FrontEnd:

**Backend**
- Node.js
- TypeScript
- Express.js
- TypeORM
- Express Validator

**Frontend**
- React
- Vite
- MaterialUi
- Axios
- Toastify

**Banco de dados**

- PostgreSQL

**Containers Docker**
- FrontEnd - cadastro_dev_frontend
- Backend - cadastro_dev_app
- Banco de dados - cadastro_dev_db
- Admnistrador de banco - pgadmin

## Endpoints

**Importando a Collection no Postman ou Insomnia**
>Para ajudar nos testes ja com as requisições
1. Baixe o arquivo [DesenvolvedoresCadastro.postman_collection.json](./DesenvolvedoresCadastro.postman_collection.json).
2. Abra o Postman ou Insomnia.
3. Procure pela opção de importar ("Import" ou "Importar").
4. Selecione o arquivo baixado e confirme a importação.
5. Pronto! Os endpoints estarão disponíveis para uso.

### Desenvolvedores

**Base:** `http://localhost:3000/api/desenvolvedores`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Lista desenvolvedores |
| `GET` | `/:id` | Busca por ID |
| `POST` | `/` | Cria desenvolvedor |
| `PATCH` | `/:id` | Atualiza desenvolvedor |
| `DELETE` | `/:id` | Remove desenvolvedor |

**Exemplo de dados:**
```json
{
  "nome": "Willian Visicati",
  "sexo": "M",
  "data_nascimento": "1999-09-17",
  "hobby": "Pesquisar tecnologias",
  "nivel_id": 1
}
```

### Níveis
**Base:** `http://localhost:3000/api/api/niveis`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/` | Lista níveis |
| `GET` | `/:id` | Busca por ID |
| `POST` | `/` | Cria nível |
| `PATCH` | `/:id` | Atualiza nível |
| `DELETE` | `/:id` | Remove nível |

**Exemplo de dados:**
```json
{
  "nivel": "Junior"
}