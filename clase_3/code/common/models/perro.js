module.exports = function(Perro) {
    Perro.validatesUniquenessOf('nombre', {
        message: 'El Nombre del perro ya está en uso'
    });



    // un observer, o un hook
    Perro.observe('before save', function(ctx, next) {
        //SI CREO
        if (ctx.instance) {
            ctx.instance.edad_en_perro = ctx.instance.edad * 7;
            //SI UPDATEO
        } else {

        }
        //CONTINUO
        next();
    }); 


    // un 'remote method'
    Perro.saluden = function(cb) {
        cb(null, 'Guau! ' + msg);
    };

    Perro.remoteMethod('saluden', {
        accepts: {
            arg: 'msg',
            type: 'string'
        },
        returns: {
            arg: 'greeting',
            type: 'string'
        }
    });



    // un 'remote method' no estatico
    Perro.prototype.ladraTuNombre = function(cb) {
        var data = 'Guau! soy ' + this.nombre;
        cb(null, data);
    };
    Perro.remoteMethod('ladraTuNombre', {
        isStatic: false,
        accepts: [],
        returns: {
            arg: 'ladrido',
            type: 'string'
        },
        http: {
            verb: 'get',
            path: '/ladraTuNombre'
        }
    });


    // un 'remote method' POST
    Perro.prototype.ladraLoSiguiente = function(msg, cb) {
        var data =
            'Soy ' + this.nombre +
            '!! y ladro así -> ' + msg;
        cb(null, data);
    };
    Perro.remoteMethod('ladraLoSiguiente', {
        isStatic: false,
        accepts: [{
            arg: 'msg',
            type: 'string'
        }],
        returns: {
            arg: 'ladrido',
            type: 'string'
        },
        http: {
            verb: 'post',
            path: '/ladraLoSiguiente'
        }
    });





    // un 'remote method' POST
    Perro.prototype.ladraEstasDosCosas = function(msg, msg2, cb) {
        var data =
            'Soy ' + this.nombre +
            '!! y ladro así -> ' + msg +
            'o tambien así -> ' + msg2;
        cb(null, data);
    };
    Perro.remoteMethod('ladraEstasDosCosas', {
        isStatic: false,
        accepts: [{
            arg: 'msg',
            type: 'string'
        }, {
            arg: 'msg2',
            type: 'string'
        }],
        returns: {
            arg: 'ladrido',
            type: 'string'
        },
        http: {
            verb: 'post',
            path: '/ladraEstasDosCosas'
        }
    });



};

/*

    5514a0f9ff35f581a6396d34

*/
