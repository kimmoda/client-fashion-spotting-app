import uploadImage from './uploadImage.js';
import Firebase from 'firebase';

function uploadProductToCategory(newID, category){
  var categoryRef = new Firebase(`https://eyespot-658a5.firebaseio.com/category/${category}`);
  categoryRef.push(newID);
}


function uploadProductToUser(newID, category){
  const user_id = "user_1" //HACK
  var userRef = new Firebase(`https://eyespot-658a5.firebaseio.com/users/${user_id}/products`);
  userRef.push(newID);
}


function uploadNewProduct(imageData, productAndLocationData, finalizeAndContribute){

  var ref = new Firebase("https://eyespot-658a5.firebaseio.com/products");

  // HACK: replace with real user
  const userTest = {
     profilePicture: "https://res.cloudinary.com/celena/image/upload/v1468541932/u_1.png",
     username: "lovelycarrie",
     id: "user_1"
  }

  uploadImage(imageData.imgSource.uri, function(response){

    const uploadData = {
      image: {
        brightnessValue: imageData.brightnessValue,
        colorTemperatureValue: imageData.colorTemperatureValue,
        contrastValue: imageData.contrastValue,
        sharpenValue: imageData.sharpenValue,
        cloudinary: response,
        url: response.secure_url
      },
      store: productAndLocationData.store,
      item: finalizeAndContribute.contributeSummary.item,
      category: productAndLocationData.category,
      tags: finalizeAndContribute.activeExcitingTags,
      comment: finalizeAndContribute.input,
      likes: 0,
      user : userTest
    }
    var newRef = ref.push(uploadData);
    var newID = newRef.key();
    uploadProductToCategory(newID, uploadData.category);
    uploadProductToUser(newID, uploadData.category);
  });

}

module.exports = uploadNewProduct;
