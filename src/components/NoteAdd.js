import { useState } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'

export default function NoteAdd({onAddItem}) {
    const [form, setForm] = useState({
        id: '',
        content: '',
    })

    const handleChange = ({target}) => {
        const {name, value} = target;
        setForm(prevStep => ({...prevStep, [name]: value}))
    }

    const handleNoteAdd = (ev) => {
        ev.preventDefault();
        const note = {
            id: nanoid(),
            content: form.content,
        }

        onAddItem(note)
        setForm({
            id: '',
            content: '',
        })
    }

    
    return (
        <form>
            <div className="row g-3 align-items-end">
                <div className="col">
                    <label className="form-label">New note</label>
                    <textarea name='content' className="form-control" onChange={handleChange} required>
                        {form.content} 
                    </textarea>
                </div>
                <div className="col-3">
                    <button className='btn btn-primary text-end' onClick={handleNoteAdd}>Добавить</button>
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