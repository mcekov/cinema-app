import React, { Component, Fragment } from 'react';

import { withFirebase } from '../Firebase';
// Organize high-order components
import { compose } from 'recompose';

const INITIAL_STATE = {
  title: '',
  year: '',
  poster: '',
  description: '',
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

    this.props.firebase.films().push({
      title,
      year,
      poster,
      description
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { title, year, poster, description } = this.state;

    return (
      <Fragment>
        <p>Form for adding Film</p>
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
          <button className="btn btn-danger btn-block" type="submit">
            Add Film
          </button>
        </form>
      </Fragment>
    );
  }
}

const AddFilmForm = compose(withFirebase)(AddFilmBase);

export default AddFilmForm;
