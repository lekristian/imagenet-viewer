import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Entity("imagenet_hierarchy")
export class ImageNetNode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, type: "integer" })
  parent_fk_id?: number;

  @Column({ nullable: true, type: "text" })
  wnid?: string;

  @Column({ nullable: true, type: "text" })
  name?: string;

  @Column({ type: "integer" })
  size!: number;

  @ManyToOne(() => ImageNetNode, (node) => node.children)
  parent?: ImageNetNode;

  @OneToMany(() => ImageNetNode, (node) => node.parent)
  children?: ImageNetNode[];
}
