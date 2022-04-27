const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
const conn = require("./database/database");
const res = require("express/lib/response");
    //database
conn.authenticate().then(() => {
        console.log("conexao feita")
    }).catch((msgErro) => {
        console.log(msgErro)
    })
    //express utilizando o ejs como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
    //configurando o body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//rotas

app.get("/home", (req,res) => {
    res.render("home");    
})




app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true,
        order: [
            ['createdAt', 'desc']
        ]
    }).then(perguntas => {
        console.log(perguntas)
        res.render("index", {
            perguntas: perguntas
        })
    })

})

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/perguntas-salvas", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: { id: id }
        
    }).then(pergunta => {
        if (pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['createdAt' , 'desc']
                ] 
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta, 
                    respostas: respostas
                });
            })
        } else {
            res.redirect("/")
        }
    })
})

app.post("/responder", (req,res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId)
    });

});



app.listen(8080, () => {
    console.log("App rodando no localhost:8080")
})