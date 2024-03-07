// modulos
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

var whitelist = [process.env.FRONTEND_URL]
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// archivos
import conecctarDB from './db/db.js';
import userRouter from './routes/userRouter.js';
import pacienteRouter from './routes/pacienteRouter.js';


conecctarDB();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/users', userRouter);
app.use('/api/pacientes', pacienteRouter);


app.listen(8080, () => console.log('servidor listo'));