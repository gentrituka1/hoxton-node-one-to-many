import Database from "better-sqlite3";

const db = Database('./db/setup.db', { verbose: console.log });

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

    const deleteMuseumTable = db.prepare(`
        DROP TABLE IF EXISTS museums;
    `)
    deleteMuseumTable.run()

    const createNewMuseum = db.prepare(`
        INSERT INTO museums (name, city) VALUES (@name, @city);
    `)
    createNewMuseum.run()

    

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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/640px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
            museumId: 1
        },
        {
            id: 5,
            name: "The Gulf Stream",
            artist: "Winslow Homer",
            image: "https://thetourguy.com/wp-content/uploads/2020/03/Gulf-Stream-by-Winslow-Homer.jpeg",
            museumId: 3
        },
        {
            id: 6,
            name: " Julie Le Brun Looking In A Mirror",
            artist: "Elisabeth Louise Vigée Le Brun",
            image: "https://thetourguy.com/wp-content/uploads/2020/03/Julie-Le-Brun-by-Elisabeth-Louise-Vige%CC%81e-Le-Brun.jpeg",
            museumId: 3
        }
    ]

    const createWorksTable = db.prepare(`
        CREATE TABLE IF NOT EXISTS works (
            id INTEGER,
            name TEXT,
            artist TEXT,
            image TEXT,
            museumId INTEGER,
            PRIMARY KEY (id),
            FOREIGN KEY (museumId) REFERENCES museums(id)
        );
    `)
    createWorksTable.run();



    const deleteWorksTable = db.prepare(`
        DROP TABLE IF EXISTS works;
    `)
    deleteWorksTable.run()



    const createNewWork = db.prepare(`
        INSERT INTO works (name, artist, image, museumId) VALUES (@name, @artist, @image, @museumId);
    `)
    createNewWork.run()

    const deleteSelectedWork = db.prepare(`
        DELETE FROM works WHERE id = ?;
    `)
    deleteSelectedWork.run()

    for(let work of works){
        createNewWork.run(work.name, work.artist, work.image, work.museumId)
    }
}

everythingWork()