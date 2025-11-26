import express from "express"
import mysql from "mysql2/promise"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
const port = 3000

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "13de_weboldal"
})

app.get("/posts", async (req, res) => {
    try {
        const [result] = await connection.query(
            `SELECT id, title, content, author, visible, createdAt FROM blog_bejegyzesek`
        )
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Nem sikerült lekérdezni a blogokat"})
    }
})

app.delete("/posts/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query(
      `DELETE FROM blog_bejegyzesek WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "A megadott ID-jű post nem található." });
    }

    res.json({ message: "Powerbank sikeresen törölve." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba történt a törlés során." });
  }
});

app.listen(port, () => {
    console.log(`A szerver működik a ${port} porton.`)
})