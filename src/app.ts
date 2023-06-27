import express  from "express";
import routes from "./routes/index"

const app = express();

app.use(express.json());

routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Servidor Rodando em http://localhost:${port}`));
