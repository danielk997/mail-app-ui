export interface DataFormAdapter<T> {
  data?: T,
  pendingRequests: number;
  errors: string[];
}
