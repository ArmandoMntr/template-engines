const express = require('express');
const ProductosApi = require('./api/productos');
const handlebars = require('express-handlebars');
const app = express();

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.set('views', 'views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productosApi = new ProductosApi();

app.get('/', (req, res) => {
  res.render('layouts/main');
});

app.get('/productos', async (req, res) => {
  const productos = await productosApi.all();
  res.render('layouts/productos', {
    productos: productos,
    layout: 'productos',
  });
});

app.post('/productos', async (req, res) => {
  const producto = await productosApi.save(req.body);
  res.redirect('/');
});

const server = app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
server.on('error', (err) => {
  console.log(err);
});