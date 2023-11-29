import { Axios } from 'axios';

import { getCRUDService } from '@/utils/get-crud-services';

export function getSampleService(axiosInstance: Axios) {
  return getCRUDService(axiosInstance, '/users/', 'user');
}
