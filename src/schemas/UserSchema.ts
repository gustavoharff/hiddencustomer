class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      name: 'string',
      email: 'string',
      active: 'bool',
      permission: 'string',
      company_id: 'string',
      avatar_url: 'string?',
      created_at: 'string',
      updated_at: 'string',
    },
  };
}

export { UserSchema };
