import mongoose from "mongoose";

const conectarDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log('db conectada'))

    } catch (error) {
        console.log(error);
    }

}

export default conectarDB;