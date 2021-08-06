//Ejemplos clase
const express = require("express");
const app = express();

//Método .all es valido para todos los métodos
// app.all("/all", function (req, res) {
//     console.log("Llamada al servidor");
//     res.send("Hola from express server");
// });

//Endpoints con expresiones "/ab*cd/"" todo lo que empiece por ab y acabe en cd
//Endpoints con expresiones /a/ todo aquel que contenga una a pasara por el

//Middleware (.use) no hace falta que tengan asociado un verbo rest
// app.use((req, resp, next) => {
//     console.log("Hola desde el middleware global");
//     next();
// });

// app.use("/ruta", (req, res, next) => {
//     console.log("Hola desde el middleware global de ruta");
//     next();
// })

// app.get("/ruta/a", (req, res, next) => {
//     console.log("Hola desde el middleware de /ruta/a");
//     next();
// }, (req, res) => res.send("Hola desde /ruta/a"));

// app.listen(3000);

//Creación y manejo de objetos del tipo JSON entre cliente y servidor
//Parte de código necesaria para poder interactuar con JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Creación del objeto a tratar
let usuario = null; //{nombre: Jaime, apellidos: Perez Loset}

//Método GET portada
app.get("/",
        function(request, response)
        {
            let respuesta = {error: true, código: 200, mensaje: "Punto de inicio"};
            response.send(respuesta);
        });

//Método GET usuario
app.get("/usuario",
        function(request, response)
        {
            let respuesta;
            if (usuario != null) {
                respuesta = usuario;
            }
            else {
                respuesta = {error: 200, mesaje: "El usuario no existe"};
            }
            response.send(respuesta);
        });

//Pasar parametros con método GET para buscar info
//Opción 1 con valor del parámetro en la URL
// app.get("/usuario/:name",
//     function(request, response)
//     {
//         let name = request.params.name;
//         if (usuario != null && name === usuario.nombre) {
//             response.send(usuario);
//         }
//         else {
//             response.send({error: true, codigo: 200, 
//                             mensaje: "El usuario no existe"});
//         }
//     });

//Opción 2 con "? parámetro = valor"
app.get("/usuario",
        function(request, response)
        {
            let name = request.query.name;
            let respuesta;

            if (usuario != null && (!name || name == usuario.nombre)) {
                respuesta = usuario;
            }
            else {
                respuesta = {error: true, codigo: 200,
                            mensaje: "El usuario no existe"};
            }
            response.send(respuesta);
        });

//Método POST /usuario
app.post("/usuario", 
        function (request, response) 
        {
            // let respuesta;
            if (usuario === null)
            {
                usuario = {nombre: request.body.nombre1,
                           apellidos: request.body.apellido1};
                respuesta = {error: false, codigo: 200,
                            mensaje: "Usuario creado", 
                            resultado: usuario};
            }
            else {
                respuesta = {error: true, codigo: 200,
                            mensaje: "Usuario ya existe",
                            resultado: null};
            }
            response.send(respuesta);
        });

//Método PUT /usuario
app.put("/usuario",
        function(request, response)
        {
            let respuesta;
            if (usuario != null) {
               usuario.nombre = request.body.nombre1;
               usuario.apellidos = request.body.apellido1;
               respuesta = {error: false, codigo: 200,
                            mensaje: "Usuario actualizado",
                            resultado : usuario}; 
            }
            else {
                respuesta = {error: true, codigo: 200,
                            mensaje:"El usuario no existe",
                            resultado: usuario};
            }
            response.send(respuesta);
        })
//Método DELETE /usuario
app.delete("/usuario",
        function (request, response)
        {
            let respuesta;
            if (usuario != null) {
                usuario = null;
                respuesta = {error: false, codigo: 200,
                            mensaje: "Usuario borrado",
                            respuesta: usuario};
            }
            else {
                respuesta = {error: true, codigo: 200,
                            mensaje: "El usuario no existe",
                            resultado: usuario};
            }
            response.send(respuesta);
        });

//Middleware para el resto de URLs no definidas
app.use(function(req,res,next)
        {
            respuesta = {error: true, codigo: 404,
                        mensaje: "URL no encontrada"};
            res.status(404).send(respuesta);
        });

app.listen(4000);