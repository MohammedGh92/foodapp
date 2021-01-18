import './Base/polyfill';

export {default as AppView} from './View';
export {default as AppScrollView} from './ScrollView';
export {default as AppText} from './Text';
export {default as AppIcon} from './Icon';
export {default as AppSpinner} from './Indicator';
export {default as AppButton} from './Button';
export {default as AppImage} from './Image';
export {default as AppList} from './List';
export {default as AppListItem} from './AppListItem';
export {default as AppInput} from './Input';
export {default as AppTextArea} from './TextArea';
export {default as AppRadioButton} from './RadioButton';
export {default as AppCheckBox} from './CheckBox';
export {default as AppNavigation} from './Navigation';
export {default as AppRadioGroup} from './RadioGroup';
export {default as CheckBoxGroup} from './CheckBoxGroup';
export {default as AppModal} from './Modal';
export {default as AppcreateStackNavigation} from './StackNavigation';
export {default as AppInputError} from './micro/InputError';
export {registerCustomIconType} from './utils/icon';
export {getColors, getColor, getTheme, getFonts} from './Theme';
export {showInfo, showSuccess, showError} from './utils/localNotifications';

export {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  moderateScale,
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
  statusBarHeight,
} from './utils/responsiveDimensions';
export {default as LocaleEn} from './defaults/en.json';
export {default as LocaleAr} from './defaults/ar.json';
export {default as AppSlider} from './AppSlider';
export {default as AppStarRating} from './AppStarRating';
export {default as AppPicker} from './Picker';

export {default as AppForm} from './Form';

// export {default as ImagePicker} from './ImagePicker';
export {default as AppSwiper} from './Swiper';
export {default as TouchableView} from './TouchableView';
export {default as ImagePicker} from './ImagePicker';

export {default as AppDatePicker} from './DatePicker';

export {default as AppTouchableAniamtedView} from './TouchableAniamtedView';

export {default as AppAniamtedView} from './AniamtedView';
export {default as MultipleImagesPicker} from './multipleImagesPicker';
export {default as ProdItem} from './custom/ProdItem';
export {default as CategoryItem} from './custom/CategoryItem';
export {default as OrderItem} from './custom/OrderItem';
export {default as CartItem} from './custom/CartItem';
export {default as RecipeItem} from './custom/RecipeItem';
