import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm";

import { Group } from "./Group";
import { GroupUser } from "./GroupUser";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  //   @ManyToMany((type) => Group, (group) => group.users)
  //   groups: Group[];

  @OneToMany((type) => GroupUser, (groupUser) => groupUser.user)
  groupUsers: GroupUser[];
}
