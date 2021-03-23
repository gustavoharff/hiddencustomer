class ReleaseSchema {
  static schema = {
    name: 'Release',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      annotations: 'string?',
      paid: 'bool',
      interval: 'string?[]',
      dates_counter: 'int?',
      groups_counter: 'int?',
      customer_id: 'string',
      company_id: 'string',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}

export { ReleaseSchema };
