import {axiosInstance} from '@/utils/axios.ts';
import { useAuthStore } from '@/stores/auth.ts'
import axios from 'axios'
import { watchEffect } from 'vue'

export default function useApi() {
  const authStore = useAuthStore();

  watchEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if(!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore?.accessToken}`;
        }

        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    )

    axiosInstance.interceptors.response.use(
      (response) => {
        // Add any response interceptors here
        return response;
      },
      async (error) => {
        const prevRequest = error.config;

        if((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest.sent) {
          prevRequest.sent = true;
          await authStore.refreshToken();

          prevRequest.headers['Authorization'] = authStore?.accessToken;

          return axiosInstance(prevRequest);
        }

        // Handle response error
        return Promise.reject(error);
      }
    );
  })

  return axiosInstance;
}
