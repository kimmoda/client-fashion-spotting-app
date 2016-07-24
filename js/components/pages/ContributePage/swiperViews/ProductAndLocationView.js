/**
 * ProductAndLocationView.js
 * Second page in Contribute swiper
 *
 * @providesModule ProductAndLocationView
 * @flow
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';
import PlacesNearby from '../../../partials/PlacesNearby';
import LocationPage from '../../LocationPage';
import SelectCategory from '../../../partials/SelectCategory';

const washingtonDC = {
  lat: 38.9072,
  lng: -77.0369
}

var {height, width} = Dimensions.get('window'); /* gets screen dimensions */


var ProductAndLocationView = React.createClass({
	getInitialState() {
		return {
  		storeSelected: {},
      categorySelected: {}
		}
	},

  updateParent(){
    var storeObject = {};
    if(this.state.storeSelected.name){
      console.log(this.state.storeSelected);
      var vicinity = this.state.storeSelected.vicinity;
      vicinity = vicinity.replace("#", "");
      storeObject = {
        id: this.state.storeSelected.id,
        name: this.state.storeSelected.name,
        location: this.state.storeSelected.geometry.location,
        place_id: this.state.storeSelected.place_id,
        vicinity: vicinity
      }
    }
    this.props.updateUploadData("productAndLocationView", {
      category : this.state.categorySelected.key,
      store : storeObject
    });
  },

  selectCategory(category){
    this.setState({categorySelected: category}, function(){
      this.updateParent();
      if(this.state.categorySelected.name && this.state.storeSelected.name){
        this.props.handleShowNextButton(true);
      }
    });
  },
  setStore(store){
    this.setState({storeSelected: store}, function(){
      this.updateParent();
      if(this.state.categorySelected.name && this.state.storeSelected.name){
        this.props.handleShowNextButton(true);
      }
    });

  },

  searchForStore(){
    this.props.navigator.push({
      title: 'Search For Store',
      component: LocationPage,
      passProps:{
        location: washingtonDC,
        setStore: this.setStore
      }
    });
  },

	render() {
		const { storeSelected } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.text}>PRODUCT AND LOCATION</Text>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>ARE YOU HERE?</Text>
					<PlacesNearby
            setStore={this.setStore}
            storeSelected={storeSelected}
            location={washingtonDC}/>
				</View>

        <TouchableOpacity
          style={styles.storeFilterBar}
          onPress={this.searchForStore}>
            <View style={styles.autocompleteContainer}>
              <Text style={styles.autocompleteText}>{storeSelected.name}</Text>
            </View>
            <View>
              <Image
                source={require('../../../partials/icons/common/img/location-icon.png')}
                style={styles.icon} />
            </View>
        </TouchableOpacity>
        <SelectCategory
          selectCategory={this.selectCategory}
          categorySelected={this.state.categorySelected}/>
			</View>
		);
	}

});

const iconSize = height/25;
const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
};

const footerHeight = 60;

const styles = StyleSheet.create({
  storeFilterBar: {
    ...border,
    width: width/1.3,
    height: height/15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
	autocompleteContainer: {
    height: height/15,
    flex: 7,
    justifyContent: 'center',
	},
	autocompleteText: {
    fontFamily: 'Avenir-Roman',
    fontSize: 18,
    marginLeft: 10
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height,
		width,
	},
	icon: {
		width: iconSize,
		height: iconSize,
		resizeMode: Image.resizeMode.contain,
		margin: width / 70
	},
	nextStepIcon: {
		width: iconSize/2,
		height: iconSize/2
	},
	section: {
		width: width/1.3,
		marginVertical: height/45,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	sectionTitle: {
		marginBottom: height/45,
		fontSize: height/55
	},

	text: {
		fontFamily: 'Avenir-Roman',
		marginBottom: height/45,
	},
});

module.exports = ProductAndLocationView;
