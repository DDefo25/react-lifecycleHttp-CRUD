import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';

export default function NoteItem({note, onRemove}) {
    const {content} = note;
    
    // const addSecond = () => {
    //     setTimeW(prevTimeW => {
    //         return {
    //             hour: (prevTimeW.hour + 0.00416) % 360,
    //             minute: (prevTimeW.minute + 0.1) % 360,
    //             second: (prevTimeW.second + 6) % 360,
    //         }
    //     })
    // }

    // useEffect(addSecond, [])

    // useEffect(() => {
    //     const timeout = window.setTimeout(addSecond, 1 * 1000);
    //     return () => {
    //         clearTimeout(timeout)
    //     }
    // }, [time])

    return (
            <div className="card" style="width: 18rem;">
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