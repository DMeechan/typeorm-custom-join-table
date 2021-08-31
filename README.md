# TypeORM Custom Join Table Example

### ✨ I want a custom join table in TypeORM - how do I do it?

Look at the entities inside `src/entity` to see how it works. Then look at `src/index.ts` to see examples of how to create and query the relationships.

### 🤔 Why does this exist?

[TypeORM](https://github.com/typeorm/typeorm)'s docs briefly mention [many-to-many relations with custom properties](https://typeorm.io/#/many-to-many-relations/many-to-many-relations-with-custom-properties) and [custom @JoinTable options](https://github.com/typeorm/typeorm/blob/master/docs/relations.md#jointable-options) but there's no clear example of how to create a join table in TypeORM which:

- [x] Can have custom properties, like a `createdAt` column
- [x] Lets you join two entities by setting a relationship, instead of creating an instance of the join table (see example A below)
- [x] Lets you fetch child entities using TypeORM's typical syntax for ManyToMany joins (see example B below)

After numerous errors and iterations, I've found the exact incantation that TypeORM needs to create a join table that meets the requirements above. I hope this is useful!

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
const userGroup = new UserGroup();
userGroup.user = user;
userGroup.group = group;
await connection.manager.save(userGroup);
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
    .innerJoinAndSelect("user.userGroups", "userGroups")
    .innerJoinAndSelect("userGroups.group", "group")
    .getMany();
```

### 🐣 How can I run this project?

Ensure you have Node.js 12 or above installed, then follow these steps:

1. Clone this repository
2. Enter the repository folder in your shell
3. Install dependencies with `npm install`
4. Set up a Postgres database locally
5. Set the database's settings inside `ormconfig.json`
6. Run `npm start` to run the code (the code creates some entities then logs them to console)
