import express, { Request, Response } from "express";
export const loginRouter = express.Router();
const { body, validationResult } = require("express-validator");
import Login from "../mongo-models/user-schema";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import Notification from "../model/errorHelper";


const LoginValidate = [
  body("Email", "Email must be in valid format").exists(),
  body("Password", "Password cannot be null").exists(),
];


loginRouter.post("/", LoginValidate, async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) 
  {
    // return res.status(400).json({ errors: errors.array() });
    return Notification.BadRequest(req, res,{ errors: errors.array() })
  }

  const { Email, Password } = req.body;
  try {
    let user1 = await Login.findOne({ Email: Email });
    if (!user1) {
      const error = "Email incorrect please check.";
      return Notification.BadRequest(req, res, error)

      // return res.status(400).json({ error: "Email incorrect please check  ." });
    }

    const validPassword = await bcrypt.compare(Password, user1.Password);
    console.log("----------------", validPassword);


    if (!validPassword) {
      const error = "Password incorrect please check.";
      return Notification.BadRequest(req, res, error)

      // return res.status(400).json({ error: "Password incorrect please check." });
    }

    let data = {
      user: {
        id: user1.id,
      },
    };
    const authtoken = jwt.sign(data, "DivyLadani", { expiresIn: '100m' });
    res.send([user1,authtoken]);
  } catch (error: any) {
    console.log(error.message);
    // res.status(500).send("Internal Server Error");
    Notification.InternalError(req, res, error);
  }
});


export default loginRouter;
