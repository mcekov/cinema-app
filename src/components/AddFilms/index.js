import React, { Component, Fragment } from 'react';

import { withFirebase } from '../Firebase';
// Organize high-order components
import { compose } from 'recompose';

const INITIAL_STATE = {
  filmName: '',
  filmYear: '',
  filmPoster: '',
  filmDescription: '',
  error: null
};

class AddFilmBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { filmName, filmYear, filmPoster, filmDescription } = this.state;

    this.props.firebase
      .films()
      .push({ filmName, filmYear, filmPoster, filmDescription });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { filmName, filmYear, filmPoster, filmDescription } = this.state;

    return (
      <Fragment>
        <p>Form for adding Film</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Film Name"
              name="filmName"
              value={filmName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Film Year"
              name="filmYear"
              value={filmYear}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Url to Poster"
              name="filmPoster"
              value={filmPoster}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="filmDescription"
              className="form-control"
              placeholder="Enter Film Description"
              value={filmDescription}
              onChange={this.onChange}
              rows="4"
              cols="50"
            />
          </div>
          <button className="btn btn-danger" type="submit">
            Add Film
          </button>
        </form>
      </Fragment>
    );
  }
}

const AddFilmForm = compose(withFirebase)(AddFilmBase);

export default AddFilmForm;
