import Realm from 'realm';

import {
  AuthSchema,
  CustomerSchema,
  ReleaseSchema,
  ReleaseDateSchema,
} from 'schemas';

export async function getRealm(): Promise<Realm> {
  return Realm.open({
    schema: [AuthSchema, CustomerSchema, ReleaseSchema, ReleaseDateSchema],
    schemaVersion: 3,
  });
}
