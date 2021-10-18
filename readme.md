banco de dados:
CARRO:
modelo
marca
ano
placa
diaria
quilometragem
isRented
USUARIO
nome
email
senha (guardar hash)
cpf
papel
nascimento

    ALUGUEL
    	user_id
    	car_id
    	total_price
    	begin_at
    	end_at

REGRAS DE NEGOCIO:
um usuário só pode alugar um carro de cada vez
um carro não pode estar alugado para mais de um usuário ao mesmo tempo
a data de entrega do carro não pode ser menor que a data em que foi alugado
o usuário deve ter um cpf válido
o usuário deve ser 18+ para alugar o carro (ou se cadastrar no sistema)
ao "receber" um carro, deve ser calculado o preço total do aluguel e inserido na tabela
somente o usuário pode alterar seu perfil
somente o usuário pode deletar seu perfil
se receber status 401 do backend, desloga usuário (limpa os dados do localstorage e do context) e envia para /login

REQUISITOS NÃO FUNCIONAIS
Hash de senha com argon2 ou bcrypt ao inves de firebase como método de autenticação
Usar sequelize para lidar com banco de dados
Não usar a opção sync do sequelize, as tabelas devem ser geradas a partir de migrations
Autenticação com jwt
usar reactjs no front
usar nodejs no back
usar context e local storage no front para guardar os dados da sessão do usuário
usar axios para fazer requisições
usar express

BACK:

- Estrutura de pastas recomendada:
  src
  routes
  user.js
  car.js
  rent.js
  controller
  user.js
  car.js
  rent.js
  middlewares
  auth.js
  model
  user.js
  car.js
  rent.js
  database
  migrations
  database.sqlite3

- Autenticação
  criar carro - privada admin
  listar todos os carros (inclui os alugados) - privada admin
  listar carros disponíveis - publica
  editar carro - privada admin
  deletar carro - privada admin
  alugar carro - privada comum
  criar um usuário - publica
  ler usuário - privada usuario
  editar usuário - privada para o usuário em questão
  deletar usuário - privada para o usuário em questão

FRONT:

usuario comum:
tela login
tela de veiculos alugados
tela aluguel de veiculo
faz um get e tem botão de alugar, que cria uma entrada na tabela pivot "aluguel"

usuario admin:
tela de login
tela listagem (com botão de "receber", caso esteja alugado) e exclusão de veiculos
tela de criação de veiculo
modal de edição de veiculo
LINKS UTEIS:
tutorial sequelize: https://www.notion.so/notioncpe/Sequelize-fd6c82c82ca144e1bde7519b888da19c
video app completo usando sequelize: https://www.youtube.com/watch?v=Fbu7z5dXcRs
tutorial autenticação com jwt: https://www.notion.so/notioncpe/Autentica-o-com-JWT-397cf8373e4545b1a722468d1abd905f
tutorial context api: https://www.notion.so/notioncpe/Context-API-a4b2261540fc45b78d791f28d796e221
DBDIAGRAM:
Table users {
id uuid [pk]
name varchar
email varchar
password varchar //hash
cpf varchar
role varchar
birthdate datetime
created_at datetime
updated_at datetime
}

Table cars {
id uuid [pk]
model varchar
brand varchar
year varchar
plate varchar
dayly_price varchar
drove_miles numeric
isRented boolean
birthdate datetime
created_at datetime
updated_at datetime
}

Table rent {
user_id uuid
car_id uuid
total_price numeric
begin_at datetime
end_at datetime
}

Ref: rent.user_id > users.id
Ref: rent.car_id > cars.id

PEDAÇOS DE CODIGO:
routes.get("/rent", authMiddlewate.auth, rentController.create)
routes.put("/rent", authMiddlewate.auth, rentController.update)

routes.put("/car", authMiddlewate.auth, authMiddlewate.isAdmin, carController.update)

function auth(req, res, next){
const authHeader = req.headers.authorization;
// ... valida o authHeader até obter o usuário ...
const userId = await jwt.verify(authHeader)//
const user = await User.find(userId);
if(!user) return return res.status(401).json({message: "invalid credentials"})
req.user = user
next();
}

function isAdmin(req, res, next){
const user = req.user;
if(user.role != "adm") return res.status(403).json({ message: "access denied" })

    next();

}
