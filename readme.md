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

- src
  - app
    - routes
      - user.js
      - car.js
      - rent.js
    - controllers
      - user.js
      - car.js
      - rent.js
    - middlewares
      - auth.js
    - model
      - user.js
      - car.js
      - rent.js
  - database
    - migrations
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
