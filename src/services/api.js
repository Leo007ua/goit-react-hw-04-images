import axios from 'axios';

const instance = axios.create({
  baseURL: `https://pixabay.com/api/`,
  params: {
    key: '38288966-e53ca91b55984086b96a3f44c',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const requestPhotos = async (pictureName, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q: pictureName,
      page,
    },
  });
  return data;
};
