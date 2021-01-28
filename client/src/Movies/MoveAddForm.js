import axios from 'axios'
import React, {useState} from 'react'

const initialValues = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
}

const MoveAddForm = ({getMovieList}) => {

    const [formValues, setFormValues] = useState(initialValues)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newMovie = {
            ...formValues,
            stars: formValues.stars.length !== 0 ? formValues.stars.split(',') : []
        }
        
        axios.post('http://localhost:5000/api/movies', newMovie)
        .then((res) => {
            console.log(res)
            getMovieList()
            setFormValues(initialValues)
        })
        .catch((err => {
            console.log(err)
        }))
    }   

  

    return (
        <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={formValues.director}
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={formValues.metascore}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          placeholder="Stars, separate by commas"
          value={formValues.stars}
          onChange={handleChange}
        />
        <button>Add Movie</button>
      </form>
    </div>
    )
}

export default MoveAddForm
