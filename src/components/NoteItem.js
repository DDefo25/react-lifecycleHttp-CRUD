import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';

export default function NoteItem({note, onRemove}) {
    const {content} = note;
    
    return (
            <div className="card p-2" style={{width: "18rem"}}>
                <div className="card-body">
                    <p className="card-text">{content}</p>
                </div>
                <span className="position-absolute top-0 start-100 translate-middle" onClick={() => onRemove(note)}><span className="material-icons">close</span></span>
          </div>
            
    )
}

NoteItem.propTypes = {
    note: PropTypes.object,
    onRemove: PropTypes.func
}