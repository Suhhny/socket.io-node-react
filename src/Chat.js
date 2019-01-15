// @flow

import React from 'react';
import socketIOClient from 'socket.io-client';

type Props = {};

type State = {
	username: string,
	message: string,
	messages: Array<{author: string, quote: string}>
};

class Chat extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			username : ' ',
			message: ' ',
			messages: []
		}

		this.socket = socketIOClient('http://192.168.219.135:3000');
		this.socket.on('RECIEVED_MESSAGE', (data) => {
			console.log('Client Recieved data!');
			addMessage(data);
		})

		const addMessage = (data) => {
			this.setState({ messages: [...this.state.messages, data] })
		}
	}

	_onNameChange = (e) => {
		this.setState({ username: e.target.value });
	}

	_onMessageChange = (e) => {
		this.setState({ message: e.target.value });
	}

	_onSendMessage = (e) => {
		e.preventDefault();
		this.socket.emit('SEND_MESSAGE', {
			author: this.state.username,
			quote: this.state.message
		})

		this.setState({ message: '' })
	}

	render() {
		return(
			<div>
				<div>
					{
						this.state.messages.map( item => {
							return(
								<h5>{item.author}: {item.quote}</h5>
							)
						})
					}
				</div>
				<div>
					<input placeholder="Username" value={this.state.username} onChange={this._onNameChange} />
					<input placeholder="Message" value={this.state.message} onChange={this._onMessageChange} />
					<button onClick={this._onSendMessage}>POST</button>
				</div>
			</div>
		);
	}
}

export default Chat;























