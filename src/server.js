import app from './app';

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Express server listening on port`, port);
});
// app.listen(3333);
