import express, { Request, Response, } from 'express';
import country from "../mongo-models/country-schema";
export const router = express.Router();
import Notification from "../model/errorHelper";
import authenticator from '../middleware/authenticator';



// Post api --------------------------------------------------------------------------------------------------------
router.post("/create", async (req: Request, res: Response) => {

    try {
        const name = req.body.Name
        const code = req.body.Code
        const user = await country.create({
            Name: name.charAt(0).toUpperCase() + name.slice(1),
            Code: code.toUpperCase(),
            IsActive: req.body.IsActive
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }
});


// Get api ----------------------------------------------------------------------------------------------------------

router.get("/", async (req: Request, res: Response) => {
    try {
        let countrys;

        countrys = await country.find({ deleted: false });
        res.json(countrys);

    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }

})

// Put (edit) api ----------------------------------------------------------------------------------------------------

router.put("/update/:id", async (req: Request, res: Response) => {
    try {
        const {

            Name,
            Code,
            IsActive,
        } = req.body;

        const newUser: any = {
            Name: Name,
            Code: Code,
            IsActive: IsActive
        }

        let user = await country.findById(req.params.id);
        if (!user) {
            console.log(user);
            return Notification.NotFound(req, res, onmessage);
        }
        user = await country.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);

    }
});

// GetByID api -------------------------------------------------------------------------------------------------------------
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let user = await country.findById(req.params.id);
        if (!user) {
            return Notification.NotFound(req, res, onmessage);
        }
        res.json(user);

    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }

})

// Delete api -----------------------------------------------------------------------------------------------------
router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const newUser: any = {
            deleted: true
        }
        let user = await country.findById(req.params.id);
        if (!user) {
            return Notification.NotFound(req, res, onmessage);
        }
        user = await country.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        Notification.InternalError(req, res, error);
    }
})

export default router;
