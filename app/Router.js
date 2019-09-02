import React from 'react';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';


import {
    AddPost,
    Chat,
    ConfigPost,
    CreateHighlight,
    EditHighlight,
    Explore,
    Highlight,
    Home,
    Login,
    Map,
    Profile,
    Signup,
    Welcome
} from './pages';

import Icon from 'react-native-vector-icons/FontAwesome';

const HomeIcon = () => <Icon name="home" size={25}/>;
const ExploreIcon = () => <Icon name="search" size={25}/>;
const AddPostIcon = () => <Icon name="plus" size={25}/>;
const ProfileIcon = () => <Icon name="user" size={25}/>;
const MapIcon = () => <Icon name="map" size={25}/>;
const ChatIcon = () => <Icon name="comment" size={25}/>;


const RouterComponent = () => (
    <Router>
        <Stack key="root">
            <Stack key="auth" hideNavBar>
                <Scene key="welcome" component={Welcome} type="reset"/>
                <Scene key="login" component={Login} type="replace" unmountScenes={true}/>
                <Scene key="signup" component={Signup}/>
            </Stack>

            <Stack key="app" hideNavBar panHandlers={null}>
                <Tabs showLabel={false}>
                    <Scene key="home" type="reset" component={Home} icon={HomeIcon} title="Home"/>
                    <Scene key="addpost" component={AddPost} icon={AddPostIcon} hideNavBar hideTabBar/>
                    <Scene key="explore" component={Explore} icon={ExploreIcon}/>
                    <Scene key="profile" component={Profile} icon={ProfileIcon} hideNavBar/>
                    <Scene key="map" component={Map} icon={MapIcon} hideNavBar hideTabBar/>
                    <Scene key="chat" component={Chat} icon={ChatIcon} hideNavBar hideTabBar/>
                </Tabs>

                <Scene key="configPost" component={ConfigPost}/>
                <Scene key="createHighlight" component={CreateHighlight}/>
                <Scene key="editHighlight" component={EditHighlight}/>
                <Scene key="highlight" component={Highlight}/>

            </Stack>

        </Stack>
    </Router>
);

export default RouterComponent;
