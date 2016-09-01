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

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import _ from 'lodash';
import MapView from 'react-native-maps';
import Emblem from '../img/marker.png';

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */

const washingtonDC = {
  lat: 38.9072,
  lng: -77.0369
}

const Delta = {
  lat: 0.0922,
  lng: 0.0421,
}

// Harrison: this function checks for products with the same store
// locations and spaces out their marker coordinates so that
// they dont all appear as one product
var spaceOutNearbyProducts = (products) => {
  var locations = [];
  var spacedOutProducts = [];
  products.forEach((product) => {
      // Harrison: if the location of this product already belongs
      // to a previously checked one, then make slight edits to the coordinates
      // for display purposes (does not affect data in database)
       if(product && product.store && _.find(locations, product.store.location)) {
          product.store.location.lat = product.store.location.lat + _.random(0.001, 0.003);
          product.store.location.lng = product.store.location.lng + _.random(0.001, 0.003);
       } else if (product && product.store && product.store.location) {
          locations.push(product.store.location);
       }

       spacedOutProducts.push(product);
  });

  return spacedOutProducts;
}

/*
 * defines the MapView class
 */

var Map = React.createClass({

  /*
   * specifies types for properties that this component receives
   */

  propTypes: {
    onPressMapEmblem: PropTypes.func,
    products: PropTypes.array
  },

   /*
    * render(): returns JSX that declaratively specifies photo gallery UI
    */

    getInitialState() {
      return {
        region: {
          latitude: washingtonDC.lat,
          longitude: washingtonDC.lng,
          latitudeDelta: Delta.lat,
          longitudeDelta: Delta.lng,
        },
        markers: []
      };
    },

    componentDidMount(){
      // prevent overlapping product icons by slightly spacing out markers to
      // give appearance of a cluster

      var self = this;
      navigator.geolocation.getCurrentPosition((position) => {
          var coords = position.coords;
          self.setState({
            location : {
              lat: coords.latitude,
              lng: coords.longitude
            }
          })
        },
        (error) => {
          self.setState({
            location : washingtonDC
          })
          alert(error.message);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      // create markers from products' location data
      var markers = spaceOutNearbyProducts(this.props.products).map((product) => {

        return {
          latlng: {
            // (&& chaining lets me ensure all properties in nested objects are there)
            latitude: product && product.store && product.store.location && product.store.location.lat,
            longitude: product && product.store && product.store.location && product.store.location.lng,
            title: product && product.store && product.store.name
          }
        }
      })
      this.setState({ markers : markers });
      alert(JSON.stringify(markers));
    },

    onRegionChange(region) {
      this.setState({ region });
    },

    render() {
      var products = spaceOutNearbyProducts(this.props.products);

      return (
        <MapView
          style={styles.map}
          region={this.state.region}
          initialRegion={{
            latitude: products && products[0] && products[0].store && products[0].store.location && products[0].store.location.lat,
            longitude: products && products[0] && products[0].store && products[0].store.location && products[0].store.location.lng,
            latitudeDelta: Delta.lat,
            longitudeDelta: Delta.lng,
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
                onPress={this.props.onPressMapEmblem}
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
    height: height,
  },
  marker:{
    width: 10,
    height: 10,
  }
});

/*
 * exports this component as a module so it can be imported into other modules
 */

module.exports = Map;
