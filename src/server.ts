import mongoose from "mongoose";
import app from "./app";


async function main() {
    try {
        await mongoose.connect('mongodb+srv://BookNest:booknest@assignment-three.rbjgrfq.mongodb.net/?retryWrites=true&w=majority&appName=assignment-three')
        app.listen(5000, () => {
            console.log(`App is listen port 5000`);
        })
    } catch (error) {
        console.log(error);
    }
}

main()