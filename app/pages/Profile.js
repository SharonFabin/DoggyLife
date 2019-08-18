import React, {Component} from 'react';
import {ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchProfile} from '../actions/ProfileActions';
import {fetchPosts} from '../actions/PostActions';
import {fetchHighlights} from '../actions/HighlightActions';
import Button from '../components/Button';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar, Card, Icon, Image, Text} from 'react-native-elements';
import Post from '../components/post/Post';
import HighlightIcon from '../components/HighlightIcon';
import {Actions} from 'react-native-router-flux';

class Profile extends Component {
    state = {
        show: {
            grid: true,
            full: false,
            pinned: false,
            saved: false
        }
    };

    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchHighlights();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            console.log(nextProps);
            this.setState({
                name_profile: nextProps.profile.name_profile,
                username: nextProps.profile.username,
                userpic: nextProps.profile.userpic,
                bio: nextProps.profile.bio,
                posts: nextProps.profile.posts_number,
                followers: nextProps.profile.followers,
                following: nextProps.profile.following,
                all_posts: nextProps.posts,
                postsKeys: Object.keys(nextProps.posts),
                postsArray: Object.values(nextProps.posts),
                highlightsArray: nextProps.highlights
            });
        }
    }

    renderImage() {
        if (this.state.userpic) {
            return <Image style={styles2.profilePic} source={{uri: this.state.userpic}}/>;
        } else {
            return <Text>Loading image...</Text>;
        }
    }

    showGrid() {
        this.setState({
            show: {
                grid: true,
                full: false,
                pinned: false,
                saved: false
            }
        });
    }

    showFull() {
        this.setState({
            show: {
                grid: false,
                full: true,
                pinned: false,
                saved: false
            }
        });
    }

    renderPosts() {
        if (this.state.show.grid && !this.state.show.full && !this.state.show.pinned && !this.state.show.saved) {
            if (this.state.postsArray) {
                const posts = this.state.postsArray;
                const keys = this.state.postsKeys;

                return posts.map((post, i) => {
                    return (
                        <TouchableOpacity key={keys[i]}>
                            <View>
                                <Image source={{uri: post.image}} style={{width: 122.5, height: 122.5, margin: 1}}/>
                            </View>
                        </TouchableOpacity>
                    );
                });
            }
        }

        if (!this.state.show.grid && this.state.show.full && !this.state.show.pinned && !this.state.show.saved) {
            if (this.state.postsArray) {
                const posts = this.state.postsArray;
                const keys = this.state.postsKeys;

                return posts.map((post, i) => {
                    return <Post {...post} key={keys[i]} postKey={keys[i]}/>;
                });
            }
        }
    }

    goToEdit() {
        Actions.editProfile(this.props.profile);
    }

    createNewHighlight() {
        Actions.createHighlight({data: this.state.all_posts});
    }

    renderHighlights() {
        if (this.state.highlightsArray !== null && this.state.highlightsArray !== undefined) {
            let array = Object.values(this.state.highlightsArray);
            let keys = Object.keys(this.state.highlightsArray);

            return array.map((highlight, i) => {
                return <HighlightIcon key={keys[i]} {...highlight}
                                      onPress={() => Actions.highlight({data: highlight})}/>;
            });
        } else {
            return <Text>Loading...</Text>;
        }
    }

    defaultRen() {
        return (
            <View style={styles.container}>
                <Header title={this.state.username}/>
                <ScrollView contentContainerStyle={{justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
                    <View style={styles.picAndInfo}>
                        {this.renderImage()}
                        <View style={{flexDirection: 'column', marginLeft: 20}}>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'column', margin: 10, marginBottom: 5}}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }}>{this.state.posts}</Text>
                                    <Text style={{fontSize: 12, color: 'grey'}}>posts</Text>
                                </View>
                                <View style={{flexDirection: 'column', margin: 10, marginBottom: 5}}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }}>{this.state.followers}</Text>
                                    <Text style={{fontSize: 12, color: 'grey'}}>followers</Text>
                                </View>
                                <View style={{flexDirection: 'column', margin: 10, marginBottom: 5}}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }}>{this.state.following}</Text>
                                    <Text style={{fontSize: 12, color: 'grey'}}>following</Text>
                                </View>
                            </View>
                            <Button
                                styles={{
                                    width: 200,
                                    height: 30,
                                    backgroundColor: 'white',
                                    borderColor: '#dcdde1',
                                    borderWidth: 1
                                }}
                                textButton="Edit profile"
                                textStyle={{color: 'black'}}
                                onPress={this.goToEdit.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.userBioAndStories}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>{this.state.name_profile}</Text>
                        <Text style={{fontSize: 12}}>{this.state.bio}</Text>
                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 30}}>
                            <ScrollView contentContainerStyle={{height: 100}} horizontal
                                        showsHorizontalScrollIndicator={false}>
                                <View style={{flexDirection: 'column'}}>
                                    <TouchableOpacity style={styles.storie}
                                                      onPress={this.createNewHighlight.bind(this)}>
                                        <View>
                                            <Image
                                                style={{width: 80, height: 80}}
                                                source={{
                                                    uri: 'https://image.ibb.co/kxRZNe/image.png'
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {this.renderHighlights()}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.typeView}>
                        <TouchableOpacity onPress={this.showGrid.bind(this)}>
                            <View>
                                <Ionicons
                                    name="md-grid"
                                    size={30}
                                    color={this.state.show.grid ? '#00a8ff' : '#dcdde1'}
                                    style={{marginLeft: 35, marginRight: 35, marginTop: 5, marginBottom: 5}}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showFull.bind(this)}>
                            <View>
                                <Ionicons
                                    name="md-square-outline"
                                    size={30}
                                    color={this.state.show.full ? '#00a8ff' : '#dcdde1'}
                                    style={{marginLeft: 35, marginRight: 35, marginTop: 5, marginBottom: 5}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>{this.renderPosts()}</View>
                </ScrollView>
            </View>
        );
    }

    renderPost() {
        const posts = this.state.postsArray;
        const keys = this.state.postsKeys;
        return posts.map((post, i) => {
            return <Post {...post} key={keys[i]} postKey={keys[i]}/>;
        });
    }

    render() {
        let pic = 'http://www.puppyhavenatl.com/wp-content/uploads/2018/02/Doggy-Daycare-JRT-1024x732.jpg';
        return (
            <ImageBackground source={{uri: this.state.userpic}} style={styles2.backgroundContainer}
                             imageStyle={styles2.backgroundImage}>
                <View style={styles2.statusContainer}>
                    <Text h2 style={styles2.title}>{this.state.username}</Text>
                    <Avatar
                        rounded
                        source={{uri: this.state.userpic}}
                        size='xlarge'
                        title={this.state.username}
                        containerStyle={styles2.avatar}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles2.container}>
                        <View style={styles2.column}>
                            <Text h4>Friends</Text>
                            <Text h4>{this.state.followers}</Text>
                        </View>
                        <View style={styles2.column}>
                            <Text h4>Posts</Text>
                            <Text h4>{this.state.posts}</Text>
                        </View>
                    </View>
                    <Card
                        title='HELLO WORLD'
                        image={{uri: this.state.userpic}}>
                        <Text style={{marginBottom: 10}}>
                            The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff'/>}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='VIEW NOW'/>
                    </Card>
                    {this.renderPosts()}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    posts: state.post.posts,
    highlights: state.highlight.highlights
});

export default connect(
    mapStateToProps,
    {fetchProfile, fetchPosts, fetchHighlights}
)(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    picAndInfo: {
        flexDirection: 'row',
        margin: 5,
        marginTop: 10,
        marginLeft: 15
    },
    userBioAndStories: {
        flexDirection: 'column',
        margin: 10,
        marginTop: 5,
        borderBottomColor: '#dcdde1',
        borderBottomWidth: 1
    },
    typeView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    miniImage: {
        width: 125,
        height: 125,
        margin: 1
    },
    storie: {
        width: 90
    }
});

const styles2 = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        opacity: 0.6
    },
    statusContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    avatar: {
        borderColor: 'white',
        borderWidth: 2
    },
    title: {
        marginTop: 20,
        color: 'white',
        fontFamily: 'ChelseaMarket-Regular'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    column: {
        alignItems: 'center'
    }
});
