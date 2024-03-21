package com.tsi.smith.steven.vmo2spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@RequestMapping("/home")
@CrossOrigin
public class Vmo2springApplication {

	@Autowired
	final private ActorRepository actorRepo;
	final private FilmRepository filmRepo;
	final private FilmActorRepository filmActorRepo;
	final private ActorFilmRepository actorFilmRepo;

	public Vmo2springApplication(ActorRepository actorRepo, FilmRepository filmRepo, FilmActorRepository filmActorRepo, ActorFilmRepository actorFilmRepo) {
		this.actorRepo = actorRepo;
		this.filmRepo = filmRepo;
		this.filmActorRepo = filmActorRepo;
		this.actorFilmRepo = actorFilmRepo;
	}

	public static void main(String[] args) {
		SpringApplication.run(Vmo2springApplication.class, args);
	}

	// GET Requests

	// Every Result
	@GetMapping("/allActors")
	public 	Iterable<Actor> getAllActors() {
		return actorRepo.findAll();
	}

	@GetMapping("/allFilms")
	public 	Iterable<Film> getAllFilms() {
		return filmRepo.findAll();
	}
	@GetMapping("/allFilmActors")
	public 	Iterable<FilmActor> getAllFilmActors() {
		return filmActorRepo.findAll();
	}

	// Singular Result
	@GetMapping("/actor/{id}")
	public Actor getActor (@PathVariable int id) {

		return actorRepo.findById(id)
				.orElseThrow();
	}

	@GetMapping("/film/{id}")
	public Film getFilm (@PathVariable int id) {

		return filmRepo.findById(id)
				.orElseThrow();
	}

//	@GetMapping("/filmActor/{id}")
//	public FilmActor getFilmActor (@PathVariable int id) {
//
//		return filmActorRepo.findById(id)
//				.orElseThrow();
//	}

	// POST Requests
	@PostMapping("/actor")
	public Actor createActor (@RequestBody Actor newActor) {

		return actorRepo.save(newActor);

	}
	@PostMapping("/film")
	public Film createFilm (@RequestBody Film newFilm) {

		return filmRepo.save(newFilm);

	}

	// PUT Request
	@PutMapping("/actor/{id}")
	public Actor updateActor(@RequestBody Actor newActor, @PathVariable int id) {

		return actorRepo.findById(id)
				.map(actor -> {
					actor.setFirstName(newActor.getFirstName());
					actor.setLastName(newActor.getLastName());
					return actorRepo.save(actor);
				})
				.orElseGet(() -> {
					newActor.setActorID(id);
					return actorRepo.save(newActor);
				});
	}


	@PutMapping("/film/{id}")
	public Film updateFilm(@RequestBody Film newFilm, @PathVariable int id) {

		return filmRepo.findById(id)
				.map(film -> {
					film.setTitle(newFilm.getTitle());
					film.setDescription(newFilm.getDescription());
					film.setReleaseYear(newFilm.getReleaseYear());
					return filmRepo.save(film);
				})
				.orElseGet(() -> {
					newFilm.setFilmID(id);
					return filmRepo.save(newFilm);
				});
	}

	// DELETE Request

	@DeleteMapping("/actor/{id}")
	public void deleteActor(@PathVariable int id) {
		actorRepo.deleteById(id);
	}

	@DeleteMapping("/film/{id}")
	public void deleteFilm(@PathVariable int id) {
		filmRepo.deleteById(id);
	}

	// Many to many Get Request
	@GetMapping("/filmsByActor/{id}")
	public FilmActor filmByActorId(@PathVariable int id) {
		return filmActorRepo.findById(id)
				.orElseThrow();
	}

	@GetMapping("/actorsByFilm/{id}")
	public ActorFilm actorByFilmId(@PathVariable int id) {
		return actorFilmRepo.findById(id)
				.orElseThrow();
	}

}
