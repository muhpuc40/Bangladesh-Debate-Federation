import apiClient from '../Axios/axiosConfig';

const apiService = {
  getCommittees: async () => {
    const response = await apiClient.get('/committees');
    return response.data;
  },

  getEvents: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  },

  getNews: async () => {
    const response = await apiClient.get('/news');
    return response.data;
  },

  getAnnouncements: async () => {
    const response = await apiClient.get('/announcements');
    return response.data;
  }
};

export default apiService;