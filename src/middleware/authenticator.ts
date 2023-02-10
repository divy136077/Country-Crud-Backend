// const jwt = require("jsonwebtoken");
// import dotenv from "dotenv";

// dotenv.config()

// const authenticator = (req: any, res: any, next: any) => {
 
//     let token = req.header('auth-token');
//     if (!token) {
//         res.status(401).json({error:"Please validate using valid token"})
//     }
//     try {
//         var data = jwt.verify(token, process.env.PRODUCT_KEY)
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).json({error:"Please validate using valid token"})
//     } 
   
    
// }

// export default authenticator