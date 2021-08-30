const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const layouts = require('handlebars-layouts');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//initiate handlebars for express
const hbs = exphbs.create({
});

//Register handlebar-layouts helpers on handlebars
hbs.handlebars.registerHelper(layouts(hbs.handlebars));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure and link a session object with the sequelize store
const sess = {
    secret: process.env.SESSION_SECRET || 'Test Session Secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Add express-session and store as Express.js middleware
app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// default *GET /* to public/index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); 
});

// Serve up the public folder on the root
app.use(express.static(path.join(__dirname, 'public')));

// use the routes in the route folder
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
