import express, { Request, Response, } from 'express';
export const userRouter = express.Router();
import Notification from "../model/errorHelper";
import user from '../mongo-models/user-schema';
import multer = require('multer');

declare var path: any

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../BACKEND/image/DP/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  })

const upload = multer({ storage: storage }).single('Image');

// Post api --------------------------------------------------------------------------------------------------------
userRouter.post("/create",upload,  async (req: Request, res: Response) => {


    try {
        const Name = req.body.Name

        const data = await user.create({
            Name: Name.charAt(0).toUpperCase() + Name.slice(1),
            Email: req.body.Email,
            Number: req.body.Number,
            Image: req.file?.filename,
            Dob: req.body.Dob,
            IsActive: req.body.IsActive
        });
        console.log(data);
        res.json(data);
    } catch (error) {
        Notification.InternalError(req, res, error);
    }
});

// Get api ----------------------------------------------------------------------------------------------------------

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        let users;

        users = await user.find({ deleted: false });
        res.json(users);

    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }

})
// Put (edit) api ----------------------------------------------------------------------------------------------------

userRouter.put("/update/:id",upload, async (req: Request, res: Response) => {
    try {
        const Name = req.body.Name
        const newUser: any = {
            Name: Name.charAt(0).toUpperCase() + Name.slice(1),
            Email: req.body.Email,
            Number: req.body.Number,
            Image: req.file?.filename,
            Dob: req.body.Dob,
            IsActive: req.body.IsActive
        }
      
        let putUser = await user.findById(req.params.id);
        if (!putUser) {
            // return  res.status(404).send("User not Found");
            return Notification.NotFound(req, res, onmessage);
        }
        putUser = await user.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(putUser);
    }
    catch (error) {
        console.log("hihi",error);
        Notification.InternalError(req, res, error);

    }
});

// GetByID api -------------------------------------------------------------------------------------------------------------
userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        let putUser = await user.findById(req.params.id);
        if (!putUser) {
            // return res.status(404).send("not found");
            return Notification.NotFound(req, res, onmessage);
        }

        res.json(putUser);

    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }

})

// Delete api -----------------------------------------------------------------------------------------------------
userRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    try {


        const newUser: any = {
            deleted: true
        }
        let putUser = await user.findById(req.params.id);
        if (!putUser) {
            // return res.status(404).send("not found");
            return Notification.NotFound(req, res, onmessage);
        }
        putUser = await user.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(putUser);
    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }
})






export default userRouter;