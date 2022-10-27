import  Express  from "express";
import fileUpload  from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import Pembayaran from "./routes/PembayaranRouter.js"
import MuridRouter from "./routes/MuridRouter.js";
import UserRouter from "./routes/UsersRoute.js"
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
import Akademic from "./routes/Akademic.js"


dotenv.config();

const app=Express();

const sessionStore=SequelizeStore(session.Store);

const store=new sessionStore({
    db:db
})

// app.use(cors());



app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));


app.use(cors({ 
    credentials:true,
    origin: 'http://localhost:3000'
}));




app.use(Express.json()); 
app.use(fileUpload());
app.use(Pembayaran);
app.use(MuridRouter);
app.use(UserRouter);
app.use(AuthRoute);
app.use(Akademic);

app.use(Express.static("public"));


app.listen(5000, () => console.log('server running up ....'));
