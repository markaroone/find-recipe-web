import axios from 'axios';

const findRecipeApiClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

export default findRecipeApiClient;