const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
