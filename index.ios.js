/**
 * index.ios.js
 * Top-level iOS file for registering and running the app
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import LoginPage from './js/components/pages/login/LoginPage';
import ContributePage from './js/components/pages/contribute/ContributePage';
import DiscoverPage from './js/components/pages/discover/DiscoverPage';
import ProductPage from './js/components/pages/product/ProductPage';
import PersonalPage from './js/components/pages/personal/PersonalPage';
import TabBarLayout from './js/components/layouts/TabBarLayout';

/*
 * defines the Eyespot class
 */

class Eyespot extends Component {


  /*
   * render(): returns JSX that declaratively specifies overall app UI
   */

  render() {

    /*
     * nextRouteProps: properties to pass to next route
     */

    const nextRouteProps = {};

    var onExit = false;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          navigationBarHidden={true}    /* hide navigation bar */
          initialRoute={{               /* initial route in navigator */
<<<<<<< HEAD
            title: 'DiscoverPage',
            component: PersonalPage
=======
            title: 'TabBarLayout',
            component: LoginPage,
>>>>>>> 31d37fadd0acb6ac531fa1f55f4ff05e9bf5fef7
          }}
          itemWrapperStyle={styles.itemWrapper} /* styles for nav background */
          style={{flex: 1}} />
      </View>
    );
  }
}

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  itemWrapper: {
    backgroundColor: '#fff',
    marginTop: 20
  }
});

/*
 * registers this component as the top-level app
 */

AppRegistry.registerComponent('Eyespot', () => Eyespot);
