import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchPosts, logoutUser} from '../actions';
import Post from '../components/post/Post';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        this.props.fetchPosts();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps !== prevState){
            return {
                posts: nextProps.posts.posts
            };
        }
        return null
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props !== nextProps) {
    //         this.setState({
    //             posts: nextProps.posts.posts
    //         });
    //     }
    // }

    onPressLogout = () => {
        this.props.logoutUser();
    };

    renderPosts() {
        if (this.state.posts === undefined || this.state.posts.length === 0) {
            return (
                <View>
                    <Text>You don't have any post here, may you want to add one?</Text>
                </View>
            );
        } else {
            const arrayPosts = Object.values(this.state.posts);
            const keysPosts = Object.keys(this.state.posts);

            return arrayPosts.map((post, i) => {
                return <Post {...post} key={keysPosts[i]} postKey={keysPosts[i]}/>;
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.ScrollContainer}>
                    <Button title="Logout" onPress={this.onPressLogout.bind(this)}/>
                    {this.renderPosts()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.post
});

export default connect(
    mapStateToProps,
    {fetchPosts, logoutUser}
)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    ScrollContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
