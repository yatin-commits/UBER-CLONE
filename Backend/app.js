    // const dotenv = require('dotenv');
    // dotenv.config();

    import express from 'express';
    import connectToDb from './db/db.js';
    import userRoutes from './routes/userRoute.js'
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/users',userRoutes);


    connectToDb();

    app.get('/', (req, res) => {
        res.send("Hello World");
    });

    app.listen(3000, () => {
        console.log("Server is listening at 3000");
    });

    export default app;
