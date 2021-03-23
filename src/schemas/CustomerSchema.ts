class CustomerSchema {
  static schema = {
    name: 'Customer',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      releases_counter: 'int?',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}

export { CustomerSchema };
