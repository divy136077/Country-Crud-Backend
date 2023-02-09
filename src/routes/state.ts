import express, { Request, Response, } from 'express';
import state from "../mongo-models/state-schema";
export const stateRouter = express.Router();
import Notification from "../model/errorHelper";


// Get api ----------------------------------------------------------------------------------------------------------

stateRouter.get("/", async (req: Request, res: Response) => {
  try {
    let states;
    let filter: any = {}
    const filters: any = req.query;
    !!filters.StateName && (filter.StateName = filters.StateName)
    !!filters.Status && (filter.Status = filters.Status)
    !!req.header('countryName') && (filter.CountryName = req.header('countryName'))


    states = await state.find({ Status: { $ne: "2" }, ...filter });
    res.json(states);

  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }

})

// Post api --------------------------------------------------------------------------------------------------------
stateRouter.post("/create", async (req: Request, res: Response) => {
  try {

    const statename = req.body.StateName
    let users = await state.findOne({
      StateName: statename.charAt(0).toUpperCase() + statename.slice(1),
      Status: { $ne: "2" },
    });
    if (users) {
      return res
        .status(400)
        .json({ error: "A State with the same Name already exists." });
    } else {
      const statename = req.body.StateName
      const data = await state.create({
        CountryName: req.body.CountryName,
        StateName: statename.charAt(0).toUpperCase() + statename.slice(1),
        Status: req.body.Status
      });

      res.json(data);
    }
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});


// Put (edit) api ----------------------------------------------------------------------------------------------------

stateRouter.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const {
      CountryName,
      StateName,
      Status,
      id
    } = req.body;

    let users = await state.findOne({
      Name: StateName.charAt(0).toUpperCase() + StateName.slice(1),
      Status: { $ne: "2" },
      _id: { $ne: id }
    });
    if (users) {
      return res
        .status(400)
        .json({ error: "A State with the same Name already exists." });
    } else {

      const newUser: any = {
        CountryName: CountryName,
        StateName: StateName,
        Status: Status
      }

      let user = await state.findById(req.params.id);
      if (!user) {

        // return  res.status(404).send("User not Found");
        return Notification.NotFound(req, res, onmessage);
      }
      user = await state.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
      res.json(user);
    }
  }
  catch (error) {

    Notification.InternalError(req, res, error);

  }
});



// GetByID api -------------------------------------------------------------------------------------------------------------
stateRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    let user = await state.findById(req.params.id);
    if (!user) {
      // return res.status(404).send("not found");
      return Notification.NotFound(req, res, onmessage);
    }
    // user = await User.findById({Success: "});
    res.json(user);

  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }

})

// update multipal selected data for status
stateRouter.post("/update", async (req: Request, res: Response) => {
  const { data, status } = req.body;


  try {
    const newUser: any = {
      Status: status,
    };

    data.map(async (x: any) => {
      let user = await state.findById(x);
      if (!user) {
        return Notification.NotFound(req, res, onmessage);
      }
      await state.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Updated");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

// Delete api -----------------------------------------------------------------------------------------------------
stateRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  try {

    const newUser: any = {
      Status: "2"
    }
    let user = await state.findById(req.params.id);
    if (!user) {
      // return res.status(404).send("not found");
      return Notification.NotFound(req, res, onmessage);
    }
    user = await state.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
    res.json(user);
  }
  catch (error) {

    Notification.InternalError(req, res, error);
  }
})

// multipal selected data delete

stateRouter.post("/delete", async (req: Request, res: Response) => {
  const data = req.body;


  try {
    const newUser: any = {
      Status: "2",
    };

    data.map(async (x: any) => {
      let user = await state.findById(x);
      if (!user) {
        // return Notification.NotFound(req, res, onmessage);
      }
      await state.findByIdAndUpdate(x, { $set: newUser }, { new: true });
    });
    res.json("Deleted");
  } catch (error) {
    Notification.InternalError(req, res, error);
  }
});

export default stateRouter;