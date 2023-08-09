const fetchData = async (query, id) => {
	query = query.replace(" - ", " ");
	let response;
	if (id) {
		response = await axios.get("https://www.omdbapi.com/", {
			params: {
				apikey: "b1058d89",
				i: query,
			},
		});
	} else {
		response = await axios.get("https://www.omdbapi.com/", {
			params: {
				apikey: "b1058d89",
				s: query.includes(" (") ? query.split(" (")[0] : query,
			},
		});
	}
	return response.data.Error ? [] : response.data;
};
create_autocomplete({
	root: document.querySelector(".autocomplete"),
	renderOption(movie) {
		const img_src = movie.Poster !== "N/A" ? movie.Poster : "";
		return `
<img src="${img_src}"/>
<h1>${movie.Title} (${movie.Year})</h1>
`;
	},
});
