import { getCRUDService } from '@/utils/get-crud-services';
import { Axios } from 'axios';

export function getSampleService(axiosInstance: Axios) {
  return getCRUDService(axiosInstance, '/users/', 'user');
}
