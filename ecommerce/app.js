const express= require('express')
const mongoose= require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const expressValidator=require("express-validator");
const cors=require('cors')

require('dotenv').config()


//import routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const braintreeRoutes=require("./routes/braintree")
const orderRoutes=require("./routes/order")
//app
const app=express()

//db
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }
mongoose.connect(process.env.DATABASE ,options).then(()=>{
    console.log("DB Connected");
})


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//route middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",braintreeRoutes)
app.use("/api",orderRoutes)
const port=process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);

});



