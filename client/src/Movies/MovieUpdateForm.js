import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieUpdateForm = ({movieList, setMovieList, getMovieList}) => {

    const [movies, setMovies] = useState(initialState)
    const { push } = useHistory();
    const { id } = useParams();

    const changeHandler = (e) => {
       e.persist()
       const {name, value} = e.target
       setMovies({...movies, [name]: value})
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            setMovies(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movies)
        .then(() => {
            getMovieList()
            push('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <h2>Update The Movie</h2>
            <form onSubmit = {handleSubmit}>
                <input
                    type = 'text'
                    name = 'title'
                    value = {movies.title}
                    onChange = {changeHandler}
                    placeholder = 'Title'
                >
                </input>

                <input
                    type = 'text'
                    name = 'director'
                    value = {movies.director}
                    onChange = {changeHandler}
                    placeholder = 'Director'
                >
                </input>

                <input
                    type = 'number'
                    name = 'metascore'
                    value = {movies.metascore}
                    onChange = {changeHandler}
                    placeholder = 'Metascore'
                >
                </input>

                <input
                    type = 'text'
                    name = 'stars'
                    value = {movies.stars}
                    onChange = {changeHandler}
                    placeholder = 'stars'
                >
                </input>
                <button>Update my movie</button>
            </form>
        </div>
    )
}

export default MovieUpdateForm;
