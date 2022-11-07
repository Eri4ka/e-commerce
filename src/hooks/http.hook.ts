import axios from 'axios';

export const useHttp = () => {
  const request = async (url: string, method: string = 'GET', data?: any) => {
    try {
      const response = await axios({ method, url, data });

      if (!response.status) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const responseData = await response.data;
      return responseData;
    } catch (e) {
      throw e;
    }
  };

  return { request } as const;
};
