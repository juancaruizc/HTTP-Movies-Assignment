import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdateForm from './Movies/MovieUpdateForm'
import MovieAddForm from './Movies/MoveAddForm'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
      <Route path='/update-movie/:id'>
        <MovieUpdateForm movieList = {movieList} setMovieList = {setMovieList} getMovieList = {getMovieList} component = {MovieUpdateForm}/>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList = {getMovieList}/>
      </Route>

      <Route exact path="/">
        <MovieAddForm getMovieList = {getMovieList}/>
        <MovieList movies={movieList} />
      </Route>
      </Switch>
    </>
  );
};

export default App;