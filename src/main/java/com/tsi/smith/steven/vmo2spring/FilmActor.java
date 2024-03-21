package com.tsi.smith.steven.vmo2spring;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="actor")
public class FilmActor {

	@Id
	@Column(name="actor_id", unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int actorID;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "film_actor",
			joinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "actor_id"),
			inverseJoinColumns = @JoinColumn(name = "film_id", referencedColumnName = "film_id"))
	private Set<Film> films;


	public int getActorID() {
		return actorID;
	}

	public void setActorID(int actorID) {
		this.actorID = actorID;
	}

	public Set<Film> getFilms() {
		return films;
	}

	public void setFilms(Set<Film> films) {
		this.films = films;
	}
}
