import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

// import { withAuthorization } from '../Session';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

import { compose } from 'recompose';
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

class FilmBase extends Component {
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

  onEditFilm = (film, editTitle, editYear, editPoster, editDescription) => {
    this.props.firebase.film(this.props.id).set({
      ...film,
      title: editTitle,
      year: editYear,
      poster: editPoster,
      description: editDescription
    });
  };

  onRemoveFilm = () => {
    this.props.firebase.film(this.props.id).remove();
    this.props.history.push(ROUTES.LANDING);
  };

  render() {
    const { film, loading } = this.state;

    return (
      <div>
        {loading && <div>Loading...</div>}
        <ul>
          {film ? (
            <FilmList
              film={film}
              onEditFilm={this.onEditFilm}
              onRemoveFilm={this.onRemoveFilm}
            />
          ) : null}
        </ul>
      </div>
    );
  }
}

const FilmList = ({ film, onEditFilm, onRemoveFilm }) => (
  <Fragment>
    <FilmItem
      key={film.uid}
      film={film}
      onEditFilm={onEditFilm}
      onRemoveFilm={onRemoveFilm}
    />
  </Fragment>
);

class FilmItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editTitle: this.props.film.title,
      editYear: this.props.film.year,
      editPoster: this.props.film.poster,
      editDescription: this.props.film.description
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editTitle: this.props.film.title,
      editYear: this.props.film.year,
      editPoster: this.props.film.poster,
      editDescription: this.props.film.description
    }));
  };

  onChangeEditFilm = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveEditFilm = () => {
    this.props.onEditFilm(
      this.props.film,
      this.state.editTitle,
      this.state.editYear,
      this.state.editPoster,
      this.state.editDescription
    );
    this.setState({ editMode: false });
  };

  render() {
    const { title, year, poster, description } = this.props.film;
    const { film, onRemoveFilm } = this.props;
    const {
      editMode,
      editTitle,
      editYear,
      editPoster,
      editDescription
    } = this.state;

    return (
      <Fragment>
        {editMode ? (
          <Fragment>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="editTitle"
                value={editTitle}
                onChange={this.onChangeEditFilm}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="editYear"
                value={editYear}
                onChange={this.onChangeEditFilm}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="editPoster"
                value={editPoster}
                onChange={this.onChangeEditFilm}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="editDescription"
                value={editDescription}
                onChange={this.onChangeEditFilm}
                rows="4"
                cols="50"
              />
            </div>

            <span>
              <button
                className="btn btn-success btn-block"
                onClick={this.onSaveEditFilm}
              >
                Save
              </button>
              <button
                className="btn btn-danger btn-block"
                onClick={this.onToggleEditMode}
              >
                Reset
              </button>
            </span>
          </Fragment>
        ) : (
          <section id="film">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="film-preview">
                    <img
                      className="img-single-poster"
                      src={poster}
                      alt={title}
                    />
                    <div />
                  </div>
                </div>
                <div className="col-md-6">
                  <h2>{title}</h2>
                  <p>Year: {year}</p>
                  <h5>{description}</h5>
                  <Link className="btn btn-sm btn-primary" to={ROUTES.LANDING}>
                    Back
                  </Link>
                  <AuthUserContext.Consumer>
                    {authUser =>
                      authUser ? (
                        <Fragment>
                          {authUser.roles.includes(ROLES.ADMIN) && (
                            <Fragment>
                              {!editMode && (
                                <Fragment>
                                  <button
                                    className="btn btn-sm btn-success ml-1"
                                    onClick={this.onToggleEditMode}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger ml-1"
                                    onClick={() => onRemoveFilm(film.uid)}
                                  >
                                    Delete
                                  </button>
                                </Fragment>
                              )}
                            </Fragment>
                          )}
                        </Fragment>
                      ) : null
                    }
                  </AuthUserContext.Consumer>
                </div>
              </div>
            </div>
          </section>
        )}
      </Fragment>
    );
  }
}

const Film = compose(
  withRouter,
  withFirebase
)(FilmBase);

export default SingleFilmPage;
