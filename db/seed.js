const { client, getAllUsers, createUser } = require("./index");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS users;`);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE  users (
      id SERIAL PRIMARY KEY, 
      username varchar(255) UNIQUE NOT NULL, 
      password varchar(255) NOT NULL
    );`);

    console.log("Finished builing tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");

    const albert = await createUser({
      username: "albert",
      password: "bertie99",
    });

    const albertTwo = await createUser({
      username: "albert",
      password: "imposter_albert",
    });
    console.log("create user", albert);

    console.log("Finsihed creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    const { rows } = await client.query(`SELECT * FROM users;`);
    console.log(rows);
  } catch (error) {
    console.error(error);
  }
}
// client
//   .connect()
//   .then(rebuildDB)
//   .then(testDB)
//   .catch(console.error)
//   .finally(() => client.end());

async function main() {
  try {
    await client.connect();
    await rebuildDB();
    await testDB();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}
main();
