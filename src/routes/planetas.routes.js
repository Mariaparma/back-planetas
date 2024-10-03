import { Router } from "express";

const planetasRoutes = Router();

let planetas = [
    {
        id: Number(Math.floor(Math.random() * 999999)+1),
        nome: "Dev",
        temperatura: 13.3,
        agua: false, //Indicação de existencia de água
        atm: [ "JS", "NODE", "Code"]
    },
];

// Rota para buscar todos os elementos do array planetas marcantes
planetasRoutes.get("/", (req, res) => {
    return res.status(200).send(planetas);
});

// Rota para cadastrar novo planeta 
planetasRoutes.post("/", (req, res) => {
    const { nome, temperatura, agua, atm } = req.body;

    if (!nome || !temperatura || !agua) {
        return res.status(400).send({
            message:"Os campos nome, temperatura e água são obrigatórios",
        })
    }
//validação de existencia de agua
    if (agua != "sim" &&  agua != "não") {
        return res.status(400).send ({
            message: "Digite 'sim' ou 'nao'",
        });
    } 

    const novoPlaneta = {
        id: Number(Math.floor(Math.random() * 999999)+1),
        nome,
        temperatura,
        agua,
        atm,
    }

    planetas.push(novoPlaneta);

    return res.status(201).send({
        message:"Planeta cadastrado!",
        novoPlaneta
    });
});

// Rota para buscar um elemento especifico do array planetas marcantes
planetasRoutes.get("/:id", (req, res) => {
    const { id } = req.params;

  //console.log(id);

    const filme = planetasMarcantes.find((movie) => movie.id === Number(id));

    //console.log(id);

    if (filme) {
        return res.status(404).send({ message: "Filme não encontrado!"});
    }

    return res.status(200).send(filme);
});

// Rota para editar uma filme
planetasRoutes.put("/:id", (req, res) => {
    const { id } = req.params;

    const filme = planetasMarcantes.find((movie) => movie.id === Number(id));

    console.log(filme);

    if (!filme) {
        return res.status(404).send({ message: "filme não encontrado!"});
    }

    const { titulo,genero,emCartaz } = req.body;
    //console.log(filme);

    filme.titulo = titulo
    filme.genero = genero
    filme.emCartaz = emCartaz

    return res.status(200).send({
        message: "filme atualizado!",
        filme,
    });
});

// Rota para deletar um planetas
planetasRoutes.delete("/:id", (req, res) => {
    const { id } = req.params

    const filme = planetasMarcantes.find((movie) => movie.id === Number(id));

    if (!filme) {
        return res.status(404).send({ message: "filme não encontrado!"});
    }

    planetasMarcantes = planetasMarcantes.filter((movie) => movie.id !== Number(id));

    return res.status(200).send({
        message: "filme deletado!",
        filme,
    });
});

export default planetasRoutes;
