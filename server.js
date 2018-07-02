const express = require('express');
const logger = require('./logger');
const dotenv = require('dotenv').config({ path: 'variables.env' });
const port = process.env.PORT || 8111;
const pjson = require('./package.json');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const exphbs = require('express3-handlebars');
const invoice_controller = require('./controllers/invoice');
const pdf_controller = require('./controllers/pdf');

const hbs = exphbs.create({
  defaultLayout: 'default',
  extname: '.handlebars'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/html/invoice/:id', function(req, res, next) {
  invoice_controller(req,res)
});
app.get('/invoice/:id' , function(req, res, next){
  pdf_controller(req,res);
})


http.listen(port);

logger.info(`${pjson.name} Server Started on http://localhost:${port} >> `);


