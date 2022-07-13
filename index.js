import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
    { id: 1, name: "Pedro H. Ribeiro", age: 23 },
    { id: 2, name: "Rafael Ribeiro", age: 31 },
    { id: 3, name: "Gabriel Custódio", age: 27 }
];

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
    return response.send("<h1>Trabalhando com servidor express.</h1>")
});

app.get("/users", (request, response) => {
    return response.send(users);
});

//GET
app.get("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId));
    })
    return response.send(user);
});

//POST
app.post("/users", (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

//PUT
app.put("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    const updatedUser = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }
        
        return user;
    });

    return response.send(updatedUser);
});

//DELETE
app.delete("/users/:userId", (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});