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

  // Get single event by ID (নতুন মেথড)
  getEventById: async (id) => {
    const response = await apiClient.get(`/events/${id}`);
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
  }
};

export default apiService;