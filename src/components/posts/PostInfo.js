import React from 'react';
import {
  AppImage,
  AppText,
  AppView,
  responsiveHeight,
  TouchableView,
} from '../../common';
import {useSelector} from 'react-redux';
import {APP_BASE_URL} from '../../api/utils/urls';
const PostInfo = ({data}) => {
  return (
    <AppView stretch>
      <AppText color="#433E70" marginVertical={5}>
        {data.body}
      </AppText>
      <AppView flex stretch>
        {data.images.length === 1 ? (
          <AppImage
            imageViewer
            data={[{uri: `${APP_BASE_URL}${data.images[0].image}`}]}
            source={{uri: `${APP_BASE_URL}${data.images[0].image}`}}
            width={90}
            height={40}
            borderRadius={5}
          />
        ) : data.images.length === 2 ? (
          <AppView row spaceBetween stretch>
            <AppImage
              imageViewer
              data={[{uri: `${APP_BASE_URL}${data.images[0].image}`}]}
              source={{uri: `${APP_BASE_URL}${data.images[0].image}`}}
              width={42}
              height={40}
            />
            <AppImage
              imageViewer
              data={[{uri: `${APP_BASE_URL}${data.images[1].image}`}]}
              source={{uri: `${APP_BASE_URL}${data.images[1].image}`}}
              width={42}
              height={40}
              borderRadius={5}
            />
          </AppView>
        ) : data.images.length === 3 ? (
          <AppView spaceBetween stretch row flex>
            <AppImage
              imageViewer
              data={[{uri: `${APP_BASE_URL}${data.images[0].image}`}]}
              source={{uri: `${APP_BASE_URL}${data.images[0].image}`}}
              height={40}
              width={45}
              borderRadius={5}
            />
            <AppView>
              <AppImage
                imageViewer
                data={[{uri: `${APP_BASE_URL}${data.images[1].image}`}]}
                source={{uri: `${APP_BASE_URL}${data.images[1].image}`}}
                width={42}
                height={19}
                borderRadius={5}
                style={{marginBottom: responsiveHeight(2)}}
              />
              <AppImage
                imageViewer
                data={[{uri: `${APP_BASE_URL}${data.images[2].image}`}]}
                source={{uri: `${APP_BASE_URL}${data.images[2].image}`}}
                width={42}
                height={19}
                borderRadius={5}
              />
            </AppView>
          </AppView>
        ) : data.images.length > 3 ? (
          <AppView spaceBetween row wrap stretch>
            {data.images.map((item, index) => {
              return (
                <AppImage
                  imageViewer
                  data={[{uri: `${APP_BASE_URL}${item.image}`}]}
                  source={{uri: `${APP_BASE_URL}${item.image}`}}
                  width={42}
                  height={19}
                  borderRadius={5}
                  style={{marginBottom: responsiveHeight(2)}}
                />
              );
            })}
          </AppView>
        ) : null}
      </AppView>
    </AppView>
  );
};

export default PostInfo;
