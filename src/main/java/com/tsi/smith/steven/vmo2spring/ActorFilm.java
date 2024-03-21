package com.tsi.smith.steven.vmo2spring;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="film")
public class ActorFilm {

	@Id
	@Column(name="film_id", unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int filmID;



	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "film_actor",
			joinColumns = @JoinColumn(name =  "film_id", referencedColumnName = "film_id"),
			inverseJoinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "actor_id"))
	private Set<Actor> actors;


	public int getFilmID() {
		return filmID;
	}

	public void setFilmID(int filmID) {
		this.filmID = filmID;
	}

	public Set<Actor> getActors() {
		return actors;
	}

	public void setActors(Set<Actor> actors) {
		this.actors = actors;
	}
}
