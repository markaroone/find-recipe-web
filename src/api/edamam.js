const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_APP_KEY;

const baseUrl = 'https://api.edamam.com/api/recipes/v2';

export const singleRecipeUrl = `${baseUrl}/<ID>?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

export const multipleRecipesUrl = `${baseUrl}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients&random=true&q=<TYPE>`;

export const multipleNonRandomRecipesUrl = `${baseUrl}?type=public&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients`;
