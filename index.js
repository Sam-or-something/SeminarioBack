const menu = require('./menu.json');
const express = require("express");
const app = express();
const port = 9000;

//EJ 1
app.get("/menu", (req, res) =>{
    res.json(menu);
});

//EJ 2
app.get("/menu/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    const plato = menu.find((plato) => plato.id === id);

    if(!plato){
        res.status(404).send("Not found.");
    }
    else{
        res.status(200).send(plato);
    }
});

//EJ 3
app.get("/principales", (req, res) =>{
    const principales = menu.filter((plato) => plato.tipo === "principal");
    res.json(principales);
});

//EJ 4
app.get("/postres", (req, res) =>{
    const postres = menu.filter((plato) => plato.tipo === "postre");
    res.json(postres);
});

//EJ 5
app.get("/bebidas", (req, res) =>{
    const bebidas = menu.filter((plato) => plato.tipo === "bebida");
    res.json(bebidas);
});

//EJ 6
app.use(express.json());
app.post("/pedido", (req, res) =>{
    const pedido = req.body.productos;
    let precio = 0;

    pedido.forEach(producto => {
        const plato = menu.find((plato) => plato.id === producto.id);
        precio += plato.precio * producto.cantidad;
    });
    res.json(precio);
});


const users = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "James Smith"},
    {id: 3, name: "Jane Doe"},
    {id: 4, name: "Jane Smith"}
];

app.get("/", (req, res) => {
    res.send("API running OK...");
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) =>{
    const id = parseInt(req.params.id);

    const user = users.find((user) => user.id == id);

    if(!user)
        res.status(404).send("User not found");
    else
        res.status(200).json(user);
});

app.listen(port, () => {
    console.log(`> Server running on port ${port}`);
});
