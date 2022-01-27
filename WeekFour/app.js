const PORT = process.env.PORT || 5000;

const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5baa2528563f16379fc8a610')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://Gmvwt8NmajR6HXR:wTmZTEXhBU6uc8f@cluster0.fgsrg.mongodb.net/shop?retryWrites=true&w=majority";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

mongoose.connect(MONGODB_URL, options)
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });

const corsOptions = {
    origin: "https://johns-online-store.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));