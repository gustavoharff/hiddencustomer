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
  const realm = await Realm.open({
    schema: [
      AuthSchema,
      CompanySchema,
      CustomerSchema,
      ReleaseSchema,
      ReleaseDateSchema,
      ReleaseGroupSchema,
      UserSchema,
    ],
    schemaVersion: 24,
  });

  console.log(realm.path);
  return realm;
}
