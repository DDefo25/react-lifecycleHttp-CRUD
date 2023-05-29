const request = {
    update: async () => {
        const response = await fetch(process.env.REACT_APP_SERVER_URL)
        return response.json()
    },

    addNote: async (note) => {
        return await fetch(process.env.REACT_APP_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    },

    removeNote: async (note) => {
        return await fetch(process.env.REACT_APP_SERVER_URL + '/' + note.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }
}

export default request