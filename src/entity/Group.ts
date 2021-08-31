import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { UserGroup } from "./UserGroup";
import { User } from "./User";

@Entity("group")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable({
    name: "user_group",
    joinColumn: { name: "groupId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  users: User[];

  @OneToMany((type) => UserGroup, (userGroup) => userGroup.group)
  userGroups: UserGroup[];
}
