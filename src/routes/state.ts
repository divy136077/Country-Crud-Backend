import express, { Request, Response, } from 'express';
import state from "../mongo-models/state-schema";
export const stateRouter = express.Router();


// Get api ----------------------------------------------------------------------------------------------------------

stateRouter.get("/", async (req: Request, res: Response) => {
    try {
        let states;

        states = await state.find({});
        res.json(states);

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }

})

// Post api --------------------------------------------------------------------------------------------------------
stateRouter.post("/create", async (req: Request, res: Response) => {
    try {
        const data = await state.create({
            CountryName: req.body.CountryName,
            StateName: req.body.StateName,
            IsActive: req.body.IsActive
        });
        res.json(data);
    } catch (error) {    
        res.status(500).send("Internal Server Error");
    }
});

// Put (edit) api ----------------------------------------------------------------------------------------------------

stateRouter.put("/update/:id", async (req: Request, res: Response) => {
    try {
        const {
            CountryName,
            StateName,
            IsActive,
        } = req.body;
        
        const newUser: any = {
            CountryName: CountryName,
            StateName: StateName,
            IsActive: IsActive
        }

        let user = await state.findById(req.params.id);
        if (!user) {
            console.log(user);
            return  res.status(404).send("User not Found");
            // return Error.NotFound(req, res, onmessage);
        }
        user = await state.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
        // Error.InternalError(req, res, error);

    }
});

// GetByID api -------------------------------------------------------------------------------------------------------------
stateRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        let user = await state.findById(req.params.id);
        if (!user) {
            return res.status(404).send("not found");
        }
        // user = await User.findById({Success: "});
        res.json(user);

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }

})

// Delete api -----------------------------------------------------------------------------------------------------
stateRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        let user = await state.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).send("not found");
        }
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
})

export default stateRouter;