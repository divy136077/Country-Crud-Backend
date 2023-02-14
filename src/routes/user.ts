import express, { request, Request, Response, } from 'express';
export const userRouter = express.Router();
import Notification from "../model/errorHelper";
import user from '../mongo-models/user-schema';
import multer = require('multer');
import authenticator from '../middleware/authenticator';
const bcrypt = require("bcryptjs");

declare var path: any

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, '../frontend/COUNTRY/src/assets/image')
    cb(null, '../BACKEND/public/images')
    // cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage, limits: { fileSize: 5242880 }, }).single('Image');




// Post api 
userRouter.post("/create", upload, async (req: Request, res: Response) => {


  try {
    let email = await user.findOne({ Email: req.body.Email, Status: { $ne: "2" } });
    if (email) {
      return res
        .status(400)
        .json({ error: "A User with the same email already exists." });
    }
    var salt = await bcrypt.genSaltSync(10);
    var securedPassword = await bcrypt.hash(req.body.Password, salt);
    const Name = req.body.Name
    let users = await user.findOne({
      Name: Name.charAt(0).toUpperCase() + Name.slice(1),
    });
    if (users) {
      return res
        .status(400)
        .json();
    } else {

      const Name = req.body.Name

      const data = await user.create({
        Name: Name.charAt(0).toUpperCase() + Name.slice(1),
        Email: req.body.Email,
        Password: securedPassword,
        Number: req.body.Number,
        Image: req.file?.filename,
        Dob: req.body.Dob,
        Status: req.body.Status,
        IsAdmin: req.body.IsAdmin,
      });

      res.json(data);
    }
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// Get api 

userRouter.get("/", authenticator, async (req: Request, res: Response) => {
  try {
    let users;
    let filter: any = {}
    const filters: any = req.query;
    !!filters.Name && (filter.Name = filters.Name)
    !!filters.Status && (filter.Status = filters.Status)


    users = await user.find({ Status: { $ne: "2" }, ...filter });
    res.json(users);

  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }

})
// Put (edit) api 


userRouter.put("/update/:id", upload, async (req: Request, res: Response) => {
  try {
    const Name = req.body.Name

    let USER = await user.findOne({ Email: req.body.Email, Status: { $ne: "2" }, _id: { $ne: req.params.id } });

    if (USER) {
      return res.status(400)
        .json({ error: "A User with the same Email already exists." });
    } else {
      const newUser: any = {
        Name: Name.charAt(0).toUpperCase() + Name.slice(1),
        Email: req.body.Email,
        Number: req.body.Number,
        Password: req.body.Password,
        Image: req.file?.filename,
        Dob: req.body.Dob,
        Status: req.body.Status,
        IsAdmin: req.body.IsAdmin,
      }

      let putUser = await user.findById(req.params.id);
      if (!putUser) {
        return Notification.NotFound(req, res, onmessage);
      }
      putUser = await user.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
      res.json(putUser);
    }

  }
  catch (error) {

    Notification.InternalError(req, res, error);

  }
});


// update multipal selected data for status

userRouter.post("/update", async (req: Request, res: Response) => {
  const { data, status } = req.body;


  try {
    const newUser: any = {
      Status: status,
    };

    data.map(async (x: any) => {
      let users = await user.findById(x);
      if (!users) {
        // return Notification.NotFound(req, res, onmessage);
      }
      await user.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Updated");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// GetByID api 
userRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    let putUser = await user.findById(req.params.id);
    if (!putUser) {
      return Notification.NotFound(req, res, onmessage);
    }

    res.json(putUser);

  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }

})

// Delete api 
userRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {


    const newUser: any = {
      Status: "2"
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

    Notification.InternalError(req, res, error);
  }
});

// multipal selected data delete

userRouter.post("/delete", async (req: Request, res: Response) => {
  const data = req.body;


  try {
    const newUser: any = {
      Status: "2",
    };

    data.map(async (x: any) => {
      let users = await user.findById(x);
      if (!users) {
        // return Notification.NotFound(req, res, onmessage);
      }
      await user.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Deleted");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});


//menu id store

userRouter.post("/menu/:id", async (req: Request, res: Response) => {
  try {
    const {
      menuId

    } = req.body;
    const newUser: any = {
      menuId: menuId,

    }

    let users = await user.findById(req.params.id);
    if (!users) {
      console.log(user);
      return res.status(404).send("User not Found");
      // return Error.NotFound(req, res, onmessage);
    }

    users = await user.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
    res.json(user);
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal server Error");
    // Error.InternalError(req, res, error);

  }
});







export default userRouter;