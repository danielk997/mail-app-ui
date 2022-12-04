export interface DataAdapter<T> {
  data: T[];
  params?: Record<string, unknown>;
  pendingRequests: number;
}

export interface DataFormAdapter<T> {
  data?: T,
  pendingRequests: number;
  errors: string[];
}

export interface DataRequest<T> {
  params?: T;
}

export function defaultDataAdapter<T>(): DataAdapter<T> {
  return ({
    data: [],
    pendingRequests: 0
  });
}

export function defaultDataFormAdapter<T>(): DataFormAdapter<T> {
  return ({
    pendingRequests: 0,
    errors: []
  });
}
