import NoteAdd from "./NoteAdd"
import NoteItem from "./NoteItem"
import {useState, useEffect} from 'react'
import request from "../request"

export default function NotesList() {
    const [list, setList] = useState([])

    const loadData = () => {
        request.update().then(notesList => {
            console.log('data loaded ' + new Date())
            setList(notesList);
        })
    }

    const handleUpdate = () => {
        loadData()
    }

    const handleDelete = async (note) => {
        const res = await request.removeNote(note);
        if (res.ok) {
            console.log('deleted ' + note.id)
        }
        loadData()
    }

    useEffect(loadData, [])

    useEffect(() => {
        console.log('List updated')
    }, [list])

    return (
        <div className='container mb-3' style={{width: '80vw', position: 'absolute', left: '50%', translate: '-50%'}}>
            <NoteAdd handleUpdate={handleUpdate} />
            <button className='btn btn-info p-2' onClick={handleUpdate}>Обновить</button>
            <div className="d-flex flex-wrap justify-content-between p-3">
                {list.map(note => <NoteItem key={note.id} note={note} onRemove={handleDelete} />)}
            </div>
        </div>
    )
}