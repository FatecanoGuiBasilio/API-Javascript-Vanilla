var restify          = require('restify');
var clienteRoute     = require('./routes/clientes');
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*']
});

var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.pre(cors.preflight);
server.use(cors.actual);

clienteRoute(server);

/*
    carregando a pagina inicial
*/
server.get('/\/.*/', restify.plugins.serveStatic({
    directory: __dirname + "/",  default: './index.html' })
);

server.listen(3000, function(){
   console.log("Servidor escutando na porta: " + server.url);
});
