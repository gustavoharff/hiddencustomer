import Realm from 'realm';

import {
  AuthSchema,
  CustomerSchema,
  ReleaseSchema,
  ReleaseDateSchema,
  ReleaseGroupSchema,
} from 'schemas';

export async function getRealm(): Promise<Realm> {
  return Realm.open({
    schema: [
      AuthSchema,
      CustomerSchema,
      ReleaseSchema,
      ReleaseDateSchema,
      ReleaseGroupSchema,
    ],
    schemaVersion: 6,
  });
}
