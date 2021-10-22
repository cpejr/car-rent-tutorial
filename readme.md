# Projeto de tutorial de backend com aplicação de aluguel de carros

A ideia dessa aplicação é aplicar um pouco de cada uma das partes mais importantes da construção de uma aplicação a fim de introduzir melhor os conceitos e deixar claro como se estrutura uma aplicação básica em nodejs.

Algumas informações pertinentes sobre o app estão listadas abaixo.

## Estrutura do banco de dados:

#### Carro:

```
model
brand
year
plate
dailyPrice
drivenKm
isRented
```

#### Usuário

```
name
email
password (hash)
cpf
role
birthdate
```

#### Aluguel

```
userId
carId
totalPrice
startAt
endAt
```

### Regras de negócio:

- um usuário só pode alugar um carro de cada vez
- um carro não pode estar alugado para mais de um usuário ao mesmo tempo
- a data de entrega do carro não pode ser menor que a data em que foi alugado
- o usuário deve ter um cpf válido
- o usuário deve ser 18+ para alugar o carro (ou se cadastrar no sistema)
- ao "receber" um carro, deve ser calculado o preço total do aluguel e inserido na tabela
- somente o usuário pode alterar seu perfil
- somente o usuário pode deletar seu perfil
- um carro não pode ser cadastrado se tiver mais de 10 anos de "idade"
- um carro não pode ser cadastrado se tiver mais de 60 mil quilômetros rodados

### Requisitos não funcionais

- Hash de senha com argon2 ou bcrypt
- Usar sequelize para lidar com banco de dados
- Não usar a opção sync do sequelize, as tabelas devem ser geradas a partir de migrations
- Autenticação com jwt
- Usar nodejs
- Usar express

### Estrutura de pastas recomendada:

- backend-tutorial

  Essa é a pasta raiz do nosso projeto, aqui ficam os arquivos de configuração e todo o código fonte de nossa aplicação

  - src

    Essa é a pasta que guarda o código fonte da nossa aplicação

    - app

      Aqui fica o código fonte que não está diretamente ligado ao banco de dados.

      - routes

        As rotas são a parte da nossa aplicação responsável por expor nossa aplicação ao mundo externo por meio de "caminhos".

        - user.js
        - car.js
        - rent.js

      - controllers

        Os controllers são a parte da aplicação responsável por gerenciar o fluxo de uma requisição.

        - user.js
        - car.js
        - rent.js

      - middlewares

        Os middlewares são responsáveis por interceptar a requisição e realizar operações e/ou modificações antes que essa requisição passe para o próximo passo.

        - auth.js

      - model

        Os models guardam a abstração das nossas entidades.

        - user.js
        - car.js
        - rent.js

    - database

      Aqui fica o código relacionado ao banco de dados, como as migrations e os seeders, além do proprio banco de dados, se estivermos lidando com sqlite.

      - migrations

        As migrations são como um controle de versão do nosso banco de dados: cada nova migration corresponde a uma mudança no banco e a um commit.

      - database.sqlite3

### Autenticação e rotas privadas

- criar carro - privada admin
- listar todos os carros (inclui os alugados) - privada admin
- listar carros disponíveis - publica
- editar carro - privada admin
- deletar carro - privada admin
- alugar carro - privada comum
- criar um usuário - publica
- ler usuário - privada usuario
- editar usuário - privada para o usuário em questão
- deletar usuário - privada para o usuário em questão
