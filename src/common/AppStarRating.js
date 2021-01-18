import React, {useState, useEffect} from 'react';

import View from './View';
import Icon from './Icon';
import {useSelector} from 'react-redux';
import TouchableView from './TouchableView';

const AppStarRating = ({
  rate,
  emptyStar,
  emptyStarColor,
  fullStar,
  fullStarColor,
  halfStar,
  halfStarColor,
  touchableOpacity,
  iconSet,
  size,
  starPaddingHorizontal,
  disabled,
  maxStars,
  starStyle,
  containerStyle,
  selectedStar,
  ...rest
}) => {
  const rtl = useSelector((state) => state.lang.rtl);
  const [rating, setRating] = useState(rate);
  useEffect(() => {
    setRating(rate);
  }, [rate]);

  const onPress = (r) => {
    setRating(r);

    if (selectedStar) {
      selectedStar(r);
    }
  };

  const renderStars = () => {
    const nodes = [];

    let starsLeft = Math.round(rating * 2) / 2;

    for (let i = 0; i < maxStars; i++) {
      let starIconName = emptyStar;
      let starIconColor = '#DDDBD7';
      let flip = false;

      if (starsLeft >= 1) {
        starIconName = fullStar;
        starIconColor = '#FAAA02';
      } else if (starsLeft === 0.5) {
        starIconName = halfStar;
        starIconColor = '#FAAA02';
        flip = rtl;
      }

      nodes.push(
        <TouchableView
          key={i}
          touchableOpacity={touchableOpacity}
          onPress={() => {
            onPress(i + 1);
          }}
          style={{
            paddingHorizontal: starPaddingHorizontal || 0,
          }}>
          <Icon
            paddingHorizontal={0.5}
            name={starIconName}
            type={iconSet}
            color={starIconColor}
            size={size}
            flip={flip}
            style={starStyle}
          />
        </TouchableView>,
      );

      starsLeft -= 1;
    }

    return nodes;
  };

  return (
    <View row {...rest} style={containerStyle}>
      {renderStars()}
    </View>
  );
};

AppStarRating.defaultProps = {
  size: 8,
  maxStars: 5,
  disabled: true,
  rate: 0,
  emptyStar: 'star-o',
  emptyStarColor: '#FFCACC',
  fullStar: 'star',
  fullStarColor: 'primary',
  halfStar: 'star-half-empty',
  halfStarColor: 'primary',
  iconSet: 'font-awesome',
};
export default AppStarRating;
