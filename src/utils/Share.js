import Share from 'react-native-share';

export const share = (message, url) => {
  const shareOptions = {
    title: '',
    message: `${message}\n`,
    url: url,
  };
  Share.open(shareOptions)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
};
