slc loopback:boot-script  

{
    "username": "admin",
    "email": "admin@noders.com",
    "password": "admin"
}



module.exports = function(app) {
    var _ = require('lodash');
    /*
     * The `app` object provides access to a variety of LoopBack resources such as
     * models (e.g. `app.models.YourModelName`) or data sources (e.g.
     * `app.datasources.YourDataSource`). See
     * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
     * for more info.
     */
    var MiUsuario = app.models.miusuario;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Perro = app.models.perro;

    function createUsers() {
        MiUsuario.create([{
            username: 'fforres',
            email: 'fforres@noders.com',
            password: 'fforres'
        }, {
            username: 'test',
            email: 'test@noders.com',
            password: 'test'
        }, {
            username: 'admin',
            email: 'admin@noders.com',
            password: 'admin'
        }], function(err, users) {
            if (err) return console.log(err);
            createPerros(users);
            Role.create({
                name: 'admin'
            }, function(err, role) {
                if (err) return console.log(err);
                console.log(role);
                //Convertir a "admin" en admin
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: users[2].id
                }, function(err, principal) {
                    if (err) return console.log(err);
                    console.log(principal);
                });
            });
        });
    }


    function createPerros(users) {
        _.each(users, function(user, i) {
            var perros = [];
            for (var i = 0; i < 10; i++) {
                perros.push({
                    nombre: 'Perro_' + i,
                    edad: i,
                    noderId: user.id
                });
            }
            Perro.create(perros, function(err, perros) {
                if (err) return console.log(err);
            });
        });
    }

    createUsers();
};

npm install node-pre-gyp -g

slc build --install
    Instala las dependencias (npm install)
    Remueve las dependencias de Desarrollo (Como bower o Grunt)
slc build --bundle 
    Configura el package.json and .npmignore files
    (
      Ignora dependencias de deployment internas de loopback
      innecesario para GIT, necesario para NPM
    )
slc build --pack
  GENERA EL ARCHIVO .TAR.GZ

slc pm
  process manager

slc deploy -s app http://127.0.0.1:8701 clase_2-1.0.0.tgz

slc ctl -C http://127.0.0.1:8701



