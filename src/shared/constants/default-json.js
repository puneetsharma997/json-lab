// default json for json editor
export const DEFAULT_JSON = `{
  "object": {
    "p": "s",
    "s": "p"
  },
  "array": [
    1,
    2,
    3
  ],
  "boolean": true,
  "color": "purple",
  "null": null,
  "number": 123,
  "string": "JSON Lab"
}`;

// default json for json path tester
export const PATH_TESTER_DEFAULT_JSON = `{
  "store": {
    "book": [
      { "category": "reference", "author": "John Carter", "title": "Sayings of the Century", "price": 8.95 },
      { "category": "fiction", "author": "Tobey Waugh", "title": "Sword of Honour", "price": 12.99 },
      { "category": "fiction", "author": "Natasha Melville", "title": "Moby Dick", "isbn": "0-553-21311-3", "price": 8.99 },
      { "category": "fiction", "author": "Robert Tolkien", "title": "The Lord of the Rings", "isbn": "0-395-19395-8", "price": 22.99 }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`

// default json for generators
export const GENERATOR_DEFAULT_JSON = `{
  "server_name": "production-alpha-1",
  "is_active": true,
  "max_connections": 150,
  "database": {
    "host": "db.internal.example.com",
    "port": 5432,
    "ssl_enabled": true
  },
  "maintenance_window": null,
  "supported_regions": [
    "us-east-1",
    "eu-west-1",
    "ap-south-1"
  ],
  "administrators": [
    {
      "id": "U1092",
      "username": "sysadmin_john",
      "role": "SuperAdmin",
      "permissions": ["read", "write", "delete"]
    },
    {
      "id": "U1093",
      "username": "devops_jane",
      "role": "Moderator",
      "permissions": ["read", "write"]
    }
  ]
}`;