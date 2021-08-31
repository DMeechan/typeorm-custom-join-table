import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import { Group } from "./entity/Group";
import { User } from "./entity/User";

const iteration = getRandomInteger(1111, 9999);
let connection: Connection;

(async () => {
  try {
    connection = await createConnection();

    const userA = await createUser();
    const userB = await createUser();
    const userC = await createUser();
    const group = await createGroup([userB]);
    await addUserToGroup(userC, group);

    await query();

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

async function createUser() {
  const user = new User();
  user.firstName = `Morty${iteration}`;
  user.lastName = `Smith${iteration}`;
  user.age = 25;

  const savedUser = await connection.manager.save(user);
  return savedUser;
}

async function createGroup(users: User[] = []) {
  const group = new Group();
  group.name = `Universe C-${iteration}`;
  group.users = users;

  const savedGroup = await connection.manager.save(group);
  return savedGroup;
}

async function addUserToGroup(user: User, group: Group) {
  return await connection.manager
    .createQueryBuilder()
    .relation(Group, "users")
    .of(group)
    .add(user);

  /*
    Or you can create a new UserGroup instance and set its properties manually:

    const userGroup = new UserGroup();
    userGroup.user = user;
    userGroup.group = group;
  
    const saved = await connection.manager.save(userGroup);
    return saved;
  */
}

async function query() {
  console.log("Load only groups with users via ManyToMany:");
  const groupsWithUsers = await connection.manager
    .createQueryBuilder(Group, "group")
    .innerJoinAndSelect("group.users", "users")
    .getMany();
  prettyLog(groupsWithUsers);

  console.log("Load only users with groups via userGroups join table:");
  const usersWithGroupsManually = await connection.manager
    .createQueryBuilder(User, "user")
    .innerJoinAndSelect("user.userGroups", "userGroups")
    .innerJoinAndSelect("userGroups.group", "group")
    .getMany();
  prettyLog(usersWithGroupsManually);

  console.log("Load users with groups via Find():");
  const usersWithGroupsFind = await connection.manager.find(User, {
    relations: ["groups"],
  });
  prettyLog(usersWithGroupsFind);
}

function getRandomInteger(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prettyLog(obj: any) {
  console.log(JSON.stringify(obj, undefined, 2));
}
