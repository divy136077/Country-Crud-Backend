import express, { Request, Response, } from 'express';
import country from "../mongo-models/country-schema";
export const router = express.Router();



// Post api --------------------------------------------------------------------------------------------------------
router.post("/create", async (req: Request, res: Response) => {
   
    try {
        const user = await country.create({
            Name: req.body.Name,
            Code: req.body.Code,
            InActive: req.body.Inactive,
            IsActive: req.body.IsActive
        });
        res.json(user);
    } catch (error) {    
        res.status(500).send("Internal Server Error");
    }
});


// Get api ----------------------------------------------------------------------------------------------------------

router.get("/", async (req: Request, res: Response) => {
    try {
        let countrys;

        countrys = await country.find({});
        res.json(countrys);

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }

})

// Put (edit) api ----------------------------------------------------------------------------------------------------

router.put("/update/:id", async (req: Request, res: Response) => {
    try {
        const {
            Name,
            Code,
            InActive,
            IsActive,
        } = req.body;
        
        const newUser: any = {
            Name: Name,
            Code: Code,
            InActive: InActive,
            IsActive: IsActive
        }

        let user = await country.findById(req.params.id);
        if (!user) {
            console.log(user);
            return  res.status(404).send("User not Found");
            // return Error.NotFound(req, res, onmessage);
        }
        user = await country.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
        // Error.InternalError(req, res, error);

    }
});

// GetByID api -------------------------------------------------------------------------------------------------------------
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let user = await country.findById(req.params.id);
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
router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        let user = await country.findByIdAndRemove(req.params.id);
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

export default router;
