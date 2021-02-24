class AuthSchema {
  static schema = {
    name: 'Auth',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      email: 'string',
      permission: 'string',
      active: 'bool',
      token: 'string',
      avatar_url: 'string?',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}

export { AuthSchema };
