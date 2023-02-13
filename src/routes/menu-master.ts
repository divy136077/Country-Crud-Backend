import express, { Request, Response } from "express";
import menu from "../mongo-models/menu-master";
export const menuRouter = express.Router();
import Notification from "../model/errorHelper";


// Get api ----------------------------------------------------------------------------------------------------------

menuRouter.get("/", async (req: Request, res: Response) => {
    try {
        let users;

        users = await menu.find({});
        res.json(users);

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }

})

menuRouter.post("/create", async (req: Request, res: Response) => {   
    try {
      const user = await menu.create({
        Name: req.body.Name,
        Status: req.body.Status
      });
      res.json(user);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });


export default menuRouter;