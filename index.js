const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

app.use(bodyParser.json())

const db = require('./db.json')
const { error } = require('console') 

app.get('/produtos/', function (req, res){
    var produtos = db.produto
    res.json(produtos)
})

app.get('/produtos/:id', function (req, res) {
    const _id = parseInt(req.params.id); 
    /*The req. params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}.*/
    const lista_produtos = db.prod; 

    // Encontrar o produto com o ID correspondente
    const produto = lista_produtos.find(produto => produto.id === _id);

    produto ? res.json(produto) : res.status(404).send({error:"not found"})
});


app.post('/produtos', function(req, res){
    const data = req.body; //pegar informações da resquisição body
    

    if(!data.nome || !data.preco){
        res.status(406).send({error: 'Nome e preço devem ser informados'})  
    }  
    const _id = uuidv4()
    data.id = _id

    lista_produtos = db.produto
    lista_produtos.push(data)

    fs.writeFile('./db.json', JSON.stringify(db), (err)=> {
        if (err){
            res.status(500).send({error: "Houve um erro"})
        }
    })
    res.status(204).send()
});


app.delete
    
// Iniciar o servidor
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});


