const autocomplete_config = {
	renderOption(movie) {
		const img_src = movie.Poster !== "N/A" ? movie.Poster : "";
		return `
<img src="${img_src}"/>
<h1>${movie.Title} (${movie.Year})</h1>
`;
	},
	input_value(movie) {
		return `${movie.Title} (${movie.Year})`;
	},
	async fetchData(query) {
		query = query.replace(" - ", " ");
		const response = await axios.get("https://www.omdbapi.com/", {
			params: {
				apikey: "b1058d89",
				s: query.includes(" (") ? query.split(" (")[0] : query,
			},
		});
		return response.data.Error ? [] : response.data.Search;
	},
};
create_autocomplete({
	...autocomplete_config,
	root: document.querySelector("#left-autocomplete"),
	labelInfo: "left",
	onSelect(movie) {
		on_select(movie, "left");
	},
});
create_autocomplete({
	...autocomplete_config,
	root: document.querySelector("#right-autocomplete"),
	labelInfo: "right",
	onSelect(movie) {
		on_select(movie, "right");
	},
});
let left_movie, right_movie;
