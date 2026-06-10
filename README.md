# LendIt (Sistema de empréstimos de jogos)

### Descrição
 - Esse projeto foi desenvolvido durante toda a disciplina de engenharia de software.
 - O LendIt é uma plataforma focada no empréstimo de jogos físicos entre os usuários.

### Como executar
#### Certifique-se de ter instaldo:
 - PostgreSQL ou Docker
 - Node.js
 - npm

#### Passo a passo
1. Clone este repositório e o frontend disponível [aqui](https://github.com/Clawe-Max/LendIT---Front-End.git).

2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

3. Configure as suas variáveis de ambiente em um aquivo .env seguindo o exemplo presente em .env.example

4. Rode no termial os seguintes comandos
    ```bash
    npx prisma migrate dev 
    npx prisma generate
    ```

5. Para executar o backend rode:
    ```bash
    npm run dev
    ```

6. No frontend execute os comandos: 
    ```bash
    npm install
    npm run dev
    ```