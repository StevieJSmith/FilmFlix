package com.tsi.smith.steven.vmo2spring;

import jakarta.persistence.*;

@Entity
@Table(name="film")
public class Film {

	@Id
	@Column(name="film_id", unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int filmID;

	@Column(name="title")
	private String title;

	@Column(name="description")
	private String description;

	@Column(name="release_year")
	private String releaseYear;



	public int getFilmID() {
		return filmID;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public String getReleaseYear() {
		return releaseYear;
	}

	public void setFilmID(int filmID) {
		this.filmID = filmID;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setReleaseYear(String releaseYear) {
		this.releaseYear = releaseYear;
	}

//	public Set<Actor> getActors() {
//		return Actors;
//	}
//
//	public void setActors(Set<Actor> actors) {
//		Actors = actors;
//	}
}
