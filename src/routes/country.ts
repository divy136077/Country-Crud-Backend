import express, { Request, Response } from "express";
import country from "../mongo-models/country-schema";
export const router = express.Router();
import Notification from "../model/errorHelper";


// Post api 
router.post("/create", async (req: Request, res: Response) => {
  try {
    const name = req.body.Name;

    let users = await country.findOne({
      Name: name.charAt(0).toUpperCase() + name.slice(1),
      Status: { $ne: "2" },
    });

    if (users) {
      return res
        .status(400)
        .json({ error: "A Country with the same Name already exists." });
    } else {
      const name = req.body.Name;
      const code = req.body.Code;
      const user = await country.create({
        Name: name.charAt(0).toUpperCase() + name.slice(1),
        Code: code.toUpperCase(),
        Status: req.body.Status,
      });
      res.json(user);
    }
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// Get api 

router.get("/", async (req: Request, res: Response) => {
  try {
    let countrys;
    let filter: any = {}
    const filters: any = req.query;
    !!filters.Name && (filter.Name = filters.Name)
    !!filters.Status && (filter.Status = filters.Status)



    countrys = await country.find({ Status: { $ne: "2" }, ...filter });
    res.json(countrys);

  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});



// Put (edit) api 

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { Name, Code, Status, id } = req.body;

    let users = await country.findOne({
      Name: Name.charAt(0).toUpperCase() + Name.slice(1),
      Status: { $ne: "2" },
      _id: { $ne: id }
    });

    if (users) {
      return res
        .status(400)
        .json({ error: "A Country with the same Name already exists." });
    } else {
      const newUser: any = {
        Name: Name,
        Code: Code,
        Status: Status,
      };

      let user = await country.findById(req.params.id);
      if (!user) {
        return Notification.NotFound(req, res, onmessage);
      }
      user = await country.findByIdAndUpdate(
        req.params.id,
        { $set: newUser },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// update multipal selected data for status 
router.post("/update", async (req: Request, res: Response) => {
  const { data, status } = req.body;


  try {
    const newUser: any = {
      Status: status,
    };

    data.map(async (x: any) => {
      let user = await country.findById(x);
      if (!user) {
        // return Notification.NotFound(req, res, onmessage);
      }
      await country.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Updated");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// GetByID api 
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let user = await country.findById(req.params.id);
    if (!user) {
      return Notification.NotFound(req, res, onmessage);
    }
    res.json(user);
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// Delete api
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const newUser: any = {
      Status: "2",
    };
    let user = await country.findById(req.params.id);
    if (!user) {
      return Notification.NotFound(req, res, onmessage);
    }
    user = await country.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// multipal selected data delete

router.post("/delete", async (req: Request, res: Response) => {
  const data = req.body;


  try {
    const newUser: any = {
      Status: "2",
    };

    data.map(async (x: any) => {
      let user = await country.findById(x);
      if (!user) {
        // return Notification.NotFound(req, res, onmessage);
      }
      await country.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Deleted");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

export default router;
