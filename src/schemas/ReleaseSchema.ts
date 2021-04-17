export class ReleaseSchema {
  static schema = {
    name: 'Release',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      annotations: 'string?',
      paid: 'bool',
      dates: 'ReleaseDate[]',
      groups: 'ReleaseGroup[]',
      customer: 'Customer',
      customer_id: 'string',
      company_id: 'string',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}
