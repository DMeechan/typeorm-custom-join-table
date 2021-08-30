import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
} from "typeorm";

import { GroupUser } from "./GroupUser";

import { User } from "./User";

@Entity("group")
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
