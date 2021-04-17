export class CustomerSchema {
  static schema = {
    name: 'Customer',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}
