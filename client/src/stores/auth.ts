import {defineStore} from 'pinia';
import {ref} from "vue";
import type { LoginData, RegisterData, State, User } from '@/types'
import useApi from "@/composables/useApi";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>();
  const accessToken = ref<string | null>(null);

  const apiAxios = useApi();

  const isAuthenticated = (state: State) => {
    return !!state.user.id
  }

  const login = async (payload: LoginData) :Promise<void> => {
    try {
      const { data } = await apiAxios.post('/api/auth/login', payload);
      accessToken.value = data.access_token;
      console.log('Token: ', data.access_token);
      return data
    } catch (error: Error | any) {
      throw error.response.message;
    }
  };

  const register = async (payload: RegisterData) :Promise<void> => {
    try {
      const { data } = await apiAxios.post('api/auth/register', payload);
      return data
    } catch (error: Error | any) {
      throw error.response.message;
    }
  };

  const getUser = async () :Promise<void> => {
    try {
      const { data } = await apiAxios.get('/api/auth/user');
      user.value = data
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  };

  const logout = async () :Promise<void> => {
    try {
      const { data } = await apiAxios.post('/api/auth/logout');
      accessToken.value = '';
      user.value = {} as User;
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  };

  const refreshToken = async () :Promise<void> => {
    try {
      const { data } = await apiAxios.post('/api/auth/refresh');
      accessToken.value = data.access_token;
      return data
    } catch (error: Error | any) {
      throw error.response.message
    }
  };

  return {
    user,
    accessToken,

    isAuthenticated,
    login,
    register,
    getUser,
    logout,
    refreshToken
  }
})
