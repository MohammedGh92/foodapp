import React, {useCallback} from 'react';
import {Navigation} from 'react-native-navigation';
import {ImageBackground} from 'react-native';
import {
  AppView,
  AppButton,
  AppIcon,
  AppText,
  AppNavigation,
} from '../../common';
import styles from './styles';
import Tabs from './tabs';
import {useSelector, useDispatch} from 'react-redux';
import colors from '../../common/defaults/colors';
import I18n from 'react-native-i18n';
import {SELECT_TAB} from '../../actions/types';
import {BAR_HEIGHT} from '../../common/utils/Constants';
import store from '../../store/store';
const source = require('../../assets/imgs/Exclusion.png');
const bc = '#FDFCFC';

const halfIndex = Tabs.length / 2;
const firstSection = Tabs.slice(0, halfIndex);
const secondSection = Tabs.slice(halfIndex, Tabs.length);

const CustomBottomTabs = ({componentId}) => {
  const rtl = useSelector((state) => state.lang.rtl);
  const renderNotch = useCallback(
    () => (
      <AppView style={styles.notchContainer} stretch>
        <AppButton
          elevation={2}
          style={styles.notchButton}
          centerSelf
          backgroundColor="#5BC4F1"
          onPress={() => {
            AppNavigation.push('addEvent');
          }}>
          <AppIcon name={'plus'} type="ant" color={bc} size={15} />
        </AppButton>
      </AppView>
    ),
    [],
  );

  const renderNotchPh = useCallback(
    () => <AppView style={styles.notchContainer} stretch />,
    [],
  );
  const {selectedIndx, notificationCounter} = useSelector(
    (state) => state.bottomTabs,
  );
  const dispatch = useDispatch();

  const onSelectTab = useCallback(
    (currentTabIndex) => {
      dispatch({type: SELECT_TAB, payload: currentTabIndex});
      Navigation.mergeOptions(componentId, {
        bottomTabs: {
          currentTabIndex,
        },
      });
    },
    [componentId, dispatch],
  );

  const renderTab = useCallback(
    (item) => {
      const isSelected = item.index === selectedIndx;
      const color = {
        color: isSelected ? colors.secondary : colors.grey,
      };

      return (
        <AppButton
          borderBottomWidth={isSelected ? 3 : 0}
          borderColor="#5BC4F1"
          key={`${item.index}`}
          backgroundColor={color}
          transparent={!isSelected}
          stretch
          margin={0}
          style={{height: BAR_HEIGHT}}
          borderRadius={0}
          row={false}
          center
          onPress={() => onSelectTab(item.index)}>
          <AppIcon
            size={9}
            style={[styles.tabIcon, color]}
            name={item.name}
            type={item.type}
            // lineHeight={8}
          />
          {item.index === 1 && notificationCounter > 0 && (
            <AppView
              center
              circleRadius={5}
              style={styles.notificationCounterContainer}
              backgroundColor="red">
              <AppText size={6} bold color="white">
                {notificationCounter}
              </AppText>
            </AppView>
          )}

          <AppText size={6} style={[styles.tabText, color]}>
            {I18n.t(`${item.label}`)}
          </AppText>
        </AppButton>
      );
    },
    [onSelectTab, selectedIndx, notificationCounter],
  );

  // const renderSection = useCallback(
  //   () => (
  //     <AppView
  //       row
  //       flex
  //       backgroundColor="tabsContainer"
  //       style={styles.barSection}
  //       spaceAround>
  //       {firstSection.map((item) => renderTab(item))}
  //     </AppView>
  //   ),
  //   [renderTab],
  // );

  const renderSection = useCallback(
    (rtl) => (
      <AppView
        row
        flex
        reverse
        backgroundColor={bc}
        style={[styles.barSection]}
        spaceAround>
        {rtl
          ? firstSection.map((item) => renderTab(item))
          : secondSection.map((item) => renderTab(item))}
      </AppView>
    ),
    [renderTab],
  );

  return (
    <AppView style={styles.bar}>
      <AppView style={[styles.bar, {overflow: 'hidden'}]}>
        <ImageBackground
          style={styles.imageContainer}
          resizeMode="cover"
          source={source}>
          {renderSection(rtl)}
          {renderNotchPh()}
          {renderSection(!rtl)}
        </ImageBackground>
      </AppView>
      <AppView row stretch flex>
        <AppView flex stretch />
        {renderNotch()}
        <AppView flex stretch />
      </AppView>
    </AppView>
  );
};

export default CustomBottomTabs;
