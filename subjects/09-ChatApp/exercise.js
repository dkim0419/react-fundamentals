////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import './styles'

/*
Here's how to use the ChatUtils:

login((error, auth) => {
  // hopefully the error is `null` and you have a auth.github object
})

sendMessage(
  auth.uid,                       // the auth.uid string
  auth.github.username,           // the username
  auth.github.profileImageURL,    // the user's profile image
  'hello, this is a message'      // the text of the message
)

const unsubscribe = subscribeToMessages(messages => {
  // here are your messages as an array, it will be called
  // every time the messages change
})

unsubscribe() // stop listening for new messages

The world is your oyster!
*/

class Chat extends React.Component {
  render() {
    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">reslack</h1>
          <p className="chat-message-count"># messages: 3</p>
        </header>
        <div className="messages">
          <ol className="message-groups">
            <li className="message-group">
              <div
                className="message-group-avatar"
                style={{backgroundImage: 'url("https://avatars0.githubusercontent.com/u/5963656?v=3")'}}
              >
              </div>
              <ol className="messages">
                <li className="message">Welcome to the React Fundamentals workshop!</li>
                <li className="message">Hello, world</li>
              </ol>
            </li>
          </ol>
        </div>
        <form className="new-message-form">
          <div className="new-message">
            <input ref="message" type="text" placeholder="say something..."/>
          </div>
        </form>
      </div>
    )
  }
}

render(<Chat/>, document.getElementById('app'))
