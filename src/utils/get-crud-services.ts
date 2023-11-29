import type { Axios } from 'axios';

import {
  getServiceCreator,
  type PartialServiceOptions,
} from './get-service-creator';

export type ServiceFunction = (options: PartialServiceOptions) => Promise<any>;

type DefaultCRUDServicesKey =
  | 'createOne'
  | 'patchOne'
  | 'getOne'
  | 'getList'
  | 'deleteOne';

export type DefaultCRUDServices = Record<
  DefaultCRUDServicesKey,
  ServiceFunction
>;

export type CustomCRUDName<T extends string> =
  | `get${Capitalize<T>}`
  | `get${Capitalize<T>}List`
  | `patch${Capitalize<T>}`
  | `delete${Capitalize<T>}`
  | `create${Capitalize<T>}`;

export type CustomCRUDServices<T extends string> = Record<
  CustomCRUDName<T>,
  ServiceFunction
>;

type GetCRUDServiceReturn<R> = R extends `${infer RName}`
  ? CustomCRUDServices<RName>
  : R extends undefined
    ? DefaultCRUDServices
    : never;

/**
 * Create a getter for simple CRUD operations
 * @param {Object} axiosInstance - nuxtApp
 * @param {String} basePath - base path of resource
 * @param {String} resource - resource name
 * @returns {Object} services
 * */
export function getCRUDService<R extends string>(
  axiosInstance: Axios,
  basePath: `/${string}/` | '/' = '/',
  resource?: R,
): GetCRUDServiceReturn<R> {
  const createService = getServiceCreator(axiosInstance);

  if (resource) {
    const resourceName = resource[0].toUpperCase() + resource.slice(1);
    const singleName = resourceName || '';

    return {
      [`create${singleName}`]: async (options: PartialServiceOptions) => {
        return createService({
          path: `${basePath}`,
          method: 'post',
          ...options,
        });
      },
      [`patch${singleName}`]: async ({
        id,
        ...options
      }: PartialServiceOptions) => {
        return createService({
          path: `${basePath}${id}`,
          method: 'patch',
          ...options,
        });
      },
      [`get${singleName}List`]: async (options: PartialServiceOptions) => {
        return createService({
          path: `${basePath}`,
          ...options,
        });
      },
      [`get${singleName}`]: async ({
        id,
        ...options
      }: PartialServiceOptions) => {
        return createService({
          path: `${basePath}${id}/`,
          ...options,
        });
      },
      [`delete${singleName}`]: async ({
        id,
        ...options
      }: PartialServiceOptions) => {
        return createService({
          path: `${basePath}${id}/`,
          method: 'delete',
          ...options,
        });
      },
    } as GetCRUDServiceReturn<R>;
  }

  return {
    createOne: async (options: PartialServiceOptions) => {
      return createService({
        path: `${basePath}`,
        method: 'post',
        ...options,
      });
    },
    patchOne: async ({ id, ...options }: PartialServiceOptions) => {
      return createService({
        path: `${basePath}${id}/`,
        method: 'patch',
        ...options,
      });
    },
    getList: async (options: PartialServiceOptions) => {
      return createService({
        path: `${basePath}`,
        ...options,
      });
    },
    getOne: async ({ id, ...options }: PartialServiceOptions) => {
      return createService({
        path: `${basePath}${id}/`,
        ...options,
      });
    },
    deleteOne: async ({ id, ...options }: PartialServiceOptions) => {
      return createService({
        path: `${basePath}${id}/`,
        method: 'delete',
        ...options,
      });
    },
  } as GetCRUDServiceReturn<R>;
}
