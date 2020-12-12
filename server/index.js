const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
require('dotenv').config();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// const schema = buildSchema(`
//   type Query {
//     user(user_id: Int!): User
//   }

//   type User{
//     user_id : Int
//     name: String
//   }
// `);

// const root = {
//   user: (args) => ({
//     user_id: args.user_id,
//     name: 'welcome to user',
//   }),
// };

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true,
//   })
// );

app.get('/api/v1/users', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        users: results.rows,
      },
    });
  } catch (err) {
    console.error(err.msg);
  }
});
// get a todo
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const results = await db.query('select * from users where user_id = $1', [
      req.params.id,
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        user: results.rows[0],
      },
    });
  } catch (err) {
    err.msg;
  }
});

//create a todo
app.post('/api/v1/users', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO users (name,email_id,gender,status) values($1,$2,$3,$4) returning *',
      [req.body.name, req.body.email_id, req.body.gender, req.body.status]
    );
    console.log(results);
    res.status(201).json({
      status: 'success',
      data: {
        name: results.rows.name,
        email_id: results.rows.email_id,
        gender: results.rows.gender,
        status: results.rows.status,
      },
    });
  } catch (err) {
    console.error(err.msg);
  }
});
//update a todo
app.put('/api/v1/users/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE users SET name = $1 where user_id = $2 returning *',
      [req.body.name, req.params.id]
    );
    res.status(201).json({
      status: 'success',
      data: {
        name: results.rows.name,
        email_id: results.rows.email_id,
        gender: results.rows.gender,
        status: results.rows.status,
      },
    });
  } catch (err) {
    console.error(err.msg);
  }
});
//delete a todo
app.delete('/api/v1/users/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM users where user_id = $1', [
      req.params.id,
    ]);
    res.status(204).json({ status: 'success' });
  } catch (err) {
    console.error(err.msg);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
