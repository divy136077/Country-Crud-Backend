import express, { Request, Response, } from 'express';
import authenticator from '../middleware/authenticator';
export const cityRouter = express.Router();
import Notification from "../model/errorHelper";
import city from '../mongo-models/city-schema';


// Get api 

cityRouter.get("/",authenticator, async (req: Request, res: Response) => {
  try {
    let citys;
    const filters: any = req.query;
    let filter: any = {}
    !!filters.CityName && (filter.CityName = filters.CityName)
    !!filters.Status && (filter.Status = filters.Status)



    citys = await city.find({ Status: { $ne: "2" }, ...filter });
    res.json(citys);

  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }

})

// Post api 
cityRouter.post("/create",authenticator, async (req: Request, res: Response) => {
  try {
    const CityName = req.body.CityName
    let users = await city.findOne({
      CityName: CityName.charAt(0).toUpperCase() + CityName.slice(1),
      Status: { $ne: "2" },
    });
    if (users) {
      return res
        .status(400)
        .json({ error: "A City with the same Name already exists." });
    } else {
      const CityName = req.body.CityName
      const data = await city.create({
        CountryName: req.body.CountryName,
        StateName: req.body.StateName,
        CityName: CityName.charAt(0).toUpperCase() + CityName.slice(1),
        Status: req.body.Status
      });

      res.json(data);
    }
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});


// Put (edit) api 

cityRouter.put("/update/:id",authenticator, async (req: Request, res: Response) => {
  try {
    const {
      CountryName,
      StateName,
      CityName,
      Status,
      id
    } = req.body;

    let users = await city.findOne({
      CityName: CityName.charAt(0).toUpperCase() + CityName.slice(1),
      Status: { $ne: "2" },
      _id: { $ne: id }
    });
    if (users) {
      return res
        .status(400)
        .json({ error: "A City with the same Name already exists." });
    } else {

      const newUser: any = {
        CountryName: CountryName,
        StateName: StateName,
        CityName: CityName,
        Status: Status
      }


      let user = await city.findById(req.params.id);
      if (!user) {
        return Notification.NotFound(req, res, onmessage);
      }
      user = await city.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
      res.json(user);
    }
  } catch (error) {

    Notification.InternalError(req, res, error);

  }
});
// update multipal selected data status for status
cityRouter.post("/update",authenticator, async (req: Request, res: Response) => {
  const {
    data,
    status,
  } = req.body;
  try {
    const newUser: any = {
      Status: status,
    };
    data.map(async (x: any) => {
      let user = await city.findById(x);
      if (!user) {
        return Notification.NotFound(req, res, onmessage);
      }
      await city.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Updated");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
})

// GetByID api 
cityRouter.get("/:id",authenticator, async (req: Request, res: Response) => {
  try {
    let user = await city.findById(req.params.id);
    if (!user) {
      // return res.status(404).send("not found");
      return Notification.NotFound(req, res, onmessage);
    }

    res.json(user);

  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }

})

// Delete api 
cityRouter.delete("/delete/:id",authenticator, async (req: Request, res: Response) => {
  try {
    const newUser: any = {
      Status: "2"
    }
    let user = await city.findById(req.params.id);
    if (!user) {
      // return res.status(404).send("not found");
      return Notification.NotFound(req, res, onmessage);
    }
    user = await city.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
    res.json(user);
  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }
})

// multipal selected data delete

cityRouter.post("/delete",authenticator, async (req: Request, res: Response) => {
  const data = req.body;


  try {
    const newUser: any = {
      Status: "2",
    };

    data.map(async (x: any) => {
      let user = await city.findById(x);
      if (!user) {
        return Notification.NotFound(req, res, onmessage);
      }
      await city.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Deleted");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});





export default cityRouter;