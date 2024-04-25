import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import axios from 'axios';

const __dirname = import.meta.dirname

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

const FilePath = __dirname + "/data/deportes.json";

app.get('/deportes', async (req, res) => {
    try {
        const stringDeportes = await readFile(FilePath, 'utf8')
        const deportes = JSON.parse(stringDeportes)
        return res.json(deportes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

app.get('/deportes/create', async (req, res) => {

    try {
        const nombre = req.query.nombre

        const nuevoDeporte = {
            nombre: nombre,
            precio: "",
            completed: false,
            

        }
        const stringDeportes = await readFile(FilePath, 'utf8')
        const deportes = JSON.parse(stringDeportes)

        deportes.push(nuevoDeporte)

        await writeFile(FilePath, JSON.stringify(deportes));

        return res.json(deportes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
});

app.get('/deportes/delete/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre;

        const stringDeportes = await readFile(FilePath, 'utf8');
        const deportes = JSON.parse(stringDeportes);

        const deporte = deportes.find(item => item.nombre === nombre);
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "deporte no encontrado" });
        }

        const nuevosDeportes = deportes.filter(item => item.nombre !== nombre);
        await writeFile(FilePath, JSON.stringify(nuevosDeportes));
        return res.json(nuevosDeportes);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false });
    }
});


app.get('/deportes/update/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre
        const { precio = "", completed = false } = req.query

        const stringDeportes = await readFile(FilePath, 'utf8')
        let deportes = JSON.parse(stringDeportes)

        const deporte = deportes.find(item => item.nombre === nombre)

        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "deporte no encontrado" })
        }

        deporte.precio = precio

        await writeFile(FilePath, JSON.stringify(deportes))
        return res.json(deportes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Servidor corriendo en el puerto', PORT))
