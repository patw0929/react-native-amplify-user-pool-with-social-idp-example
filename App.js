/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 18,
    color: 'rgb(38, 38, 38)',
    marginTop: 20,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  facebookLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    backgroundColor: 'rgb(59, 90, 150)',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 32,
  },
  facebookLoginButtonText: {
    fontWeight: 'normal',
    fontSize: 17,
    color: 'rgb(255, 255, 255)',
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    backgroundColor: 'rgb(234, 67, 53)',
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 32,
  },
  googleLoginButtonText: {
    fontWeight: 'normal',
    fontSize: 17,
    color: 'rgb(255, 255, 255)',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    backgroundColor: 'rgb(234, 67, 53)',
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 32,
  },
  logoutButtonText: {
    fontWeight: 'normal',
    fontSize: 17,
    color: 'rgb(255, 255, 255)',
    marginLeft: 10,
  },
});

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type Props = {};
type State = {
  isLoading: boolean,
  loggedIn: boolean,
};
export default class App extends Component<Props, State> {
  state = {
    isLoading: false,
    loggedIn: false,
  };

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    console.log(event.url);
    const parts = /.*?:\/\/(\w+)(\/.*)?/g.exec(event.url);

    console.log(parts);

    if (parts[1] === 'callback') {
      const part2 = (parts[2] || '').replace('/', '');

      console.log(part2);
    }
  }

  handleLogin = (method: 'facebook' | 'google') => {
    const PROVIDER = capitalizeFirstLetter(method);
    const DOMAIN_PREFIX = 'amplify-social-idp-example';
    const REGION = 'us-west-2';
    const RESPONSE_TYPE = 'code';
    const REDIRECT_URI = 'rnampexample://callback/';
    const CLIENT_ID = '2aj40u0t7oq0ffjgq3unf364iq';
    const SCOPE = 'email+profile+openid';
    const USER_POOL_AUTHORIZE_URL = `https://${DOMAIN_PREFIX}.auth.${REGION}.amazoncognito.com/oauth2/authorize?identity_provider=${PROVIDER}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPE}`;

    Linking.canOpenURL(USER_POOL_AUTHORIZE_URL)
      .then(supported => {
        if (supported) {
          Linking.openURL(USER_POOL_AUTHORIZE_URL);
        } else {
          console.log('Error when open URL');
        }
      })
      .catch(err => {
        console.log('Error', err);
      });
  };

  render() {
    const { loggedIn } = this.props;

    return (
      <View style={styles.containerStyle}>
        <Text style={styles.headingText}>React-Native Cognito Login Example</Text>

        {loggedIn && <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            You're logged in!
          </Text>
          <TouchableOpacity onPress={() => this.handleLogout()} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>}

        {!loggedIn && <View>
          <TouchableOpacity onPress={() => this.handleLogin('facebook')} style={styles.facebookLoginButton}>
            <Text style={styles.facebookLoginButtonText}>Login with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.handleLogin('google')} style={styles.googleLoginButton}>
            <Text style={styles.googleLoginButtonText}>Login with Google</Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}
