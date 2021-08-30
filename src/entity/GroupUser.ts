import { Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Group } from "./Group";

import { User } from "./User";

@Entity("group_user")
export class GroupUser {
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.groupUsers, { primary: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne((type) => Group, (group) => group.groupUsers, { primary: true })
  @JoinColumn({ name: "groupId" })
  group: Group;

  //   @Column()
  userId: number;

  //   @Column()
  groupId: number;
}
