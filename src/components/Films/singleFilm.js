import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import './singleFilm.css';

class SingleFilmPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      film: null
    };
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Film id={id} />
      </div>
    );
  }
}

class FilmItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      film: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const filmId = this.props.id;

    this.props.firebase.film(filmId).on('value', snapshot => {
      this.setState({ film: snapshot.val(), loading: false });
    });
  }

  componentWillUnmount() {
    this.props.firebase.film(this.props.id).off();
  }

  render() {
    const { film, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading...</div>}
        <ul>{film ? <FilmList film={film} /> : null}</ul>
      </div>
    );
  }
}

const FilmList = ({ film }) => (
  <Fragment>
    <FilmItem key={film.uid} film={film} />
  </Fragment>
);

const FilmItem = ({ film }) => {
  return (
    <section id="film">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="film-preview">
              <img
                className="img-single-poster"
                src={film.poster}
                alt={film.title}
              />
              <div />
            </div>
          </div>
          <div className="col-md-6">
            <h2>{film.title}</h2>
            <p>Year: {film.year}</p>
            <h5>{film.description}</h5>
            <Link className="btn btn-sm btn-primary" to={ROUTES.LANDING}>
              Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Film = withFirebase(FilmItemBase);

export default SingleFilmPage;
