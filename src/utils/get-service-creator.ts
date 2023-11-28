import { type Axios } from 'axios';

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
    return await api[method!.toLocaleLowerCase() as AxiosMethods]?.(
      finalURL,
      body,
    );
  };
}

function buildURL({ url, path, query }: Partial<ServiceOptions>) {
  return `${url}${path}?${query ? getQueryString(query) : ''}`;
}

// TODO: Move these type definitions to the types directory
export type ServiceOptions = {
  method?: AxiosMethods;
  url?: string;
  path: string;
  body?: any;
  query?: { [_: string]: any };
  id?: string;
};

export type PartialServiceOptions = Partial<ServiceOptions>;

export type CreateServiceOptions = Partial<ServiceOptions> &
  Partial<{
    id: any;
    [p: string]: any;
  }>;

export type AxiosMethods = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type ServiceGetter = Record<
  string,
  (options: CreateServiceOptions) => Promise<any>
>;
// END OF TODO

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
