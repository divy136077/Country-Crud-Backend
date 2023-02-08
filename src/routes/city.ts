import express, { Request, Response, } from 'express';
export const cityRouter = express.Router();
import Notification from "../model/errorHelper";
import city from '../mongo-models/city-schema';


// Get api ----------------------------------------------------------------------------------------------------------

cityRouter.get("/", async (req: Request, res: Response) => {
    try {
        let citys;
         const filters: any = req.query;
        console.log("====",filters);

        citys = await city.find({ Status: { $ne: "2" }, ...filters });
        res.json(citys);

    }
    catch (error) {
        
        Notification.InternalError(req, res, error);
    }

})

// Post api --------------------------------------------------------------------------------------------------------
cityRouter.post("/create", async (req: Request, res: Response) => {
    try {
        const CityName = req.body.CityName
        const data = await city.create({
            CountryName: req.body.CountryName,
            StateName: req.body.StateName,
            CityName: CityName.charAt(0).toUpperCase() + CityName.slice(1),
            Status: req.body.Status
        });

        res.json(data);
    } catch (error) {
        Notification.InternalError(req, res, error);
    }
});

// Put (edit) api ----------------------------------------------------------------------------------------------------

cityRouter.put("/update/:id", async (req: Request, res: Response) => {
    try {
        const {
            CountryName,
            StateName,
            CityName,
            Status,
        } = req.body;

        const newUser: any = {
            CountryName: CountryName,
            StateName: StateName,
            CityName: CityName,
            Status: Status
        }
        
        
        let user = await city.findById(req.params.id);
        if (!user) {
           
            // return  res.status(404).send("User not Found");
            return Notification.NotFound(req, res, onmessage);
        }
        user = await city.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {
       
        Notification.InternalError(req, res, error);

    }
});

// GetByID api -------------------------------------------------------------------------------------------------------------
cityRouter.get("/:id", async (req: Request, res: Response) => {
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

// Delete api -----------------------------------------------------------------------------------------------------
cityRouter.delete("/delete/:id", async (req: Request, res: Response) => {
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





export default cityRouter;