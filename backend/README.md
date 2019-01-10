Backend documentation via postman: https://labs9-dev-profiles.postman.co/collections/5974950-e056342f-7c99-46a3-a9af-f00c8f500ac8?workspace=9fb9d5d7-bdfb-4076-b7d7-2b7fdb9fd55d#b5126b23-9bc6-4989-bacb-ac1a4319dd89


create adds to word bank 
add modifies the user refrence 


Endpoints: 
  USERS
    DONE Create new skill - add to skills table for top_skills 
    NEED add_skills 
    NEED familiar_skills 
    NEED places 
  KEYWORDS
    DONE Return all skills in skills table
    NEED Return all places in place table
    NO Delete or edit in skills table
    
    Create, return, update, delete  - user skills array  1, 4, 5  that refrences skills table id

Initializing server: 
    - in the dotenv file use switch enviornment to production to use AWS_RDS server 
    - OR development to use sqlite3 server 
    - 'knex migration:latest'
    - 'knex seed:run' 

To run server:
    - navigate to the /backend folder 
    - 'yarn install' 
    - 'yarn dev' OR 'nodemon'


To run heroku logs
    -- install/login to heroku CLI
    -- 'heroku logs --tail -a developer-profiles'