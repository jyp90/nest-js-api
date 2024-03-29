import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    this.checkMovie(id);
    return movie;
  }

  deleteOne(id: number): boolean {
    this.checkMovie(id);
    this.movies = this.movies.filter((movie) => movie.id === id);
    return true;
  }

  create(movieData: CreateMovieDto) {
    const movie = {
      id: this.movies.length + 1,
      ...movieData,
    };
    // this.movies.push(movie);
    return movie;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

  private checkMovie(id: number) {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
  }
}
