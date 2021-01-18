import {StyleSheet} from 'react-native';
import Fonts from '../../common/defaults/fonts';
import {BAR_HEIGHT} from '../../common/utils/Constants';

const notchWidth = BAR_HEIGHT * 1.4;
const NOTCH_BUTTON_RADIUS = 58;

export default StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // alignItems: 'stretch',
    height: BAR_HEIGHT,
    // overflow: 'hidden',
  },
  notchContainer: {
    width: notchWidth - 1.8,
    height: BAR_HEIGHT,
    overflow: 'visible',
  },
  notificationCounterContainer: {position: 'absolute', top: 0},
  barSection: {height: BAR_HEIGHT},
  notchButton: {
    width: NOTCH_BUTTON_RADIUS,
    height: NOTCH_BUTTON_RADIUS,
    borderRadius: NOTCH_BUTTON_RADIUS / 2,
    left: 0,
    right: 0,
    top: -25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: Fonts.normal,
    fontSize: 15,
    alignSelf: 'stretch',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabButton: {
    marginHorizontal: 10,
  },
  imageContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: BAR_HEIGHT,
  },
});
