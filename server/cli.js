'use strict';
const R = require('ramda');

const bcrypt = require('bcrypt');
const argv = require('minimist')(process.argv.slice(2));
const models = require('./models');
// to destroy the db and recreate a user admin
// node cli.js --username=<user> --password=<pass> --sync

var actions = {};
if (!argv.sync && argv.username && argv.password){
    actions  = newUser()
} else if (argv.sync && argv.username && argv.password){
    actions = sync().then(newUser)
} else if ( argv.sync){
    actions = sync()
}

actions
    .then(disconnect)
    .catch(L.tapArgs);

// node cli.js --sync
function sync() {
    return  models.sequelize.sync({ force: true })
}

// node cli.js --username=<user> --password=<pass>
function newUser() {
    return bcrypt.hash(argv.password, 10)
        .then(R.compose(
            models.user.create.bind(models.user),
            R.merge({ username: argv.username, isMSI: true}),
            R.objOf('password_hash')))
        .then(R.pick(['username', 'id', 'password_hash']))
        .then((user) => console.log(user.username, 'created succesfully, with id: ', user.id))
}

function disconnect(){
    models.sequelize.close();
}
