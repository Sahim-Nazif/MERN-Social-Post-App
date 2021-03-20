const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan');
const postRoutes = require('./routes/post')
const mongoose = require('mongoose')
const expressValidator=require('express-validator')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const cookieParser=require('cookie-parser')





dotenv.config()
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(expressValidator())
app.use(cookieParser())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log('the app is in development phase')

} else if (process.env.NODE_ENV === 'production') {

    app.use(compress());
    console.log('the app is in production phase ')
}

//db connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,

    })
    .then(() => console.log('Mongo-DB Connected...'))
    .catch(err => console.log(err));


app.use('/post', postRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.use((err,req,res, next)=>{

    if (err.name==='UnauthorizedError') {
        res.status(401).json({error:'Unauthroized!'})
    }
})

app.listen(process.env.PORT, () => {

    console.log(`The app is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)

})