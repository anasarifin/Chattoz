import React, {useState} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  Picker,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Button,
} from 'react-native';
// import {Input, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Kaede} from 'react-native-textinput-effects';

const url = 'http://100.24.32.116:9999/api/v1/products';

const Profile = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const postData = () => {
    // const formData = new FormData();
    // formData.append('name', this.state.name);
    // formData.append('description', this.state.description);
    // formData.append('price', this.state.price);
    // formData.append('stock', this.state.stock);
    // formData.append('image', {
    //   uri: this.state.image.uri,
    //   type: this.state.image.type,
    //   name: this.state.image.fileName,
    // });
    // formData.append('category_id', this.state.category);
    // if (
    //   !this.state.name ||
    //   !this.state.description ||
    //   !this.state.price ||
    //   !this.state.stock
    // ) {
    //   ToastAndroid.show('Adding failed!', ToastAndroid.SHORT);
    // }
    Axios.post(url, formData, {
      headers: {
        usertoken: AsyncStorage.getItem('token'),
      },
    })
      .then(() => {
        // this.props.dispatch(
        //   products('http://100.24.32.116:9999/api/v1/products?page=1'),
        // );
        ToastAndroid.show('Adding success!', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
        this.setState({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: 0,
          image: {uri: null, type: null, fileName: null},
        });
      })
      .catch(reject => {
        ToastAndroid.show('Adding failed!', ToastAndroid.SHORT);
        console.log(reject);
      });
  };

  const picker = async () => {
    const options = {
      title: 'Select Image',
      takePhotoButtonTitle: 'Take photo from camera',
      chooseFromLibraryButtonTitle: 'Choose photo from gallery',
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response.uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          image: response,
        });
      }
    });
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={false} />
      <View>
        <Kaede label="Name" onChange={e => setName(e.nativeEvent.text)} />
        <Kaede label="Email" onChange={e => setEmail(e.nativeEvent.text)} />
        <Kaede label="Phone" onChange={e => setPhone(e.nativeEvent.text)} />
        <Kaede label="Address" onChange={e => setAddress(e.nativeEvent.text)} />
        <Kaede label="Birthdate" onChange={e => setBirth(e.nativeEvent.text)} />
        <Kaede label="Gender" onChange={e => setGender(e.nativeEvent.text)} />
        <Kaede
          label="Location"
          onChange={e => setLocation(e.nativeEvent.text)}
        />
        {/* <Picker
            selectedValue={this.state.category}
            style={styles.picker}
            onValueChange={value => this.setState({category: value})}>
            {this.props.products.categoryList.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.name}
                  value={parseFloat(item.id)}
                />
              );
            })}
          </Picker> */}
        <Button onPress={picker} title="Select Image" />
        {/* <Image style={styles.preview} source={{uri: this.state.image.uri}} /> */}
      </View>
      <Button
        title="Change"
        // onPress={this.postData}
        onPress={postData}
      />
    </SafeAreaView>
  );
};

export default Profile;

// class Modalx extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       show: false,
//       category: 0,
//       image: {uri: null, type: null, fileName: null},
//     };
//     this.hideModal = this.hideModal.bind(this);
//     this.picker = this.picker.bind(this);
//     this.postData = this.postData.bind(this);
//   }

// hideModal() {
//   this.setState({
//     show: false,
//   });
// }

//   handleBackPress() {
//     this.props.event;
//   }
//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
//   }
//   nothing() {
//     return false;
//   }

// textChange(value, type) {
//   this.setState({
//     [type]: value,
//   });
// }

//   render() {
//     // this.getName();
//     return (
//       <SafeAreaView
//         style={styles.containerMain}
//         //   onRequestClose={
//         //     this.props.show === true ? this.props.event : this.nothing
//         //   }
//       >
//         <StatusBar backgroundColor="rgba(0,0,0,.3)" translucent={false} />
//         {/* <TouchableOpacity style={styles.back} onPress={this.props.event}>
//           <Ionicons name="md-arrow-round-back" size={30} />
//           <Text style={styles.backText}>Back</Text>
//         </TouchableOpacity> */}
//         <View style={styles.container}>
//           <TextInput
//             value={this.state.name}
//             label="Name"
//             onChange={e => this.setState({name: e.nativeEvent.text})}
//           />
//           <TextInput
//             value={this.state.description}
//             label="Description"
//             onChange={e => this.setState({description: e.nativeEvent.text})}
//           />
//           <TextInput
//             value={this.state.price}
//             label="Price"
//             onChange={e => this.setState({price: e.nativeEvent.text})}
//           />
//           <TextInput
//             value={this.state.stock}
//             label="Stock"
//             onChange={e => this.setState({stock: e.nativeEvent.text})}
//           />
//           {/* <Picker
//             selectedValue={this.state.category}
//             style={styles.picker}
//             onValueChange={value => this.setState({category: value})}>
//             {this.props.products.categoryList.map((item, index) => {
//               return (
//                 <Picker.Item
//                   key={index}
//                   label={item.name}
//                   value={parseFloat(item.id)}
//                 />
//               );
//             })}
//           </Picker> */}
//           <Button onPress={this.picker} title="Select Image" />
//           <Image style={styles.preview} source={{uri: this.state.image.uri}} />
//         </View>
//         <Button
//           title="Change"
//           // onPress={this.postData}
//           onPress={this.postData}
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   containerMain: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'whitesmoke',
//     marginTop: 20,
//   },
//   inputCon: {
//     alignItems: 'center',
//   },
//   back: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: 'whitesmoke',
//   },
//   backText: {
//     fontSize: 22,
//     marginHorizontal: 10,
//     fontWeight: 'bold',
//   },
//   input: {
//     marginBottom: 40,
//     width: '90%',
//   },
//   inputText: {
//     textAlign: 'center',
//   },
//   label: {
//     marginTop: 20,
//   },
//   button: {
//     width: '85%',
//   },
//   buttonRed: {
//     width: '85%',
//     backgroundColor: 'red',
//   },
//   buttonCon: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonImage: {
//     height: 30,
//     borderRadius: 0,
//   },
//   picker: {
//     width: '60%',
//     height: 50,
//     marginTop: -20,
//     marginBottom: 20,
//   },
//   preview: {
//     width: 100,
//     height: 100,
//     marginTop: 2,
//   },
// });

// const mapStateToProps = state => {
//   return {
//     products: state.products,
//   };
// };

// export default Modalx;