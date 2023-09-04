const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// REQUIRED ROUTERS
const apiRouter = require('./routes/api.js');
const userRouter = require('./routes/users.js');
const postRouter = require('./routes/posts.js');

// PARSE JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, './../dist')));

// // serve index.html from bundled dist folder
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './../dist/index.html'));
// });

app.use('/api', apiRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// serve 404 status
// TODO: Add 404 html page
app.use((req, res) =>
  res.status(404).send('Ope! Looks like you took a wrong turn!'),
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Environments
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
}
console.log('NODE_ENV: ', process.env.NODE_ENV);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
