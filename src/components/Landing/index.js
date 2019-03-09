import React, { Component, Fragment } from 'react';
import { withFirebase } from '../Firebase';

import './Landing.css';

const Landing = () => {
  return (
    <Fragment>
      <h1>All Films</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus quos
        voluptatem sunt beatae nulla iure aliquam consequuntur placeat...
      </p>

      <Films />
    </Fragment>
  );
};

class FilmsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      films: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.props.firebase.films().on('value', snapshot => {
      // convert messages to list from snapshot object
      const filmObject = snapshot.val();

      if (filmObject) {
        const filmList = Object.keys(filmObject).map(key => ({
          ...filmObject[key],
          uid: key
        }));

        this.setState({ films: filmList, isLoading: false });
      } else {
        this.setState({
          films: null,
          isLoading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.films().off();
  }

  render() {
    const { films, isLoading } = this.state;

    return (
      <Fragment>
        {isLoading && <div>Loading...</div>}

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

        <div className="btn-group">
          <button type="button" className="btn btn-sm btn-outline-primary">
            View
          </button>
          <button type="button" className="btn btn-sm btn-outline-success">
            Edit
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Films = withFirebase(FilmsBase);

export default Landing;
