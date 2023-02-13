import { AuthenticationTypes } from '../../interfaces';

interface IOutputSecurityIndividual {
  [key: string]: [];
}

export type OutputSecurity = IOutputSecurityIndividual[];

export interface IOutputSecurityDefinitions {
  [key: string]: {
    type: AuthenticationTypes;
    name?: string;
    in?: string;
  };
}

export interface IOutputAuthentication {
  securityDefinitions?: IOutputSecurityDefinitions;
  security?: OutputSecurity;
}
