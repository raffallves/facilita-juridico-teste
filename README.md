# Back End da Aplicação

Este servidor consiste na API responsável por lidar com as requisições do front e interagir com o banco de dados.

Além das dependências especificadas no arquivo `package.json`, também foram utilizadas as seguintes ferramentas:

- `Node.js v20.11.0`
- `npm 10.2.4`
- `psql (PostgreSQL) 16.1`

## Rodando a aplicação

Antes de rodar, é necessário instalar os programas mencionados acima, e então rodar o seguinte comando:

```bash
npm install
```
Além disso, é preciso que exista um arquivo `.env` no diretório raiz do programa com as seguintes variáveis configuradas:

```env
HOST=localhost 
DATABASE=facilita_juridico 
USER=postgres 
PASSWORD=password 
PORT=5432 
```

Também é necessário que o arquivo `./db/schema.sql` seja executado para criar o banco de dados e suas tabelas no PostgreSQL. Feito isso, basta rodar o comando abaixo para rodar o servidor localmente:

```bash
npm run start:local
```

## Racional das decisões

Conforme pode ser visto, eu decidi implementar uma arquitetura que segue os princípios de [DDD](https://en.wikipedia.org/wiki/Domain-driven_design) e de [Clean Code](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) da melhor maneira possível. Desta forma, o código que rege as lógicas de negócio fica totalmente desacoplado de dependências como bancos de dados, frameworks e outras bibliotecas.

A linguagem `Typescript` também foi escolhida justamente pensando nisso, pois apenas com suas classes abstratas e interfaces é que é possível implementar esses padrões de arquitetura e design.

Quanto ao design do banco de dados, optei por uma estrutura bem simples — até porque os dados e a escala do app são extremamente simples — e uma normalização básica onde a tabela `clientes` se relaciona com a tabela `coordenadas`.

O algoritmo utilizado para o cálculo do itinerário foi o do Caixeiro Viajante ([Traveling Salesman](https://en.wikipedia.org/wiki/Travelling_salesman_problem)) por ser o que melhor se encaixava no cenário requisitado.

## Melhorias

Caso tivesse mais tempo, implementaria as seguintes melhorias neste projeto:

- Mais rotas (editar cadastros, deletar cadastros, etc.);
- Códigos de erro mais descritivos e logs em pontos estratégicos;
- Autenticação de usuário;
- Talvez colocaria o algoritmo de cálculo do itinerário como um microsserviço na nuvem;
- Conteinerização com Docker para ser mais conveniente e portátil;
- Bem mais testes unitários e testes end-to-end;
- Pipeline de CI/CD com Jenkins para automatizar o processo de teste/build/deploy;
