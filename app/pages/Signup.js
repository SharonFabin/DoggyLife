import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Button from '../components/Button';
import {Input} from 'react-native-elements';
import Title from '../components/Title';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createUser } from '../actions/AuthActions';
import Iconnion from "react-native-vector-icons/FontAwesome";
import {colors} from "../constants/theme";
import { Icon } from 'react-native-elements';

class Signup extends Component {
  state = {
    user: '',
    password: ''
  };

  onChangeUser = text => {
    this.setState({
      user: text
    });
  };

  onChangePassword = text => {
    this.setState({
      password: text
    });
  };

  onPressSignUp = () => {
    this.props.createUser(this.state.user, this.state.password);
  };

  onGoBack = () => {
    Actions.pop();
  };

  renderButtons() {
    if (this.props.auth.loading) {
      return <ActivityIndicator />;
    } else {
      return <Button textButton="Signup" onPress={this.onPressSignUp.bind(this)} />;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Title title="Register" />
        <Icon
            name="paw"
            iconStyle={styles.IconCenter}
        />

        <Input
            placeholder="email@gmail.com"
            leftIcon={<Iconnion name='envelope' size={24} color={colors.black}/>}
            leftIconContainerStyle={styles.iconContainerStyle}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputInputContainer}
            inputStyle={styles.inputInput}
            onChange={this.onChangeUser.bind(this)}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            value={this.state.user}
        />

        <Input
            placeholder='password'
            secureTextEntry
            leftIcon={<Iconnion name='key' size={24} color={colors.black}/>}
            leftIconContainerStyle={styles.iconContainerStyle}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputInputContainer}
            inputStyle={styles.inputInput}
            onChangeText={this.onChangePassword.bind(this)}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            value={this.state.password}
        />


        <Text>{this.props.auth.errorCreating}</Text>
        {this.renderButtons()}
        <TouchableOpacity onPress={this.onGoBack.bind(this)}>
          <View>
            <Text style={styles.text}>Already got an account, take me back!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createUser }
)(Signup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue'
  },
  text: {
    color: 'blue',
    fontSize: 15
  },
  inputInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white'
  },
  inputContainer: {
    width: 300,
    height: 50,
  },
  inputInput: {
    color: 'white'
  },
  iconContainerStyle: {
    paddingRight: 10,
    width: 40,
  },
  IconCenter:{
    textAlign: 'center'
  }

});
