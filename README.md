# Challenge-02

Desafio da semana VIII - Compass UOL

Api de uma veterinária

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/TheodoroFRS/Challenge-01.git
```

Entre no diretório do projeto

```bash
  cd Challenge-01/
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

## Postman

#### Retorna todos os tutores

```http
  GET http://localhost:3000/tutors
```

Retorno:
```http
  [
    {
        "id": 1,
        "name": "Jonh Doe",
        "phone": "85989323895",
        "email": "jose.abreu@compasso.com",
        "date_of_birth": "1993-12-12 10:10",
        "zip_code": "61760000",
        "pets": [
            {
                "id": 1,
                "name": "Lilo",
                "species": "dog",
                "carry": "p",
                "weight": 5,
                "date_of_birth": "1993-12-12 10:10"
            }
        ]
    }
]
```

#### Criar um novo tutor.

```http
  POST http://localhost:3000/tutors
```
 Exemplo:
```http
  {
    "name": "Theo",
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678"
  }
```
Retorno: 
```http
{
    "id": 2,
    "name": "Theo",
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678",
    "pets": []
}
```

#### Retorna o tutor por id

```http
  GET http://localhost:3000/tutors/2
```
Retorno: 
```http
{
    "id": 2,
    "name": "Theo",
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678",
    "pets": []
}
```

#### Atualiza o tutor por id

```http
  PUT http://localhost:3000/tutors/2
```
 Exemplo:
```http
{
    "name": "Theodoro",
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678"
}
```
Retorno: 
```http
{
    "id": 2,
    "name": "Theodoro",
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678",
    "pets": []
}
```

#### Cria um animal de estimação e o adiciona a um tutor.

```http
  POST http://localhost:3000/pets/2
```
 Exemplo:
```http
      {
        "name": "lilo",
        "species": "dog",
        "carry": "p",
        "weight": 5,
        "date_of_birth": "1993-12-12 10:10"
      }
```

Retorno: 
```http
{
    "id": 1,
    "name": "lilo",
    "species": "dog",
    "carry": "p",
    "weight": 5,
    "date_of_birth": "1993-12-12 10:10"
}
```

#### Atualiza as informações de um animal de estimação de um tutor.

```http
  PUT http://localhost:3000/pets/1/tutor/2
```
 Exemplo:
```http
{
    "name": "stitch",
    "species": "cat",
    "carry": "p",
    "weight": 5,
    "date_of_birth": "1993-12-12 10:10"
}
```
Retorno: 
```http
{
    "id": 1,
    "name": "stitch",
    "species": "cat",
    "carry": "p",
    "weight": 5,
    "date_of_birth": "1993-12-12 10:10"
}
```

#### Deleta um animal de estimação de um tutor.

```http
 delete http://localhost:3000/pets/1/tutor/2
```
Retorno:
```http
{
    "message": "Pet id:1 do tutor id:2 foi deletado com sucesso"
}
```

#### Deleta o tutor por id

```http
 delete http://localhost:3000/tutors/2
```
Retorno:
```http
{
    "message": "Tutor id:2 foi deletado com sucesso"
}
```

## Validações

### Exemplos do tutor


#### Se criar um novo tutor sem nome.
```http
  POST http://localhost:3000/tutors
```
 Exemplo:
```http
  {
      /*"name": "Theo",*/
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678"
  }
```
Retorno: 
```http
[
    {
        "name": "error",
        "message": "Nome não informado"
    }
]
```

#### Se criar um novo tutor sem nome e sem CEP.

```http
  POST http://localhost:3000/tutors
```
 Exemplo:
```http
{
    /*"name": "Theo",*/
    "phone": "40028922",
    "email": "Theo.doro@compasso.com",
    "date_of_birth": "2023-12-12 10: 10"        /* ,
    "zip_code": "12345678" */
}
```
Retorno: 
```http
[
    {
        "name": "error",
        "message": "Nome não informado"
    },
    {
        "zip_code": "error",
        "message": "CEP não informado"
    }
]
```

#### Se atualizar o tutor sem email.

```http
  PUT http://localhost:3000/tutors/2
```
 Exemplo:
```http
{
    "name": "Theodoro",
    "phone": "40028922",
      /* "email": "Theo.doro@compasso.com", */
    "date_of_birth": "2023-12-12 10: 10",
    "zip_code": "12345678"
}
```
Retorno: 
```http
[
    {
        "email": "error",
        "message": "Email não informado"
    }
]
```
#### Se atualizar o tutor sem email e sem data de nascimento.

```http
  PUT http://localhost:3000/tutors/2
```
 Exemplo:
```http
{
    "name": "Theodoro",
    "phone": "40028922",
    /* "email": "Theo.doro@compasso.com", 
    "date_of_birth": "2023-12-12 10: 10",  */
    "zip_code": "12345678"
}
```
Retorno: 
```http
[
    {
        "email": "error",
        "message": "Email não informado"
    },
    {
        "email": "error",
        "message": "Data de nascimento não informado"
    }
]
```

#### Se tentar deletar e não encontrar o id do tutor.
```http
 delete http://localhost:3000/tutors/234567890
```
Retorno: 
```http
{
    "error": true,
    "code": 404,
    "message": "Tutor não encontrado"
}
```

### Exemplos do animal de estimação

#### Se não encontrar o id do tutor no POST, PUT e no DELETE do pet.

Retorno: 
```http
{
    "error": true,
    "code": 404,
    "message": "Tutor não encontrado"
}
```

#### Se criar um animal de estimação sem nome.

```http
  POST http://localhost:3000/pets/2
```
 Exemplo:
```http
{
    // "name": "lilo",
    "species": "dog",
    "carry": "p",
    "weight": 5,
    "date_of_birth": "1993-12-12 10:10"
}
```

Retorno: 
```http
[
    {
        "name": "error",
        "message": "Nome não informado"
    }
]
```
#### Se criar um animal de estimação sem especie.

```http
  POST http://localhost:3000/pets/2
```
 Exemplo:
```http
{
    "name": "lilo",
    // "species": "dog",
    "carry": "p",
    "weight": 5,
    "date_of_birth": "1993-12-12 10:10"
}
```

Retorno: 
```http
[
    {
        "species": "error",
        "message": "Espécie não informada"
    }
]
```
#### Se atualizar as informações de um animal de estimação sem a data de nascimento.

```http
  PUT http://localhost:3000/pets/1/tutor/2
```
 Exemplo:
```http
{
    "name": "stitch",
    "species": "cat",
    "carry": "p",
    "weight": 5   /*,
    "date_of_birth": "1993-12-12 10:10" */
}
```
Retorno: 
```http
[
    {
        "date_of_birth": "error",
        "message": "Data de nascimento não informada"
    }
]
```
#### Se atualizar as informações de um animal de estimação sem o peso e sem a data de nascimento.

```http
  PUT http://localhost:3000/pets/1/tutor/2
```
 Exemplo:
```http
{
    "name": "stitch",
    "species": "cat",
    "carry": "p"   /* ,
    "weight": 5 ,
    "date_of_birth": "1993-12-12 10:10" */
}
```
Retorno: 
```http
[
    {
        "weight": "error",
        "message": "Peso não informado"
    },
    {
        "date_of_birth": "error",
        "message": "Data de nascimento não informada"
    }
]
```
####  Se tentar deletar e não encontrar o id do animal de estimação.

```http
 delete http://localhost:3000/pets/1234567890/tutor/2
```
Retorno:
```http
{
    "error": true,
    "code": 404,
    "message": "Pet não encontrado"
}
```