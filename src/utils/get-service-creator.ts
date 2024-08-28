import { type Axios } from 'axios';

export type ServiceOptions = {
  method?: AxiosMethods;
  url?: string;
  path: string;
  body?: any;
  query?: Record<string, any>;
  id?: string;
};

export type PartialServiceOptions = Partial<ServiceOptions>;

export type AxiosMethods = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type ServiceBuilderOptions = {
  /**
   * path to resource.
   * if path contains dynamic value, replace it with `:id`
   */
  path: string;
  method?: AxiosMethods;
};

export function getServiceCreator<T extends Axios>(api: T) {
  const defaultOptions: ServiceOptions = {
    method: 'get',
    url: '',
    path: '',
    body: undefined,
    query: undefined,
  };

  return async (options: Partial<ServiceOptions> = {}): Promise<any> => {
    const readyOptions = { ...defaultOptions, ...options };
    const { method, body } = readyOptions;
    const finalURL = buildURL(readyOptions);

    if (method?.toLowerCase() === 'delete')
      return api.delete(finalURL, {
        data: body,
      });

    return api[method!.toLocaleLowerCase() as AxiosMethods]?.(finalURL, body);
  };
}

/**
 * A more abstract version of `getServiceCreator`. Should be preferred over when possible.
 * Returns a function that can build a service based on the given API and configuration options.
 *
 * @param api - the Axios instance used for creating the service
 * @return  a function that takes mainOptions and optional config and returns a function that takes options and creates a service
 */
export function getServiceBuilder(api: Axios) {
  const createService = getServiceCreator(api);
  // playing around with a more concise syntax
  return (mainOptions: ServiceBuilderOptions) => {
    const idPlaceholder = ':id';
    const hasPlaceholder = mainOptions.path.includes(idPlaceholder);
    if (hasPlaceholder)
      return ({ id, ...options }: PartialServiceOptions) =>
        createService({
          ...options,
          ...mainOptions,
          path: mainOptions.path.replace(idPlaceholder, id!),
        });

    return (options: PartialServiceOptions) =>
      createService({ ...options, ...mainOptions });
  };
}

function buildURL({ url, path, query }: Partial<ServiceOptions>) {
  return `${url}${path}${query ? `?${getQueryString(query)}` : ''}`;
}

function objectToQuery(obj: Record<string, any>) {
  if (!obj) throw Error('objectToQuery expects an object');
  return Object.entries(obj).reduce((query, cur) => {
    const [key, value] = cur;
    // if (Array.isArray(value)) {
    //   value.forEach((item) => query.append(key, item))
    // } else
    if (value) {
      query.set(key, value);
    }
    return query;
  }, new URLSearchParams());
}

function getQueryString(query: Record<string, any>) {
  if (!query) return '';
  return objectToQuery(query).toString();
}
