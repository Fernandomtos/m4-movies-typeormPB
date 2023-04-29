import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string | null | undefined;

  @Column()
  duration: number;

  @Column()
  price: number;

  // @AfterLoad()
  // contMovies() {
  //   this.count = Movie.length;
  //   console.log(this.count);
  // }
}

export default Movie;
