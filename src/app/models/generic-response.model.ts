export interface GenericResponse<T> {
  pageSize: number;
  pageNumber: number;
  totalRecords: number;
  value: T;
  id: string | null;
  message: string;
  isSuccess: boolean;
}
