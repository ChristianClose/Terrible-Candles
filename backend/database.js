import mongoose from 'mongoose';

const databaseConnection = async () => {
    const { DB_SCHEME, DB_HOST, DB_USER, DB_PASS } = process.env;
    try {
        await mongoose.connect(`${DB_SCHEME}${DB_USER}:${DB_PASS}@${DB_HOST}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connected to Mongo Database successfully");
    } catch (error) {
        console.log(error);
    }


};

export default databaseConnection;