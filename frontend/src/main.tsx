import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Main } from './pages/Main.tsx'
import { Post } from './pages/Post.tsx'
import { Posts } from './pages/Posts.tsx'
import { New } from './pages/New.tsx'

const router = createBrowserRouter([ {
  path: "/",
  Component: App,
  children: [
    {
      index: true,
      Component: Main
    },
    {
      path: "/post/:id",
      Component: Post
    },
    {
      path: "/posts",
      Component: Posts
    },
    {
      path: "/new",
      Component: New
    }
  ]
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
