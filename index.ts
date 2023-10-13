import app from './server.ts';
const PORT_SERVER = 5000;

app.listen(PORT_SERVER, () => {
  console.log(`Server is running at ${PORT_SERVER}`);
});