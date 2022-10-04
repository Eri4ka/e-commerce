import React from 'react';

import axios from 'axios';

export const useHttp = () => {
  // const [loading, setLoading] = React.useState<boolean>(false);

  const request = async (url: string, method: string = 'GET') => {
    // setLoading(true);

    try {
      const response = await axios({ method, url });

      if (!response.status) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.data;
      // setLoading(false);
      return data;
    } catch (e) {
      // setLoading(false);
      throw e;
    }
  };

  return { request } as const;
};
