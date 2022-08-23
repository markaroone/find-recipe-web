import axios from 'axios';

const APP_ID = 'aa145f41';
const APP_KEY = 'a8cc1865f185e28cb340c004b2b49d1e';

const baseURL =
  'https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=<APP_ID>&app_key=<APP_KEY>';

const url = baseURL.replace('<APP_ID>', APP_ID).replace('<APP_KEY>', APP_KEY);

const edamamApiClient = axios.create({
  baseURL:
    'https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=aa145f41&app_key=a8cc1865f185e28cb340c004b2b49d1e&field=label&field=image&field=calories&field=cuisineType&field=dietLabels&field=source&field=url&field=totalTime&field=uri&field=yield&field=ingredients',
});

export default edamamApiClient;
