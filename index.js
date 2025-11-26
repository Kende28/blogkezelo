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

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await connection.query(
            `SELECT title, content, author, visible, createdAt FROM blog_bejegyzesek WHERE id = ?`,
            [id]
        )
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Nem sikerült lekérdezni a blogot"})
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

app.put("/posts/visible/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const [result] = await connection.query(
      `UPDATE blog_bejegyzesek SET visible = 1 WHERE id = ?`,
      [postId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post visibility changed (visible) successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/posts/invisible/:id", async (req, res) => {
  const pbId = req.params.id;
  try {
    const [result] = await connection.query(
      `UPDATE blog_bejegyzesek SET visible = 0 WHERE id = ?`,
      [pbId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post visibility changed (invisible) successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/posts/new", async (req, res) => {
  const { title, content, author, visible} =
    req.body;

  // Egyszerű validáció
  if (
    !title ||
    !content ||
    !author ||
    visible == null
  ) {
    return res.status(400).json({
      error:
        "Missing fields (title, content, author, visible)",
    });
  }

  try {
    const now = new Date()
    const [result] = await connection.query(
      `INSERT INTO blog_bejegyzesek (title, content, author, visible, createdAt)
       VALUES (?, ?, ?, ?, ?)`,
      [title, content, author, visible, now]
    );

    res.status(201).json({ message: "Post added", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to record post." });
  }
});

app.listen(port, () => {
    console.log(`A szerver működik a ${port} porton.`)
})