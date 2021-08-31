import { Entity, CreateDateColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Group } from "./Group";

import { User } from "./User";

@Entity("user_group")
export class UserGroup {
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.userGroups, { primary: true })
  user: User;

  @ManyToOne((type) => Group, (group) => group.userGroups, { primary: true })
  group: Group;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  groupId: number;
}
