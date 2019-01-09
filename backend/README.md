Backend documentation via postman: https://labs9-dev-profiles.postman.co/collections/5974950-e056342f-7c99-46a3-a9af-f00c8f500ac8?workspace=9fb9d5d7-bdfb-4076-b7d7-2b7fdb9fd55d#b5126b23-9bc6-4989-bacb-ac1a4319dd89

Endpoints: 
    Create new skill - add to skills table

    Return all skills in skills table

    NO Delete or edit in skills table
    
    Create, return, update, delete  - user skills array  1, 4, 5  that refrences skills table id

//This is the old sqlite3 for local db set up
development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
  },

To run server:

    - navigate to the /backend folder 
    - 'yarn install' 
    - 'yarn dev' OR 'nodemon' 