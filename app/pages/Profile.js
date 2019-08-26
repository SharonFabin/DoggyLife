import React, {Component} from 'react';
import {FlatList, ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchProfile} from '../actions/ProfileActions';
import {fetchPosts} from '../actions/PostActions';
import {fetchHighlights} from '../actions/HighlightActions';
import {Avatar, Card, Icon, Overlay, Text} from 'react-native-elements';
import Post from '../components/post/Post';
import {MaterialIndicator,} from 'react-native-indicators';
import {translate} from "../languageHelper";
import ImagePicker from 'react-native-image-crop-picker';
import database from "../api/database";
import LinearGradient from "react-native-linear-gradient";
import {Actions} from 'react-native-router-flux';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: {
                grid: true,
                full: false,
                pinned: false,
                saved: false
            },
            posts: [],
            isVisible: false,
            tmpDog: {
                name: '',
                breed: '',
                age: '',
                sex: '',
                castration: false
            }
        };

    }


    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchPosts();
        this.props.fetchHighlights();
    }


    renderPost() {
        const posts = Object.values(this.props.posts.posts);
        const keys = Object.keys(this.props.posts.posts);
        return posts.map((post, i) => {
            return <Post {...post} key={keys[i]} postKey={keys[i]}/>;
        });
    }

    renderPostsCards() {
        const posts = Object.values(this.props.posts.posts);
        const keys = Object.keys(this.props.posts.posts);
        return posts.map((post, i) => {
            return (
                <Card key={keys[i]} title={post.title} containerStyle={[styles.card]} image={{uri: post.image}}>
                    <View style={styles.dogView}>
                        <Text style={{marginBottom: 10}}>
                            {post.date}
                        </Text>
                        {/*<Image source={{uri: post.image}} style={styles.image}/>*/}
                    </View>
                </Card>
            );
        });
    }

    renderPostsList() {
        const posts = Object.values(this.props.posts.posts);
        const keys = Object.keys(this.props.posts.posts);
        return (
            <FlatList
                data={posts}
                renderItem={({item}) => (
                    <Card title={item.title} containerStyle={[styles.card]} image={{uri: item.image}}>
                        <View style={styles.dogView}>
                            <Text style={{marginBottom: 10}}>
                                {item.date}
                            </Text>
                        </View>
                    </Card>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }

    pickImage() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            database.saveImageGetUrl(image, 'profile')
                .then(url => {
                    return database.updateProfilePicture(url);
                })
                .catch(err => alert(err));
        });
    }

    renderOverlayContent() {
        return (
            <LinearGradient colors={['rgba(255,128,8,0.95)', 'rgba(255,200,55,0.95)']}
                            style={styles.LinearGradientStyle}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        rounded
                        source={{uri: this.props.profile.profile.userpic}}
                        size={100}
                        title={this.state.username}
                        containerStyle={styles.avatar}
                        renderPlaceholderContent={<MaterialIndicator color='white'/>}
                        showEditButton
                        onEditPress={this.pickImage}
                    />
                    <View>
                        <Text>Dog name:</Text>
                        <Text>Breed:</Text>
                        <Text>Age:</Text>
                        <Text>Sex:</Text>
                        <Text>Castration:</Text>
                    </View>
                </View>
            </LinearGradient>

        );
    }

    render() {
        let pic = 'http://www.puppyhavenatl.com/wp-content/uploads/2018/02/Doggy-Daycare-JRT-1024x732.jpg';
        return (

            <ImageBackground source={{uri: "https://wallpapershome.com/images/pages/ico_h/3440.jpg"}}
                             style={styles.backgroundContainer}
                             imageStyle={styles.backgroundImage}>
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({isVisible: false})}
                    overlayStyle={styles.overlayStyle}
                    containerStyle={styles.overlayContainer}
                    borderRadius={5}
                >
                    {this.renderOverlayContent()}
                </Overlay>
                <View style={styles.statusContainer}>
                    <View style={styles.column}>
                        <Text h4 style={styles.statusText}>{translate("friends")}</Text>
                        <Text h4 style={styles.statusText}>{this.props.profile.profile.followers}</Text>
                    </View>
                    <View style={styles.avatarContainer}>
                        <Text h2 style={styles.title}>{this.props.profile.profile.username}</Text>
                        <Avatar
                            rounded
                            source={{uri: this.props.profile.profile.userpic}}
                            size='xlarge'
                            title={this.state.username}
                            containerStyle={styles.avatar}
                            renderPlaceholderContent={<MaterialIndicator color='white'/>}
                            showEditButton
                            onEditPress={this.pickImage}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text h4 style={styles.statusText}>{translate("posts")}</Text>
                        <Text h4 style={styles.statusText}>{this.props.profile.profile.posts_number}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>


                    <Card title={translate("my dogs")} containerStyle={styles.dogContainer}
                          titleStyle={styles.subHeader}>
                        <View style={styles.dogView}>
                            <Avatar
                                rounded
                                source={{uri: this.props.profile.profile.userpic}}
                                size={'large'}
                                title={this.state.username}
                                containerStyle={styles.avatar}
                                renderPlaceholderContent={<MaterialIndicator color='white'/>}
                                showEditButton
                                onEditPress={this.pickImage}
                            />
                            <Avatar
                                rounded
                                source={{uri: this.props.profile.profile.userpic}}
                                size={'large'}
                                title={this.state.username}
                                containerStyle={styles.avatar}
                                renderPlaceholderContent={<MaterialIndicator color='white'/>}
                                showEditButton
                                onEditPress={this.pickImage}
                            />
                            <Avatar
                                rounded
                                source={{uri: this.props.profile.profile.userpic}}
                                size={'large'}
                                title={this.state.username}
                                containerStyle={styles.avatar}
                                renderPlaceholderContent={<MaterialIndicator color='white'/>}
                                showEditButton
                                onEditPress={this.pickImage}
                            />


                            <Icon
                                raised
                                name='plus'
                                type='font-awesome'
                                color='orange'
                                onPress={() => Actions.editDog()}
                            />


                        </View>
                    </Card>
                    {this.renderPostsCards()}

                </ScrollView>


            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    posts: state.post,
    highlights: state.highlight.highlights
});

export default connect(
    mapStateToProps,
    {fetchProfile, fetchPosts, fetchHighlights}
)(Profile);

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    backgroundImage: {
        opacity: 0.8
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    avatarContainer: {
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
        fontFamily: 'ChelseaMarket-Regular',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    statusText: {
        color: 'rgb(255,255,255)',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    column: {
        width: 100,
        alignItems: 'center',
        color: 'white'
    },
    dogView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    card: {
        borderWidth: 0,
        borderTopWidth: 5,
        borderTopColor: 'rgba(20,20,20,0.7)',
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    },
    subHeader: {},
    dogContainer: {
        width: '100%',
        margin: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    SectionHeader: {
        backgroundColor: '#64B5F6',
        fontSize: 20,
        padding: 5,
        color: '#fff',
        fontWeight: 'bold'
    },
    SectionListItemS: {
        fontSize: 16,
        padding: 6,
        color: '#000',
        backgroundColor: '#F5F5F5'
    },
    overlayContainer: {},
    overlayStyle: {
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
        margin: 0,
    },
    LinearGradientStyle: {
        flex: 1,
        padding: 0,
        margin: 0,
    },
});
