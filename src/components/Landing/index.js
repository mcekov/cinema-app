import React from 'react';

const Landing = () => {
  return (
    <div>
      <h1>Landing</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus quos
        voluptatem sunt beatae nulla iure aliquam consequuntur placeat...
      </p>
    </div>
  );
};

/* class FilmsBase extends Component {
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
      const filmsObject = snapshot.val();

      if (filmsObject) {
        const filmsList = Object.keys(filmsObject).map(key => ({
          ...filmsObject[key],
          uid: key
        }));

        this.setState({ films: filmsList, isLoading: false });
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
      <div>
        {isLoading && <div>Loading...</div>}

        {films ? (
          <FilmList films={films} />
        ) : (
          <div>There are no films in db!</div>
        )}
      </div>
    );
  }
}

const FilmList = ({ films }) => {
  return (
    <ul>
      {films.map(film => (
        <FilmItem key={film.uid} film={film} />
      ))}
    </ul>
  );
};

const FilmItem = ({ film }) => {
  return (
    <li>
      <strong>{film.userId}</strong>
      <strong>{film.userId}</strong>
      {film.name}
    </li>
  );
};

const Films = withFirebase(FilmsBase); */

export default Landing;
