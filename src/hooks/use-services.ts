import { axiosClient } from '@/config/axios-client';
import { getSampleService } from '@/services/sample-service';

export function useServices() {
  return {
    sample: getSampleService(axiosClient),
  };
}
