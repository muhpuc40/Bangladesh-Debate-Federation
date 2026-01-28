import apiClient from '../Axios/axiosConfig';

const apiService = {
  getCommittees: async () => {
    const response = await apiClient.get('/committees');
    return response.data;
  },

  getEvents: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  }
};

export default apiService;