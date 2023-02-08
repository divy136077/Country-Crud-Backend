import express, { Request, Response, } from 'express';
import state from "../mongo-models/state-schema";
export const stateRouter = express.Router();
import Notification from "../model/errorHelper";


// Get api ----------------------------------------------------------------------------------------------------------

stateRouter.get("/", async (req: Request, res: Response) => {
    try {
        let states;
        let filter:any = {}
        const filters: any = req.query;
        !!filters.StateName && (filter.StateName = filters.StateName)
        !!filters.Status && (filter.Status = filters.Status )
        !!req.header('countryName') && (filter.CountryName = req.header('countryName'))
        console.log("====",filters);

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
        const data = await state.create({
            CountryName: req.body.CountryName,
            StateName: statename.charAt(0).toUpperCase() + statename.slice(1),
            Status: req.body.Status
        });

        res.json(data);
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
        } = req.body;

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


export default stateRouter;