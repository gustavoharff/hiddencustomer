export class ReleaseGroupSchema {
  static schema = {
    name: 'ReleaseGroup',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      type: 'string',
      release_date: 'ReleaseDate?',
      release_date_id: 'string?',
      release_id: 'string',
      company_id: 'string',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}
