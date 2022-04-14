const express = require("express")
const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/perguntas-salvas", (req, res) => {
    res.send("perguntas")
})

app.listen(8080, () => {
    console.log("App rodando no localhost:8080")
})