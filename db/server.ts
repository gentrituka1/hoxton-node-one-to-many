import Database from "better-sqlite3";

const db = Database('./db/db.sqlite', { verbose: console.log });

function everythingMuseum(){
    const museums = [
        {
            id: 1,
            name: "THE UFFIZI GALLERIES",
            city: "Florence"
        },
        {
            id: 2,
            name: "THE BRITISH MUSEUM",
            city: "London"
        },
        {
            id: 3,
            name: "THE METROPOLITAN MUSEUM OF ART",
            city: "New York"
        },
        {
            id: 4,
            name: "THE LOUVRE",
            city: "Paris"
        }
    ]

    const createMuseumsTable = db.prepare(`
        CREATE TABLE IF NOT EXISTS museums (
            id INTEGER,
            name TEXT,
            city TEXT,
            country TEXT,
            PRIMARY KEY (id)
        );
    `)
    createMuseumsTable.run();

    const createNewMuseum = db.prepare(`
        INSERT INTO museums (name, city, country) VALUES (?, ?, ?);
    `)
    createNewMuseum.run()

    const deleteMuseum = db.prepare(`
        DELETE FROM museums;
    `)
    deleteMuseum.run()

    const deleteSelectedMuseum = db.prepare(`
        DELETE FROM museums WHERE id = ?;
    `)
    deleteSelectedMuseum.run()

    for(let museum of museums){
        createNewMuseum.run(museum.name, museum.city)
    }
}

everythingMuseum()

function everythingWork(){
    const works = [
        {
            id: 1,
            name: "Mona Lisa",
            artist: "Leonardo da Vinci",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Gioconda_%28copia_del_Museo_del_Prado_restaurada%29.jpg/800px-Gioconda_%28copia_del_Museo_del_Prado_restaurada%29.jpg",
            museumId: 4
        },
        {
            id: 2,
            name: "PARTHENON MARBLES",
            artist: "Phidias",
            image: "https://cdn.shortpixel.ai/spai/w_634+q_lossy+ret_img+to_webp/https://www.untoldmorsels.com/wp-content/uploads/2017/02/Parthenon-marbles-Elgin-marbles-freize.jpg",
            museumId: 2
        },
        {
            id: 3,
            name: "Venus de Milo",
            artist: "Alexandros of Antioch",
            image: "https://cdn.pariscityvision.com/library/image/5495.jpg",
            museumId: 4
        },
        {
            id: 4,
            name: "The Birth of Venus",
            artist: "Sandro Botticelli",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Botticelli_-_Birth_of_Venus_-_Google_Art_Project.jpg/800px-Botticelli_-_Birth_of_Venus_-_Google_Art_Project.jpg",
            museumId: 1
        }
    ]
}