import { useState } from "react"

export function New() {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [author, setAuthor] = useState()
    const [visible, setVisible] = useState()

    return <>
        <form >
            <input type="text" value={title} />
            <input type="text" value={content}/>
            <input type="text" value={author}/>
            <input type="checkbox" />
        </form>
    </>
}