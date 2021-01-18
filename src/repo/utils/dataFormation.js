export const dataToFormData = (values) => {
  const data = new FormData();
  const keys = Object.keys(values);
  keys.forEach((key) => {
    if (values[key] !== '') {
      data.append(key, values[key]);
    }
  });
  return data;
};

export const objectToArray = (values) => {
  const keys = Object.keys(values);
  const array = [];
  keys.forEach((key) => {
    if (values[key] !== '') {
      array.push(values[key]);
    }
  });
  return array;
};

export const AppendImgValue = (data, value) => {
  if (value.value) {
    data.append(value.name, {
      uri: value.value,
      type: 'image/*',
      name: value.name,
    });

    return data;
  }
  return data;
};
