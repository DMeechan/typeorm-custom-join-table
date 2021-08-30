import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { GroupUser } from "./GroupUser";

import { User } from "./User";

@Entity("group")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => User, (user) => user.groups)
  @JoinTable({
    name: "group_user",
    joinColumn: { name: "groupId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
  })
  users: User[];

  @OneToMany((type) => GroupUser, (groupUser) => groupUser.group)
  groupUsers: GroupUser[];
}
