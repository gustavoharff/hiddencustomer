import Realm from 'realm';

import { AuthSchema } from '../schemas/AuthSchema';
import { CustomerSchema } from '../schemas/CustomerSchema';
import { ReleaseSchema } from '../schemas/ReleaseSchema';
import { ReleaseDateSchema } from '../schemas/ReleaseDateSchema';

export default async function getRealm(): Promise<Realm> {
  return Realm.open({
    schema: [AuthSchema, CustomerSchema, ReleaseSchema, ReleaseDateSchema],
    schemaVersion: 3,
  });
}
