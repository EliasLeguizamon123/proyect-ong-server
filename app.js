const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const activitiesRouter = require('./routes/activities');
const createError = require('http-errors')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const categoriesRouter = require('./routes/categories')
const testimonialsRouter = require('./routes/testimonials')
const membersRouter = require('./routes/members')
const contactsRouter = require('./routes/contacts')

const app = express()

// middlewares
app.use(morgan('combined'))
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
// TODO: we want to move to a individual file for routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
// app.use('/categories', categoriesRouter);
app.use('./testimonials', testimonialsRouter);
app.use('/categories', categoriesRouter);
app.use('/activities', activitiesRouter);
app.use("/members", membersRouter)
app.use('/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
