import { useState } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import request from '../request'

export default function NoteAdd({handleUpdate}) {
    const [form, setForm] = useState({
        id: '',
        content: '',
    })

    const handleChange = ({target}) => {
        const {name, value} = target;
        setForm(prevStep => ({...prevStep, [name]: value}))
    }

    const handleNoteAdd = async (ev) => {
        ev.preventDefault();
        const note = {
            id: nanoid(),
            content: form.content,
        }

        const response = await request.addNote(note);
        if (response.ok) {
            handleUpdate()
            setForm({
                id: '',
                content: '',
            })
        }
    }
    
    return (
        <form>
            <div className="row g-3 align-items-end">
                <div className="col">
                    <label className="form-label">New note</label>
                    <textarea name='content' className="form-control" value={form.content} onChange={handleChange} placeholder="Enter text" required>
                         
                    </textarea>
                </div>
                <div className="col-3">
                    <button className='btn btn-primary p-2' onClick={handleNoteAdd}>Добавить</button>
                </div>
            </div>
        </form>
    )
}

NoteAdd.propTypes = {
    onAddWatch: PropTypes.func,
    form: PropTypes.object,
    setForm: PropTypes.func
}