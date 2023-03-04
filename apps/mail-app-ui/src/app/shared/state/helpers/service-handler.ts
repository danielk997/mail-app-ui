import {EMPTY, Observable} from "rxjs";
import {FormBaseType} from "../../components/form-base/form-base.component";
import {DataFormAdapter} from "../../models/data-adapter";

export class ServiceHandler<T> {

  constructor(
    private _service: any,
    private _config: ServiceHandlerConfig<T>
  ) {
  }

  getCollection(...params: any[]): Observable<any> {
    if (!this._config.getCollectionMethod)
      return EMPTY;

    return this._service[this._config.getCollectionMethod.name](...params);
  }

  getSingle(id: number): Observable<T> {
    return this._service[this._config.getSingleMethod?.name ?? ''](id);
  }

  create<K extends T>(data: K): Observable<T> {
    return this._service[this._config.createMethod?.name ?? ''](data);
  }

  delete(id: string, ...extraParams: unknown[]): Observable<T> {
    return this._service[this._config.deleteMethod?.name ?? ''](id, ...extraParams);
  }

  update<K extends T>(id: number, data: K): Observable<T> {
    return this._service[this._config.updateMethod?.name ?? ''](id, data);
  }

}

export interface ServiceHandlerConfig<T> {
  getCollectionMethod?: () => unknown;
  getSingleMethod?: (id: number) => unknown;
  createMethod?: (data: T | any) => unknown;
  deleteMethod?: (id: string, ...extraParams: any[]) => unknown;
  updateMethod?: (id: number, data: T | any) => unknown;
}

export interface ValidationError {
  message: string;
  field: string;
}

export function parseResponseErrors(error: any): string[] {
  const errors: string[] = [];

  if (typeof error.error === 'string') {
    error = {
      ...error,
      error: JSON.parse(error.error)
    };
  }

  if (error.error?.errors) {
    errors.push((error.error.errors as ValidationError[]).map(it => `${it.field}: ${it.message}`).join('<br>'));
    return errors;
  }
  if (error.error?.cause) {
    errors.push(error.error.cause);
  }
  if (error.error?.message) {
    errors.push(error.error.message);
  }
  if (error.message) {
    errors.push(error.message);
  }
  errors.push('Unknown error occurred');
  return errors;
}

export interface CommonFormData {
  onClick: (formValue: any) => any;
  type: FormBaseType;
  dataToUpdate$: Observable<DataFormAdapter<any>>;
}
