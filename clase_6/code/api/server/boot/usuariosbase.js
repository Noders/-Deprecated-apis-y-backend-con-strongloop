module.exports = function(app) {
    /*
     * The `app` object provides access to a variety of LoopBack resources such as
     * models (e.g. `app.models.YourModelName`) or data sources (e.g.
     * `app.datasources.YourDataSource`). See
     * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
     * for more info.
     */
    var _ = require('lodash');

    var MiUsuario = app.models.miusuario;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Perro = app.models.perro;


    var createUsers = function() {
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
