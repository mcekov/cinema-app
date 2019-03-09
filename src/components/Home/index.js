import React, { Component } from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>The Home Page is accessible by every logged in user.</p>
      <Messages />
    </div>
  );
};

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
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}

            {messages ? (
              <MessageList messages={messages} />
            ) : (
              <div>There are no messages ...</div>
            )}

            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <textarea
                value={text}
                onChange={this.onChangeText}
                id="input-box"
                className="form-control mt-2"
                rows="1"
                placeholder="Say something..."
              />
              <span class="input-group-btn">
                <button className="btn btn-primary btn-block" type="submit">
                  Send
                </button>
              </span>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({ messages }) => (
  <div className="card">
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </div>
);

const MessageItem = ({ message }) => (
  <div className="card-body">
    <h6 className="card-subtitle mb-2 text-muted">{message.userId}</h6>
    <p className="card-text">{message.text}</p>
  </div>
);

{
  /* <div class="msg-group center">
                	
                  <div class="card">
                       <div class="card-body">
                           <h6 class="card-subtitle mb-2 text-muted text-left">yingshaoxo</h6>
                           <p class="card-text float-left">Hi ~</p>
                       </div>
                  </div>
                    
                  <div class="card">
                       <div class="card-body">
                           <h6 class="card-subtitle mb-2 text-muted text-right">yingshaoxo</h6>
                           <p class="card-text float-right">Welcome to here!</p>
                       </div>
                  </div>                      
                 
              </div>
              
              <div class="input-group">
                <textarea id="input-box" class="form-control" rows="1" placeholder="Say something..."></textarea>
                  <span class="input-group-btn">
                      <button class="btn btn-secondary" type="button">send</button>
                  </span>
             </div> */
}

const Messages = withFirebase(MessagesBase);

const condition = authUser => authUser !== null;

export default compose(withAuthorization(condition))(HomePage);
