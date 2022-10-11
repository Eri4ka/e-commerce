import axios from 'axios';

export const useHttp = () => {
  const request = async (url: string, method: string = 'GET') => {
    try {
      const response = await axios({ method, url });

      if (!response.status) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.data;
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request } as const;
};
