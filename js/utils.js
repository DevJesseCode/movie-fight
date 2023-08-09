const debounce = (func, delay = 1000) => {
	let timeout_id;
	return (...args) => {
		if (timeout_id) {
			clearTimeout(timeout_id);
		}
		timeout_id = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};
const on_select = async (movie) => {
	const response = await fetchData(movie.imdbID, true);
	document.querySelector("#summary").innerHTML = movie_template(response);
};

const movie_template = (movie_object) => {
	return `
	<article class="media">
		<figure class="media-left">
			<p class="image">
				<img src="${movie_object.Poster}">
			</p>
		</figure>
		<div class="media-content">
			<div class="content">
				<h1>${movie_object.Title}</h1>
				<h4>${movie_object.Genre}</h4>
				<p>${movie_object.Plot}</p>
			</div>
		</div>
	</article>
	<article class="notification is-primary">
		<p class="title">${movie_object.Awards}</p>
		<p class="subtitle">Awards</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movie_object.BoxOffice}</p>
		<p class="subtitle">Box Office</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movie_object.Metascore}</p>
		<p class="subtitle">Metascore</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movie_object.imdbRating}</p>
		<p class="subtitle">IMDB Rating</p>
	</article>
	<article class="notification is-primary">
		<p class="title">${movie_object.imdbVotes}</p>
		<p class="subtitle">IMDB Votes</p>
	</article>
	`;
};
