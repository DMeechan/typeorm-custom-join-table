import {
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
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

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  groupId: number;
}
