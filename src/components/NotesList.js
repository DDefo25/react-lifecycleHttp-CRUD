import NoteAdd from "./NoteAdd"
import NoteItem from "./NoteItem"
import {useState, useEffect} from 'react'

export default function NotesList() {
    const [list, setList] = useState([])
    const [updated, setUpdated] = useState();
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        setTimeout(() => {
            fetch(process.env.REACT_APP_SERVER_URL)
            .then((res => res.body))
            .then(body => {
            const reader = body.getReader();
            return new ReadableStream({
                start(controller) {
                  return pump();
                  function pump() {
                    return reader.read().then(({ done, value }) => {
                      // When no more data needs to be consumed, close the stream
                      if (done) {
                        controller.close();
                        return;
                      }
                      // Enqueue the next data chunk into our target stream
                      controller.enqueue(value);
                      return pump();
                    });
                  }
                },
            })})
            .then((stream) => new Response(stream))
            .then((response) => response.json())
            .then((json) => {
            console.log(json)
            console.log('data loaded' + new Date())
            // setList(notesList);
            setLoading(false)
            setUpdated(new Date().getTime())
            })
        }, 1 * 1000)
    }

    const handleAdd = (note) => {
        setList(prevList => {
            return [...prevList.filter(el => el.id !== note.id), note]
        })
    }

    const handleDelete = (note) => {
        setList(prevList => {
            return prevList.filter(el => { 
                if (note.id === el.id) return false
                else return true
            })
        })
    }

    useEffect(loadData, [])

    useEffect(() => {
        console.log('List updated')
    }, [list])

    useEffect(() => {
        let timeout;
        if (!loading) {
            timeout = window.setTimeout(loadData, 5 * 1000);
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [updated])


    return (
        <form className='form' style={{width: '50vw', position: 'absolute', left: '50%', translate: '-50%'}}>
            <NoteAdd onAddWatch={handleAdd} />
            <div className="row align-items-start p-3 g-3">
                {list.map(note => <NoteItem key={note.id} note={note} onRemove={handleDelete} />)}
            </div>
        </form>
    )
}