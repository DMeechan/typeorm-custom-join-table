# TypeORM Custom Join Table Example

### 🤔 Why does this exist?

TypeORM's docs briefly mention [many-to-many relations with custom properties](https://typeorm.io/#/many-to-many-relations/many-to-many-relations-with-custom-properties) and [custom @JoinTable options](https://github.com/typeorm/typeorm/blob/master/docs/relations.md#jointable-options) but there's no clear example of to achieve a join table which:

- Can have custom properties, like a `createdAt` column
- Lets you join two entities by setting a relationship, instead of creating an instance of the join table (see example A below)
- Lets you fetch child entities using TypeORM's typical syntax for ManyToMany joins (see example B below)

Example A:

```typescript
// We want to create a join like this:
await connection.manager
    .createQueryBuilder()
    .relation(Group, "users")
    .of(group)
    .add(user);

// Or like this:
const group = new Group();
group.users = [user];
await connection.manager.save(group);

// Instead of doing this:
const groupUser = new GroupUser();
groupUser.user = user;
groupUser.group = group;
await connection.manager.save(groupUser);
```

Example B:
```typescript
// We want to join child entities like this:
const groupsWithUsers = await connection.manager
    .createQueryBuilder(User, "user")
    .innerJoinAndSelect("user.groups", "groups")
    .getMany();

// Or like this:
const usersWithGroups = await connection.manager.find(User, {
    relations: ["groups"],
});

// Instead of doing this:
const usersWithGroups = await connection.manager
    .createQueryBuilder(User, "user")
    .innerJoinAndSelect("user.groupUsers", "groupUsers")
    .innerJoinAndSelect("groupUsers.group", "group")
    .getMany();
```

### 🐣 How can I run this project?

Ensure you have Node.js 12 or above installed, then follow these steps:

1. Clone this repository
2. Enter the repository folder in your shell
3. Install dependencies with `npm install`
4. Setup database settings inside `ormconfig.json` file
5. Run `npm start` to run the code (the code creates some entities then logs them to console)
