import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import './Landing.css';

const Landing = () => {
  return (
    <Fragment>
      <div className="jumbotron">
        <h1 className="display-3">Welcome to our site</h1>
        <p className="lead">This is a web site of our kino club.</p>
        <hr className="my-4" />
        <p>Here you can see refined list of films for film buffs.</p>
        <p>
          Film Club is not just another movie list website, our focus on World
          Cinema and Classics make us different. We make essential film lists
          introducing the best films from different filmmakers, countries,
          genres and eras, these in-depth lists not only serve as guides to good
          movies...
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to={ROUTES.ABOUT}>
            Learn more
          </Link>
        </p>
      </div>

      <Films />
    </Fragment>
  );
};

class FilmsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      films: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.films().on('value', snapshot => {
      // convert messages to list from snapshot object
      const filmObject = snapshot.val();

      if (filmObject) {
        const filmList = Object.keys(filmObject).map(key => ({
          ...filmObject[key],
          uid: key
        }));

        this.setState({ films: filmList, loading: false });
      } else {
        this.setState({
          films: null,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.films().off();
  }

  render() {
    const { films, loading } = this.state;

    return (
      <Fragment>
        {loading && <div>Loading...</div>}

        <div className="row flex-column-reverse flex-md-row mt-5">
          {films ? (
            <FilmList films={films} />
          ) : (
            <div>There are no films in db!</div>
          )}
        </div>
      </Fragment>
    );
  }
}

const FilmList = ({ films }) => (
  <Fragment>
    {films.map(film => (
      <FilmItem key={film.uid} film={film} />
    ))}
  </Fragment>
);

const FilmItem = ({ film }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img
          id="poster"
          className="card-img-top img-fluid"
          src={film.poster}
          alt={film.title}
        />

        <div className="card-body">
          <h3 className="card-title">{film.title}</h3>
          <h5>Year: {film.year}</h5>
          <p className="card-text text-truncate">{film.description}</p>
        </div>

        <Link
          to={`${ROUTES.FILM_VIEW}/${film.uid}`}
          className="btn btn-sm btn-outline-primary"
        >
          View Film
        </Link>

        {/* <button type="button" className="btn btn-sm btn-outline-success">
            Edit
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger">
            Delete
          </button> */}
      </div>
    </div>
  );
};

const Films = withFirebase(FilmsBase);

export default Landing;
