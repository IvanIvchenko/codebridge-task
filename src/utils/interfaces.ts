export interface ResponseError extends Error {
  statusCode?: number;
}

export interface DogFull {
  id: number;
  name: string;
  color: string;
  tail_length: number;
  weight: number;
}

export interface RequestBody {
  name: string;
  color: string;
  tail_length: number;
  weight: number;
}

export interface RequestQuery {
  page: number;
  attribute: string;
  order: 'ASC' | 'DESC';
  limit: number;
}

export interface RequestParams {
  id: number;
}
