import { getGlobalSwagger } from './swagger';

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

export const DEFAULT_API_KEY_HEADER = 'API-Key';

export const GLOBAL_SWAGGER = getGlobalSwagger();
