import { useState } from "react";
import { useNavigate } from "react-router";

export function New() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [visible, setVisible] = useState(1);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      content: content,
      author: author,
      visible: visible,
    };
    try {
      const response = await fetch("http://localhost:3000/posts/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        navigate("/posts")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <td>
                <label>Cím:</label>
              </td>
              <td>
                <label>Tartalom:</label>
              </td>
              <td>
                <label>Szerző:</label>
              </td>
              <td>
                <label>Láthatóság:</label>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  value={visible}
                  onChange={(e) => {
                    setVisible(parseInt(e.target.value));
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Mentés</button>
      </form>
    </>
  );
}
