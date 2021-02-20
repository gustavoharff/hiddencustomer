import Realm from 'realm';

import { AuthSchema } from '../schemas/AuthSchema';
import { CustomerSchema } from '../schemas/CustomerSchema';
import { ReleaseSchema } from '../schemas/ReleaseSchema';

export default async function getRealm(): Promise<Realm> {
  return Realm.open({
    schema: [AuthSchema, CustomerSchema, ReleaseSchema],
    schemaVersion: 2,
  });
}
