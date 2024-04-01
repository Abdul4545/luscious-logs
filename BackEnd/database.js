const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/Luscious-Logs";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    console.log("Connected to Mongoose Successfully");
}

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to Mongoose Successfully");
//     } catch (error) {
//         console.error("Error connecting to Mongoose:", error.message);
//         // Retry after a delay
//         setTimeout(() => connectToMongo(), 5000);
//     }
// };


module.exports = connectToMongo;

