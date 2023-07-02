import express from "express";
import tutors from "./tutorsRoutes"
import pets from "./petsRoutes"
import auth from "./authRoutes";

const routes = (app: express.Express) => {

    app.route("/").get((req: express.Request, res: express.Response) => {
        res.status(200).redirect("/docs")
      })

    app.use(
        tutors,
        pets,
        auth
    )
}

export default routes;