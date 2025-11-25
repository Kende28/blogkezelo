import { useEffect, useState } from "react";

export function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost/posts");
    const data = await res.json();
    setPosts(data);
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
            <input type="text" onChange={() => {}} />
          </div>
          <div className="col-sm-3">
            <div className="row">
              <button>A ➡️ Z </button>
            </div>
            <div className="row">
              <button>Z ➡️ A</button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="row">
              <button>Régi ➡️ Új </button>
            </div>
            <div className="row">
              <button>Új ➡️ Régi</button>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="row"><button>Összes</button></div>
            <div className="row"><button>Csak látható</button></div>
            <div className="row"><button>Csak rejtett</button></div>
          </div>
        </div>
        <table className="table table-hover">
          <tr>
            <th>Cím</th>
            <th>Szerző</th>
            <th>Létrehozás dátuma</th>
            <th>Láthatóság</th>
            <th>Részletek</th>
            <th>Törlés</th>
            <th>Láthatóság</th>
          </tr>
          {posts.map((post) => (
            <tr>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.createdAt}</td>
              <td><span>🔍</span></td>
              <td><span>🚫</span></td>
              <td>{post.visible? "Látható" : "Rejtett"}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
