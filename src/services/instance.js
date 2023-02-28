
// Utility to remove JWT
export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};
