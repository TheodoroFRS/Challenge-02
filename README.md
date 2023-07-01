# Challenge-02

Desafio da semana VIII - Compass UOL

Api de uma Clínica Veterinária

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/TheodoroFRS/Challenge-02.git
```

Entre no diretório do projeto

```bash
  cd Challenge-02/
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

Acesse:  http://localhost:3000

 

## Documentação da API


### Login

```http
  POST /auth
```

 Exemplo:
```http
{
  "email": "Theo.doro@compasso.com",
  "password": "secret"
}
```

Retorno:
```http
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWU0ZGFlMTM1YzA2MmJhY2JhZWU0YyIsImlhdCI6MTY4ODI0MjY2NiwiZXhwIjoxNjg4MzI5MDY2fQ.sCC-PAYVfZXFZyf4yOhxBW7cD6MDTMndZBaER16Ix2M"
}
```

se não passar valores válidos 
```http
Invalid email or password
```

### Tutor

#### Retorna todos os tutores

```http
  GET /tutors
```

Retorno:
```http
{
  "tutors": [
    {
      "_id": "649e4dae135c062bacbaee4c",
      "name": "TheoDoro"
      "phone": "40028922",
      "email": "Theo.doro@compasso.com",
      "date_of_birth": "2023-12-12T14:10:00.000Z",
      "zip_code": 12345678,
      "pets": [
        {
          "name": "stitch",
          "species": "cat",
          "carry": "m",
          "weight": 6,
          "date_of_birth": "1993-12-12T13:10:00.000Z",
          "_id": "64a08f09294f1bc8f15be5cf"
        }
      ],
      "__v": 0
    }
  ]
}
```

Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```

#### Criar um novo tutor.

```http
  POST /tutors
```
 Exemplo:
```http
{
  "name": "Theo",
  "password": "secret",
  "phone": "40028922",
  "email": "Theodoro@compasso.com",
  "date_of_birth": "2023-12-12 10: 10",
  "zip_code": 12345678
}
```
Retorno: 
```http
{
  "name": "Theo",
  "password": "$2b$10$zNJttzSYTz4nfY.qhapL8OJ4bwHCAowba5Tq24W6bI2cNJG0946yO",
  "phone": "40028922",
  "email": "Theodoro@compasso.com",
  "date_of_birth": "2023-12-12T14:10:00.000Z",
  "zip_code": 12345678,
  "_id": "64a08fc8294f1bc8f15be5e6",
  "pets": [],
  "__v": 0
}
```



#### Retorna o tutor por id

```http
  GET /tutors/{id}
```
Retorno: 
```http
{
  "_id": "64a08fc8294f1bc8f15be5e6",
  "name": "Theo",
  "phone": "40028922",
  "email": "Theodoro@compasso.com",
  "date_of_birth": "2023-12-12T14:10:00.000Z",
  "zip_code": 12345678,
  "pets": [],
  "__v": 0
}
```

Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```

#### Atualiza o tutor por id

```http
  PUT /tutors/{id}
```
 Exemplo:
```http
{
  "name": "Theodoro",
  "phone": "40028922",
  "email": "Theodoro@compasso.com",
  "date_of_birth": "2023-12-12 10: 10",
  "zip_code": 12345678
}
```
Retorno: 
```http
{
  "_id": "64a08fc8294f1bc8f15be5e6",
  "name": "Theodoro",
  "password": "$2b$10$zNJttzSYTz4nfY.qhapL8OJ4bwHCAowba5Tq24W6bI2cNJG0946yO",
  "phone": "40028922",
  "email": "Theodoro@compasso.com",
  "date_of_birth": "2023-12-12T14:10:00.000Z",
  "zip_code": 12345678,
  "pets": [],
  "__v": 0
}
```


#### Deleta o tutor por id

```http
  DELETE /tutors/{id}
```
Retorno:
```http
{
  "message": "Tutor with id:64a08fc8294f1bc8f15be5e6 was success deleted"
}
```
Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```

se não ainda houver animais de estimação associados ao tutor
```http
{
  "message": "It is not possible to delete the tutor with one or more pets associated with it."
}
```

### Pet

#### Retorna todos os pets

```http
  GET /pets
```

Retorno:
```http
{
  "pets": [
    {
      "_id": "64a08f09294f1bc8f15be5cf",
      "name": "stitch",
      "species": "cat",
      "carry": "m",
      "weight": 6,
      "date_of_birth": "1993-12-12T13:10:00.000Z",
      "__v": 0
    }
  ]
}
```

Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```

#### Cria um animal de estimação e o adiciona ao tutor.

```http
  POST /pets/{id}
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
  "name": "lilo",
  "species": "dog",
  "carry": "p",
  "weight": 5,
  "date_of_birth": "1993-12-12T13:10:00.000Z",
  "_id": "64a09a5fa9f3feb531b59132",
  "__v": 0
}
```

Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```

#### Retorna o pet por id

```http
  GET /pets/{id}
```
Retorno: 
```http
{
  "_id": "64a09a5fa9f3feb531b59132",
  "name": "lilo",
  "species": "dog",
  "carry": "p",
  "weight": 5,
  "date_of_birth": "1993-12-12T13:10:00.000Z",
  "__v": 0
}
```

Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```


#### Atualiza as informações de um animal de estimação de um tutor.

```http
  PUT /pets/{petId}/tutor/{tutorId}
```
 Exemplo:
```http
{
  "name": "stitch",
  "species": "cat",
  "carry": "m",
  "weight": 6,
  "date_of_birth": "1993-12-12 10:10"
}
```
Retorno: 
```http
{
  "_id": "64a09a5fa9f3feb531b59132",
  "name": "stitch",
  "species": "cat",
  "carry": "m",
  "weight": 6,
  "date_of_birth": "1993-12-12T13:10:00.000Z",
  "__v": 0
}
```
Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```

#### Deleta um animal de estimação de um tutor.

```http
  DELETE /pets/{petId}/tutor/{tutorId}
```
Retorno:
```http
{
  "message": "Pet with id:64a09a5fa9f3feb531b59132 , from tutor with id:64a08fc8294f1bc8f15be5e6, was success deleted"
}
```
Autenticação necessária

se não autenticado
```http
{
  "error": true,
  "code": 401,
  "message": "Authentication Invalid, not authorized"
}
```
