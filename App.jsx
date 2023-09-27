import React, { useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image,} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNFS} from 'react-native-fs';

const App = () => {
  const [images, setImages] = useState([]);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        const imageUri = response.uri;
        saveImage(imageUri);
      }
    });
  };

  const saveImage = async (imageUri) => {
    try {
      const response = await RNFS.copyFile(imageUri, `${RNFS.DocumentDirectoryPath}/${Date.now()}.jpg`);
      if (response) {
        setImages([...images, response]);
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>
        Галерея
      </Text>
      <TouchableOpacity
        onPress={selectImage}
        style={{
          backgroundColor: 'blue',
          alignItems: 'center',
          padding: 10,
          margin: 10,
        }}
      >
        <Text style={{ color: 'white' }}>Добавить фото</Text>
      </TouchableOpacity>
      <ScrollView>
        {images.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: `file://${imageUri}` }}
            style={{ width: 200, height: 200, margin: 10 }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default App;
