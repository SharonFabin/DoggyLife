import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat'
import database from "../api/database";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        database.loadMessages(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );

    }

    componentWillUnmount() {
        database.closeChat();
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={message => database.sendMessage(message)}
                user={{
                    _id: database.getUid,
                    name: database.getUser.username,
                    avatar: 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png',
                }}
                showUserAvatar={true}
            />
        )
    }
}

export default Chat;

const styles = StyleSheet.create({});
