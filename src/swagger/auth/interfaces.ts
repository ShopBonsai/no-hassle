import { AuthenticationTypes } from '../../interfaces';

interface IOutputSecurityIndividual {
  [key: string]: [];
}

export type OutputSecurity = IOutputSecurityIndividual[];

export interface IOutputAuthentication {
  securityDefinitions?: {
    [key: string]: {
      type: AuthenticationTypes;
      name?: string;
      in?: string;
    };
  };
  security?: OutputSecurity;
}
