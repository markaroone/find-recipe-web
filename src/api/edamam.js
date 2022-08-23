import edamamApiClient from './edamamApiClient';

const getRecipes = () => {
  edamamApiClient.get();
};

export default {
  getRecipes,
};
