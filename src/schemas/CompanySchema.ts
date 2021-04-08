export class CompanySchema {
  static schema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}
