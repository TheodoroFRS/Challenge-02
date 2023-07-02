import app from './app';
require("dotenv").config();
import swaggerUI from 'swagger-ui-express'; // para documentação com o swagger
import swaggerJsDoc from 'swagger-jsdoc';  // para documentação com o swagger
import swaggerOptions from './docs/head'; // importando configurações do swagger


// cabeçalho da documentação
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


//app.listen(port, () => console.log(`Server is listening on port ${port}...`));
