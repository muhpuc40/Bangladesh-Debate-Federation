import apiClient from '../Axios/axiosConfig';

const apiService = {

  // Committees
  getCommittees: async () => {
    const response = await apiClient.get('/committees');
    return response.data;
  },

  // Events
  getEvents: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  },
  
  // News
  getNews: async () => {
    const response = await apiClient.get('/news');
    return response.data;
  },

  // Get single news by ID (নতুন মেথড)
  getNewsById: async (id) => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
  },

  // Announcements
  getAnnouncements: async () => {
    const response = await apiClient.get('/announcements');
    return response.data;
  },

  // Hall of Fame
  getHallOfFame: async () => {
    const response = await apiClient.get('/hall');
    return response.data;
  },

  // Directory
  getDirectory: async () => {
    const response = await apiClient.get('/directory');
    return response.data;
  },

  //registration
  register: async (payload) => {
    const response = await apiClient.post('/register', payload);
    return response.data;
  },

  // Advisors
  getAdvisors: async () => {
    const response = await apiClient.get('/advisors');
    return response.data;
  },

  // Presidium Members
  getPresidium: async () => {
    const response = await apiClient.get('/presidium');
    return response.data;
  },

};

export default apiService;