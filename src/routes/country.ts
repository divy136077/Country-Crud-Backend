import express, { Request, Response, } from 'express';
import country from "../mongo-models/country-schema";
export const router = express.Router();
import Notification from "../model/errorHelper";
import authenticator from '../middleware/authenticator';
import { handleSearchValues } from '../model/config';



// Post api --------------------------------------------------------------------------------------------------------
router.post("/create", async (req: Request, res: Response) => {

    try {
        const name = req.body.Name


        let users = await country.findOne({ Name: name.charAt(0).toUpperCase() + name.slice(1) });


        if (users) {
            return res
                .status(400)
                .json({ error: "A User with the same Name already exists." });
        } else {
            const name = req.body.Name
            const code = req.body.Code
            const user = await country.create({
                Name: name.charAt(0).toUpperCase() + name.slice(1),
                Code: code.toUpperCase(),
                Status: req.body.Status
            });
            res.json(user);
        }
    } catch (error) {

        Notification.InternalError(req, res, error);
    }
});


// Get api ----------------------------------------------------------------------------------------------------------

router.get("/", async (req: Request, res: Response) => {
    try {
        let countrys;
        const filters: any = req.query;
        console.log("====",filters);
        
        // const newFilters: any = handleSearchValues(filters)
      
        // let searchobj = filters;
        // searchobj.Status = { $ne: '2' }
        // console.log('2',searchobj);

        countrys = await country.find({Status:{$ne:'2'}, ...filters});
        res.json(countrys);
        console.log('3' ,countrys);


    }
    catch (error) {

        Notification.InternalError(req, res, error);
    }

})


// router.get("/getAll", async (req: Request, res: Response) => {
//     try {
//         // let countrys;
//         // const filters: any = req.query;
//         // const newFilters: any = handleSearchValues(filters)
//         // console.log(newFilters);

//        let countrys = await country.find({Status:{$ne:'2'}});
//         res.json(countrys);
//         console.log(countrys);


//     }
//     catch (error) {

//         Notification.InternalError(req, res, error);
//     }

// })

// Put (edit) api ----------------------------------------------------------------------------------------------------

router.put("/update/:id", async (req: Request, res: Response) => {
    try {

        const {

            Name,
            Code,
            Status,
        } = req.body;

        const newUser: any = {
            Name: Name,
            Code: Code,
            Status: Status
        }

        let user = await country.findById(req.params.id);
        if (!user) {

            return Notification.NotFound(req, res, onmessage);
        }
        user = await country.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {

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

        Notification.InternalError(req, res, error);
    }

})

// Delete api -----------------------------------------------------------------------------------------------------
router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
        const newUser: any = {
            Status: "2"
        }
        let user = await country.findById(req.params.id);
        if (!user) {
            return Notification.NotFound(req, res, onmessage);
        }
        user = await country.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true });
        res.json(user);
    }
    catch (error) {

        Notification.InternalError(req, res, error);
    }
})

export default router;
