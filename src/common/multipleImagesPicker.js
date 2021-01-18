import React, {useState, useCallback, useMemo} from 'react';
import AppIcon from './Icon';
import AppImage from './Image';

import NativePicker from 'react-native-image-picker';
import {PICKER_OPTIONS} from './utils/Constants';
import AppView from './View';
import TouchableView from './TouchableAniamtedView';
import AppScrollView from './ScrollView';
import ImageResizer from 'react-native-image-resizer';
import {Alert} from 'react-native';
import colors from './defaults/colors';

const MultipleImagesPicker = ({
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
  const [uris, setUris] = useState(initialValue || []);

  const setImageUri = useCallback(
    (imgUri) => {
      console.log('uris', uris);
      console.log('imgUri', imgUri);

      const newImgs = [...uris, imgUri];
      console.log('uris after add', newImgs);

      setUris(newImgs);
      if (onChange) {
        onChange(name, newImgs);
      }
    },
    [name, onChange, uris],
  );

  const removeImageUri = useCallback(
    (indx) => {
      console.log('sss');
      if (uris.length > 1) {
        const newImgs = [...uris];
        newImgs.splice(indx, 1);
        setUris(newImgs);
        console.log('uris after remove', newImgs);
        if (onChange) {
          onChange(name, newImgs);
        }
      } else {
        setUris([]);
        onChange(name, []);
      }
    },
    [name, onChange, uris],
  );

  const pickImage = useCallback(
    async (type) => {
      if (uris.length >= 4) {
        return;
      }
      NativePicker[`${type}`](PICKER_OPTIONS, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          resize(response.uri);
        }
      });
    },
    [resize, uris],
  );
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

  const renderAddImgBtn = useCallback(() => {
    return (
      <AppView row>
        <TouchableView
          margin={2}
          onPress={() => pickImage('launchImageLibrary')}
          backgroundColor={colors.foreground}
          circleRadius={10}
          center>
          <AppIcon size={size} color="white" name="image-outline" type="ion" />
        </TouchableView>

        <TouchableView
          margin={2}
          onPress={() => pickImage('launchCamera')}
          backgroundColor={colors.foreground}
          circleRadius={10}
          center>
          <AppIcon size={size} color="white" name="camera-outline" type="ion" />
        </TouchableView>
      </AppView>
    );
  }, [pickImage, size]);

  return (
    <AppScrollView horizontal>
      <AppView stretch row>
        {uris.map((uri, indx) => {
          return (
            <AppImage
              key={uri + indx}
              source={{uri}}
              resizeMode="cover"
              margin={1}
              elevation={2}
              borderRadius={5}
              {...(circleRadius ? {} : {equalSize})}
              {...{circleRadius}}
              {...{backgroundColor}}
              {...rest}>
              <TouchableView
                onPress={() => removeImageUri(indx)}
                flex
                stretch
                center
                backgroundColor="rgba(0,0,0,.3)">
                <AppIcon color="white" size={10} name="close" type="ant" />
              </TouchableView>
            </AppImage>
          );
        })}
        {renderAddImgBtn()}
      </AppView>
    </AppScrollView>
  );
};

MultipleImagesPicker.defaultProps = {
  size: 10,
  equalSize: 8,
  backgroundColor: '#5BC4F1',
};

export default MultipleImagesPicker;
