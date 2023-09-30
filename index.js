const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();

const tasksRouter = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

routes.get('/', (req, res) => {
  res.status(200).send('Airtribe Assignment Task Manager App');
});

app.use('/tasks', tasksRouter);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running and App is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
