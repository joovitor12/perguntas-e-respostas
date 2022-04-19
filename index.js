const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
const conn = require("./database/database")
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
            res.render("pergunta", {
                pergunta: pergunta
            });
        } else {
            res.redirect("/")
        }
    })
})



app.listen(8080, () => {
    console.log("App rodando no localhost:8080")
})