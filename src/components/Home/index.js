import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

import './index.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    };
  }

  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every logged in user.</p>
        <Messages users={this.state.users} />
      </div>
    );
  }
}

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: []
    };
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key
        }));

        this.setState({ messages: messageList, loading: false });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {messages ? (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId }
                }))}
              />
            ) : (
              <div>There are no messages ...</div>
            )}

            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <div className="input-group">
                <input
                  id="input-box"
                  type="text"
                  className="form-control mb-4"
                  placeholder="Say something..."
                  value={text}
                  onChange={this.onChangeText}
                />
                <span className="input-group-btn">
                  <button className="btn btn-warning " type="submit">
                    Send
                  </button>
                </span>
              </div>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({ messages }) => (
  <div className="card chat-container">
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </div>
);

const MessageItem = ({ message }) => (
  <div className="card-body">
    <h6 className="card-subtitle mb-2 text-muted">
      {message.user.username || message.user.userId}
    </h6>

    <p className="card-text">{message.text}</p>
  </div>
);

const Messages = withFirebase(MessagesBase);

const condition = authUser => authUser !== null;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);
