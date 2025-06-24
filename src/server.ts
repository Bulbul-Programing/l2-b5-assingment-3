import mongoose from "mongoose";
import app from "./app";


async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        app.listen(5000, () => {
            console.log(`App is listen port 5000`);
        })
    } catch (error) {
        console.log(error);
    }
}

main()