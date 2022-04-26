import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import mongoose from 'mongoose';
import dbUrl from './database';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Database connected successfully");
}).catch(err => {
    console.log('MongoDB connection error: ' + err);
})

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;