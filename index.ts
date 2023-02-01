import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import router from './src/routes/country';
import stateRouter from './src/routes/state';
import cityRouter from './src/routes/city';
import { userRouter } from './src/routes/user';



const mongoURL = 'mongodb://127.0.0.1:27017/crud'

mongoose.connect(mongoURL, () => {
    console.log('Connected to Database.');
})

const app = express()

const PORT = 8000;
app.use(express.json());
app.use(cors())


app.use("/user",userRouter)
app.use("/state", stateRouter);
app.use("/city", cityRouter)
app.use("/", router);



app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})