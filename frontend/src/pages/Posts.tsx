import { useEffect, useState } from "react";

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:3000/posts");
    const data = await res.json();
    setPosts(data);
    setFilteredPosts(data);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = posts.filter(
      (posts) =>
        posts.title.toLowerCase().includes(term) ||
        posts.author.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

  const handleSortPosts = async (key: string, direction: "asc" | "desc") => {
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      if (key == "title") {
        const comp = String(a[key]).localeCompare(String(b[key]), "hu");
        return direction === "asc" ? comp : -comp;
      } else {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      }
    });
    setFilteredPosts(sortedPosts);
  };

  const handleVisiblePosts = async (type: string) => {
    const visible: never[] = [];
    if (type == "visible") {
      posts.forEach((post) => {
        if (post.visible === 1) {
          visible.push(post);
        }
      });
      setFilteredPosts(visible);
    } else if (type == "invisible") {
      posts.forEach((post) => {
        if (post.visible === 0) {
          visible.push(post);
        }
      });
      setFilteredPosts(visible);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleDelete = async (postId: number) => {
    const res = await fetch(`http://localhost:3000/posts/delete/${postId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    setPosts(posts.filter((post) => post.id !== postId));
    fetchPosts()
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="container col-12">
        <h1>Bejegyzések</h1>
        <div className="row">
          <div className="col-sm-3">
            Keresés:
            <input
              type="text"
              placeholder="Kereséshez írjon ide!"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="col-sm-3">
            <div className="row">
              <button onClick={() => handleSortPosts("title", "asc")}>
                A ➡️ Z
              </button>
            </div>
            <div className="row">
              <button onClick={() => handleSortPosts("title", "desc")}>
                Z ➡️ A
              </button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="row">
              <button onClick={() => handleSortPosts("createdAt", "asc")}>
                Régi ➡️ Új
              </button>
            </div>
            <div className="row">
              <button onClick={() => handleSortPosts("createdAt", "desc")}>
                Új ➡️ Régi
              </button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="row">
              <button onClick={() => handleVisiblePosts("all")}>Összes</button>
            </div>
            <div className="row">
              <button onClick={() => handleVisiblePosts("visible")}>
                Csak látható
              </button>
            </div>
            <div className="row">
              <button onClick={() => handleVisiblePosts("invisible")}>
                Csak rejtett
              </button>
            </div>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <td>Cím</td>
              <td>Szerző</td>
              <td>Létrehozás dátuma</td>
              <td>Láthatóság</td>
              <td>Részletek</td>
              <td>Törlés</td>
              <td>Láthatóság?</td>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.createdAt}</td>
                <td>{post.visible ? "Látható" : "Rejtett"}</td>
                <td>
                  <span>🔍</span>
                </td>
                <td>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    🚫
                  </span>
                </td>
                <td>
                  <span style={{ cursor: "pointer" }}
                    onClick={() => {
                      
                    }}>👁️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
