import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { writeData } from "./db" 
import { FinalMessage } from "./types"
import cors from "cors"

dotenv.config();

const app = express();

app.use(cors({
    origin: [`${process.env.FRONTEND_URL||"http://localhost:3000"}`],
    methods: ["GET","POST"]
}));
//app.use(cors())

app.use(express.json());

const bport = process.env.BACKEND_PORT||6969

app.get("/", async (req: Request, res: Response) => {
    await res.send("Working !!!");
})

app.post("/register", async (req: Request, res: Response) => {
    let msg: FinalMessage = {message: "", flag: -1};
    try {
        const result = await writeData(req.body);
        if (result.flag==0){
            msg = {flag: 0, message: "Form Submitted Successfully"};
        } else if (result.flag==1){
            msg = {flag: 1, message: "Employee ID already Exists"};
        } else if (result.flag==2) {
            msg = {flag: 2, message: "The Email is already in use"};
        }
    } catch(e) {
        msg = {flag: 3, message: "Internal Server Error"};
    }
    await res.send({
        flag: msg.flag,
        message: msg.message
    });
})

app.listen(bport, () => {
    console.log(`Listening at port ${bport}`);
})

