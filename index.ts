import Database from "better-sqlite3";
import express from "express";
import cors from "cors";

const app = express();
const db = new Database("db.sqlite", { verbose: console.log });

app.use(cors());
app.use(express.json());
const port = 4000;

// museum part

const getAllMuseums = db.prepare(`
    SELECT * FROM museums;
`)

const getSelectedMuseum = db.prepare(`
    SELECT * FROM museums WHERE id = ?;
`)

const createMuseum = db.prepare(`
    INSERT INTO museums (name, city) VALUES (?, ?);
`)

// works part

const getAllWorks = db.prepare(`
    SELECT * FROM works;
`)

const getSelectedWork = db.prepare(`
    SELECT * FROM works WHERE id = ?;
`)

const getWorksByMuseum = db.prepare(`
    SELECT * FROM works WHERE museumId = ?;
`)

const createWork = db.prepare(`
    INSERT INTO works (name, museumId) VALUES (?, ?);
`)

const changeMuseumId = db.prepare(`
    UPDATE works SET museumId = ? WHERE id = ?;
`)

app.get("/museums", (req, res) => {
    const museums = getAllMuseums.all();
    for(let museum of museums) {
        const works = getWorksByMuseum.all(museum.id);
        museum.works = works;
    }
    res.send(museums);
})

app.get("/museums/:id", (req, res) => {
    const id = req.params.id;
    const museum = getSelectedMuseum.get(id);

    if(museum) {
        const works = getWorksByMuseum.all(museum.id)
        museum.works = works;
        res.send(museum);
    } else{
        res.status(404).send({ error: "Museum not found"});
    }
})

app.post("/museums", (req, res) => {
    const name = req.body.name;
    const city = req.body.city;

    const errors: string[] = [];

    if(typeof name !== "string") {
        errors.push("The name is not provided or is not a string");
    }
    if(typeof city !== "string") {
        errors.push("The city is not provided or is not a string");
    }

    if(errors.length === 0) {
        const info = createMuseum.run(name, city)
        const museum = getSelectedMuseum.get(info.lastInsertRowid);
        const works = getWorksByMuseum.all(museum.id);
        museum.works = works;
        res.send(museum);
    } else {
        res.status(400).send({ error: errors });
    }
})

app.get("/works", (req, res) => {
    const works = getAllWorks.all();
    for(let work of works) {
        const museum = getSelectedMuseum.get(work.museumId);
        work.museum = museum;
    }
    res.send(works);
})

app.get("/works/:id", (req, res) => {
    const id = req.params.id;
    const work = getSelectedWork.get(id);

    if(work) {
        const museum = getSelectedMuseum.get(work.museumId);
        work.museum = museum;
        res.send(work);
    } else {
        res.status(404).send({ error: "Work not found"});
    }
})

app.post("/works", (req, res) => {
    const name = req.body.name;
    const artist = req.body.artist;
    const image = req.body.image;
    const museumId = req.body.museumId;

    const errors: string[] = [];

    if(typeof name !== "string") {
        errors.push("The name is not provided or is not a string");
    }
    if(typeof artist !== "string") {
        errors.push("The artist is not provided or is not a string");
    }
    if(typeof image !== "string") {
        errors.push("The image is not provided or is not a string");
    }
    if(typeof museumId !== "number") {
        errors.push("The museumId is not provided or is not a number");
    }

    if(errors.length === 0) {
        const info = createWork.run(name, artist, image, museumId);
        const work = getSelectedWork.get(info.lastInsertRowid);
        const museum = getSelectedMuseum.get(work.museumId);
        work.museum = museum;
        res.send(work);
    } else {
        res.status(400).send({ error: errors });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})