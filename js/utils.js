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
const on_select = async (movie, renderTo) => {
	let response = await axios.get("https://www.omdbapi.com/", {
		params: {
			apikey: "b1058d89",
			i: movie.imdbID,
		},
	});
	response = response.data;
	document.querySelector(".tutorial").classList.add("is-hidden");
	document.querySelector(`#${renderTo}-summary`).innerHTML = movie_template(response);
	if (renderTo === "left") {
		left_movie = response;
	} else {
		right_movie = response;
	}
	if (left_movie && right_movie) {
		compare();
	}
};
const compare = () => {
	console.log("Time for comparison!");
	const left_stats = document.querySelectorAll("#left-summary .notification");
	const right_stats = document.querySelectorAll("#right-summary .notification");
	left_stats.forEach((leftStat, index) => {
		const rightStat = right_stats[index];
		const left_value = parseFloat(leftStat.dataset.value);
		const right_value = parseFloat(rightStat.dataset.value);
		if (right_value > left_value) {
			leftStat.classList.add("is-warning");
			leftStat.classList.remove("is-primary");
		} else {
			rightStat.classList.add("is-warning");
			rightStat.classList.remove("is-primary");
		}
	});
};
const movie_template = (movie_object) => {
	const dollars = parseInt(movie_object.BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
	const metascore = parseInt(movie_object.Metascore);
	const imdbRating = parseFloat(movie_object.imdbRating);
	const imdbVotes = parseInt(movie_object.imdbVotes.replace(/,/g, ""));
	const awards = movie_object.Awards.split(" ").reduce((prev, word) => {
		value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);
	return `
	<article class="media">
		<figure class="media-left">
			<p class="image">
				<img src="${movie_object.Poster}">
			</p>
		</figure>
		<div class="media-content">
			<div class="content">
				<h1>${movie_object.Title} (${movie_object.Year})</h1>
				<h4>${movie_object.Genre}</h4>
				<p>${movie_object.Plot}</p>
			</div>
		</div>
	</article>
	<article data-value=${awards} class="notification is-primary">
		<p class="title">${movie_object.Awards}</p>
		<p class="subtitle">Awards</p>
	</article>
	<article data-value=${dollars} class="notification is-primary">
		<p class="title">${movie_object.BoxOffice}</p>
		<p class="subtitle">Box Office</p>
	</article>
	<article data-value=${metascore} class="notification is-primary">
		<p class="title">${movie_object.Metascore}</p>
		<p class="subtitle">Metascore</p>
	</article>
	<article data-value=${imdbRating} class="notification is-primary">
		<p class="title">${movie_object.imdbRating}</p>
		<p class="subtitle">IMDB Rating</p>
	</article>
	<article data-value=${imdbVotes} class="notification is-primary">
		<p class="title">${movie_object.imdbVotes}</p>
		<p class="subtitle">IMDB Votes</p>
	</article>
	`;
};
