import React, {useState, useCallback, useMemo} from 'react';
import AppImage from './Image';

import NativePicker from 'react-native-image-picker';
import {PICKER_OPTIONS} from './utils/Constants';
import camera from '../assets/imgs/camera.png';
import AppView from './View';
import InputError from './micro/InputError';
import ImageResizer from 'react-native-image-resizer';
import {AppIcon} from '.';
import {Alert} from 'react-native';
const ImagePicker = ({
  equalSize,
  backgroundColor,
  name,
  onChange,
  error,
  size,
  circleRadius,
  isDirty,
  initialValue,
  ...rest
}) => {
  const showError = useMemo(() => error && isDirty, [isDirty, error]);
  const [uri, setUri] = useState(initialValue || null);

  const setImageUri = useCallback(
    (imgUri) => {
      setUri(imgUri);
      if (onChange) {
        onChange(name, imgUri);
      }
    },
    [name, onChange],
  );

  const pickImage = useCallback(async () => {
    NativePicker.showImagePicker(PICKER_OPTIONS, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert(
          'ImagePicker Error: ' +
            '\t' +
            response.error +
            '\t' +
            JSON.stringify(response.error),
        );
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        resize(response.uri);
      }
    });
  }, [resize]);

  const resize = useCallback(
    (unreizedUri) => {
      ImageResizer.createResizedImage(unreizedUri, 800, 800, 'JPEG', 80)
        .then(({uri: resizedUri}) => {
          setImageUri(resizedUri);
        })
        .catch((err) => {
          console.log(err);
          return Alert.alert(
            'Unable to resize the photo',
            // 'Check the console for full the error message',
          );
        });
    },
    [setImageUri],
  );
  return (
    <AppView stretch center>
      <AppImage
        center
        onPress={pickImage}
        margin={1}
        elevation={2}
        borderRadius={5}
        {...(circleRadius ? {} : {equalSize})}
        source={{uri}}
        {...{circleRadius}}
        resizeMode="cover"
        {...{backgroundColor}}
        {...rest}>
        {!uri && (
          <AppIcon
            size={size}
            color="white"
            name="upload-cloud"
            type="feather"
          />
        )}
      </AppImage>
      {showError && <InputError error={error} size={7} />}
    </AppView>
  );
};

ImagePicker.defaultProps = {
  size: 7,
  equalSize: 8,
  backgroundColor: '#5BC4F1',
};

export default ImagePicker;
