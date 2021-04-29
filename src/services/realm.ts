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
    schemaVersion: 25,
  });

  console.log(realm.path);
  return realm;
}
