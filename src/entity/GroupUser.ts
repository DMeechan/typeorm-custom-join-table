import { Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Group } from "./Group";

import { User } from "./User";

@Entity("group_user")
export class GroupUser {
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.groupUsers, { primary: true })
  user: User;

  @ManyToOne((type) => Group, (group) => group.groupUsers, { primary: true })
  group: Group;

  userId: number;
  groupId: number;
}
