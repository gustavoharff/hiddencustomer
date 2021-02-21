class ReleaseDateSchema {
  static schema = {
    name: 'ReleaseDate',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      date: 'string',
      release_id: 'string',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}

export { ReleaseDateSchema };
