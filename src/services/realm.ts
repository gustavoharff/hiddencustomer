import Realm from 'realm';

import {
  AuthSchema,
  CompanySchema,
  CustomerSchema,
  ReleaseSchema,
  ReleaseDateSchema,
  ReleaseGroupSchema,
  UserSchema,
} from 'schemas';

export async function getRealm(): Promise<Realm> {
  return Realm.open({
    schema: [
      AuthSchema,
      CompanySchema,
      CustomerSchema,
      ReleaseSchema,
      ReleaseDateSchema,
      ReleaseGroupSchema,
      UserSchema,
    ],
    schemaVersion: 17,
  });
}
