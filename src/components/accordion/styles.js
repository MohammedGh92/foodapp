import {StyleSheet} from 'react-native';

const size = 30;

export const LIST_ITEM_HEIGHT = 54;
export default StyleSheet.create({
  listContainer: {
    marginTop: 16,
    alignSelf: 'stretch',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f4f4f6',
    height: LIST_ITEM_HEIGHT,
  },
  listItemName: {
    fontSize: 16,
  },
  listItemPointsContainer: {
    borderRadius: 8,
    backgroundColor: '#44c282',
    padding: 8,
  },
  listItemPoints: {
    color: 'red',
    fontWeight: 'bold',
  },
  chevronContainer: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -2,
    bottom: -2,
    backgroundColor: 'white',
    zIndex: 1000,
  },
});
