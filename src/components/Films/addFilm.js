import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
// Organize high-order components
import { compose } from 'recompose';

/* import * as ROUTES from '../../constants/routes'; */

const INITIAL_STATE = {
  title: '',
  year: '',
  poster: '',
  description: '',
  success: null,
  error: null
};

class AddFilmBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { title, year, poster, description } = this.state;

    this.props.firebase
      .films()
      .push({
        title,
        year,
        poster,
        description
      })
      .then(() => {
        this.setState({
          success: 'Film succesfuly added',
          title: '',
          year: '',
          poster: '',
          description: ''
        });
      })
      .catch(error => {
        this.setState({ error });
      });

    // this.props.history.push(ROUTES.LANDING);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { title, year, poster, description, success, error } = this.state;

    const isInvalid =
      title === '' || year === '' || poster === '' || description === '';

    return (
      <Fragment>
        {success && (
          <div className="alert alert-success alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>{success}</strong>
          </div>
        )}

        {error && (
          <div className="alert alert-success alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert">
              &times;
            </button>
            <strong>{error}</strong>
          </div>
        )}

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Film Name"
              name="title"
              value={title}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Film Year"
              name="year"
              value={year}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Poster image"
              name="poster"
              value={poster}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Enter Description"
              value={description}
              name="description"
              onChange={this.onChange}
              rows="4"
              cols="50"
            />
          </div>
          <button
            disabled={isInvalid}
            className="btn btn-danger btn-block"
            type="submit"
          >
            Add Film
          </button>
        </form>
      </Fragment>
    );
  }
}

const AddFilmForm = compose(withFirebase)(AddFilmBase);

export default withRouter(AddFilmForm);
