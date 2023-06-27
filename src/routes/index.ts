import express from "express";
import tutors from "./tutorsRoutes"
import pets from "./petsRoutes"

const routes = (app: express.Express) => {

    app.route("/").get((req: express.Request, res: express.Response) => {
        res.status(200).json({message: `Api Challenge #02`})
      })

    app.use(
        tutors,
        pets
        
    )
}

export default routes;