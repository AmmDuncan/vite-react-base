export const ENV_VARS = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
};

export const isTesting = process.env.NODE_ENV === 'test';
