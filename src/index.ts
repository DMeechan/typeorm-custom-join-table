import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import { Group } from "./entity/Group";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    await create(connection);

    process.exit(0);
  })
  .catch((error) => console.log(error));

async function create(connection: Connection) {
  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  const savedUser = await connection.manager.save(user);
  console.log("Saved a new user with id:", { savedUser });

  const group = new Group();
  group.name = "Team Daisie";
  //   group.users = [savedUser];
  const savedGroup = await connection.manager.save(group);
  console.log("Saved a new group:", { savedGroup });

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User, { relations: ["groups"] });
  console.log("Loaded users: ", users);
}
