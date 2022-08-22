import edamamApiClient from './edamamApiClient';

const getRecipes = () => {
  edamamApiClient.get(
    '&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients'
  );
};

export default {
  getRecipes,
};
