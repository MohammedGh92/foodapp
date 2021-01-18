import React, {Component} from 'react';
// import PhotoView from '@merryjs/photo-viewer';
import {View, StyleSheet} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import AppModal from '../common/Modal';
import AppIcon from '../common/Icon';
import AppView from '../common/View';
import {moderateScale} from '../common/utils/responsiveDimensions';
import TouchableView from '../common/TouchableView';

export default class LightBox extends Component {
  state = {
    isVisible: false,
  };

  toggleModal = (isVisible) => {
    this.setState({
      isVisible,
    });
  };

  render() {
    const {index, data} = this.props;

    const {isVisible} = this.state;
    const arrows =
      data.length > 1
        ? {
            renderArrowLeft: () => (
              <AppView
                center
                height={6}
                backgroundColor="black"
                marginHorizontal={5}
                width={8}
                borderRadius={10}>
                <AppIcon name="ios-arrow-back" tpye="ion" color="white" />
              </AppView>
            ),
            renderArrowRight: () => (
              <AppView
                center
                height={6}
                backgroundColor="black"
                marginHorizontal={5}
                width={8}
                borderRadius={10}>
                <AppIcon name="ios-arrow-forward" tpye="ion" color="white" />
              </AppView>
            ),
          }
        : {};
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        isVisible={isVisible}
        backdropOpacity={0}
        changeState={(v) => this.toggleModal(v)}>
        <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <ImageViewer
            renderIndicator={() => {}}
            enableSwipeDown
            onSwipeDown={() => {
              this.toggleModal(false);
            }}
            imageUrls={data.map((i) => {
              if (i.uri) {
                return {
                  url: i.uri,
                };
              }
              return {
                props: {
                  source: i,
                },
              };
            })}
            enablePreload
            // index={index || 0}
            {...arrows}
          />
          <TouchableView
            backgroundColor="white"
            style={{
              position: 'absolute',
              right: moderateScale(8),
              top: moderateScale(15),
            }}
            circleRadius={10}
            center
            onPress={() => this.toggleModal(false)}
            touchableOpacity>
            <AppIcon name="close" type="material" size={9} color="black" />
          </TouchableView>
        </View>
      </AppModal>
    );
  }
}
