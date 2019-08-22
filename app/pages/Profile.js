import React, {Component} from 'react';
import {FlatList, ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {fetchProfile} from '../actions/ProfileActions';
import {fetchPosts} from '../actions/PostActions';
import {fetchHighlights} from '../actions/HighlightActions';
import {Avatar, Card, Text} from 'react-native-elements';
import Post from '../components/post/Post';
import {MaterialIndicator,} from 'react-native-indicators';
import {translate} from "../languageHelper";
import ImagePicker from 'react-native-image-crop-picker';
import database from "../api/database";

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
        };

    }


    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchPosts();
        this.props.fetchHighlights();
    }


    // componentWillReceiveProps(nextProps) {
    //     if (this.props !== nextProps) {
    //         console.log(nextProps);
    //         this.setState({
    //             name_profile: nextProps.profile.name_profile,
    //             username: nextProps.profile.username,
    //             userpic: nextProps.profile.userpic,
    //             bio: nextProps.profile.bio,
    //             posts: nextProps.profile.posts_number,
    //             followers: nextProps.profile.followers,
    //             following: nextProps.profile.following,
    //             all_posts: nextProps.posts,
    //             postsKeys: Object.keys(nextProps.posts),
    //             postsArray: Object.values(nextProps.posts),
    //             highlightsArray: nextProps.highlights
    //         });
    //     }
    // }


    // goToEdit() {
    //     Actions.editProfile(this.props.profile);
    // }
    //
    // createNewHighlight() {
    //     Actions.createHighlight({data: this.state.all_posts});
    // }
    //
    // renderHighlights() {
    //     if (this.state.highlightsArray !== null && this.state.highlightsArray !== undefined) {
    //         let array = Object.values(this.state.highlightsArray);
    //         let keys = Object.keys(this.state.highlightsArray);
    //
    //         return array.map((highlight, i) => {
    //             return <HighlightIcon key={keys[i]} {...highlight}
    //                                   onPress={() => Actions.highlight({data: highlight})}/>;
    //         });
    //     } else {
    //         return <Text>Loading...</Text>;
    //     }
    // }
    //
    // defaultRen() {
    //     return (
    //         <View style={styles.container}>
    //             <Header title={this.state.username}/>
    //             <ScrollView contentContainerStyle={{justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
    //                 <View style={styles.picAndInfo}>
    //                     {this.renderImage()}
    //                     <View style={{flexDirection: 'column', marginLeft: 20}}>
    //                         <View style={{flexDirection: 'row', alignSelf: 'center'}}>
    //                             <View style={{flexDirection: 'column', margin: 10, marginBottom: 5}}>
    //                                 <Text style={{
    //                                     fontSize: 16,
    //                                     fontWeight: 'bold',
    //                                     alignSelf: 'center'
    //                                 }}>{this.state.posts}</Text>
    //                                 <Text style={{fontSize: 12, color: 'grey'}}>posts</Text>
    //                             </View>
    //                             <View style={{flexDirection: 'column', margin: 10, marginBottom: 5}}>
    //                                 <Text style={{
    //                                     fontSize: 16,
    //                                     fontWeight: 'bold',
    //                                     alignSelf: 'center'
    //                                 }}>{this.state.followers}</Text>
    //                                 <Text style={{fontSize: 12, color: 'grey'}}>followers</Text>
    //                             </View>
    //                             <View style={{flexDirection: 'column', margin: 10, marginBottom: 5}}>
    //                                 <Text style={{
    //                                     fontSize: 16,
    //                                     fontWeight: 'bold',
    //                                     alignSelf: 'center'
    //                                 }}>{this.state.following}</Text>
    //                                 <Text style={{fontSize: 12, color: 'grey'}}>following</Text>
    //                             </View>
    //                         </View>
    //                         <Button
    //                             styles={{
    //                                 width: 200,
    //                                 height: 30,
    //                                 backgroundColor: 'white',
    //                                 borderColor: '#dcdde1',
    //                                 borderWidth: 1
    //                             }}
    //                             textButton="Edit profile"
    //                             textStyle={{color: 'black'}}
    //                             onPress={this.goToEdit.bind(this)}
    //                         />
    //                     </View>
    //                 </View>
    //                 <View style={styles.userBioAndStories}>
    //                     <Text style={{fontSize: 12, fontWeight: 'bold'}}>{this.state.name_profile}</Text>
    //                     <Text style={{fontSize: 12}}>{this.state.bio}</Text>
    //                     <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 30}}>
    //                         <ScrollView contentContainerStyle={{height: 100}} horizontal
    //                                     showsHorizontalScrollIndicator={false}>
    //                             <View style={{flexDirection: 'column'}}>
    //                                 <TouchableOpacity style={styles.storie}
    //                                                   onPress={this.createNewHighlight.bind(this)}>
    //                                     <View>
    //                                         <Image
    //                                             style={{width: 80, height: 80}}
    //                                             source={{
    //                                                 uri: 'https://image.ibb.co/kxRZNe/image.png'
    //                                             }}
    //                                         />
    //                                     </View>
    //                                 </TouchableOpacity>
    //                             </View>
    //                             {this.renderHighlights()}
    //                         </ScrollView>
    //                     </View>
    //                 </View>
    //                 <View style={styles.typeView}>
    //                     <TouchableOpacity onPress={this.showGrid.bind(this)}>
    //                         <View>
    //                             <Ionicons
    //                                 name="md-grid"
    //                                 size={30}
    //                                 color={this.state.show.grid ? '#00a8ff' : '#dcdde1'}
    //                                 style={{marginLeft: 35, marginRight: 35, marginTop: 5, marginBottom: 5}}
    //                             />
    //                         </View>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity onPress={this.showFull.bind(this)}>
    //                         <View>
    //                             <Ionicons
    //                                 name="md-square-outline"
    //                                 size={30}
    //                                 color={this.state.show.full ? '#00a8ff' : '#dcdde1'}
    //                                 style={{marginLeft: 35, marginRight: 35, marginTop: 5, marginBottom: 5}}
    //                             />
    //                         </View>
    //                     </TouchableOpacity>
    //                 </View>
    //                 <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>{this.renderPosts()}</View>
    //             </ScrollView>
    //         </View>
    //     );
    // }

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
                <Card key={keys[i]} title={post.title} containerStyle={[styles2.card]} image={{uri: post.image}}>
                    <View style={styles2.dogView}>
                        <Text style={{marginBottom: 10}}>
                            {post.date}
                        </Text>
                        {/*<Image source={{uri: post.image}} style={styles2.image}/>*/}
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
                    <Card title={item.title} containerStyle={[styles2.card]} image={{uri: item.image}}>
                        <View style={styles2.dogView}>
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
            console.log(image);
            database.savePicture(image)
            //alert("Image: "+image+" keys: "+Object.keys(image)+ " data: "+image.data);
        });
    }

    render() {
        let pic = 'http://www.puppyhavenatl.com/wp-content/uploads/2018/02/Doggy-Daycare-JRT-1024x732.jpg';
        return (
            <ImageBackground source={{uri: "https://wallpapershome.com/images/pages/ico_h/3440.jpg"}}
                             style={styles2.backgroundContainer}
                             imageStyle={styles2.backgroundImage}>
                <View style={styles2.statusContainer}>
                    <View style={styles2.column}>
                        <Text h4 style={styles2.statusText}>{translate("friends")}</Text>
                        <Text h4 style={styles2.statusText}>{this.props.profile.profile.followers}</Text>
                    </View>
                    <View style={styles2.avatarContainer}>
                        <Text h2 style={styles2.title}>{this.props.profile.profile.username}</Text>
                        <Avatar
                            rounded
                            source={{uri: this.props.profile.profile.userpic}}
                            size='xlarge'
                            title={this.state.username}
                            containerStyle={styles2.avatar}
                            renderPlaceholderContent={<MaterialIndicator color='white'/>}
                            showEditButton
                            onEditPress={this.pickImage}
                        />
                    </View>
                    <View style={styles2.column}>
                        <Text h4 style={styles2.statusText}>{translate("posts")}</Text>
                        <Text h4 style={styles2.statusText}>{this.props.profile.profile.posts_number}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>


                    <Card title={translate("my dogs")} containerStyle={styles2.dogContainer}
                          titleStyle={styles2.subHeader}>
                        <View style={styles2.dogView}>
                            <Avatar
                                rounded
                                source={{uri: this.props.profile.profile.userpic}}
                                size='large'
                                title={this.state.username}
                                containerStyle={styles2.avatar}
                                renderPlaceholderContent={<MaterialIndicator color='white'/>}
                            />
                            <Avatar
                                rounded
                                source={{uri: this.props.profile.profile.userpic}}
                                size='large'
                                title={this.state.username}
                                containerStyle={styles2.avatar}
                                renderPlaceholderContent={<MaterialIndicator color='white'/>}
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
        justifyContent: 'space-around'
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
});
