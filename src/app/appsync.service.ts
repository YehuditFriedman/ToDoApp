import { Injectable } from '@angular/core';
import { AWSAppSyncClient } from 'aws-appsync';
import aws_export from '../aws-exports';
import { Auth } from 'aws-amplify';
import { AUTH_TYPE } from 'aws-appsync';

@Injectable({
  providedIn: 'root'
})
export class AppsyncService {
_hc: any;
  constructor() { 
    const client = new AWSAppSyncClient({
      url: aws_export.aws_appsync_graphqlEndpoint,
      region: aws_export.aws_project_region,
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    });
    this._hc = client;
  }
  hc() {
    return this._hc.hydrated();
  }
}
