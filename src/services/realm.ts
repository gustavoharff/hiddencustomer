import Realm from 'realm';

import { CustomerSchema } from '../schemas/CustomerSchema';
import { ReleaseSchema } from '../schemas/ReleaseSchema';

export default async function getRealm(): Promise<Realm> {
  return Realm.open({
    schema: [CustomerSchema, ReleaseSchema],
  });
}
