import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function Post() {
  const param = useParams();
  const id = param.id
  interface Post {
    title: string,
    content: string,
    author: string,
    createdAt: Date,
    visible: boolean 
  }
  const [post, setPost] = useState<Post>() 
  const [title, setTitle] = useState("")

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:3000/post/${id}`);
    const data = await res.json();
    setPost(data)
    setTitle(data.title)
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <h1>{title}</h1>
    </>
  );
}
