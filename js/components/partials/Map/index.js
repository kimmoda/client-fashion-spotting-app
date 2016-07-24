/**
 * Map.js
 * Photo collections with grid display
 *
 * @providesModule MapViewContainer
 * @flow
 */

'use strict'; /* enables JS strict mode for any ES5 code */

/*
 * imports required modules
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import Emblem from '../img/marker.png';


var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

const washingtonDC = {
  lat: 38.9072,
  lng: -77.0369
}


/*
 * defines the MapView class
 */

var Map = React.createClass({

   /*
    * render(): returns JSX that declaratively specifies photo gallery UI
    */

    getInitialState() {
      return {
        region: {
          latitude: washingtonDC.lat,
          longitude: washingtonDC.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        markers: []
      };
    },

    onRegionChange(region) {
      this.setState({ region });
    },

    render() {
      return (
        <MapView
          style={styles.map}
          region={this.state.region}
          initialRegion={{
            latitude: washingtonDC.lat,
            longitude: washingtonDC.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={this.onRegionChange}>
          {this.state.markers.map((marker, i) => {
            return (
              <MapView.Marker
                key={i}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                image={Emblem}
              />
            )
          })}
        </MapView>
      )
    }
});

/*
 * CSS stylings
 */

const styles = StyleSheet.create({
  map:{
    width: width,
    height: height
  },
  marker:{
    width: 30,
    height: 30,
    // resizeMode:'contain'
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = Map;
