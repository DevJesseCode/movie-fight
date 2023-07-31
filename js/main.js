const input = document.querySelector("input");
const fetchData = async (query) => {
	const response = await axios.get("https://www.omdbapi.com/", { params: { apikey: "b1058d89", s: query } });
	return response.data.Search;
};
const on_input = async (event) => {
	const movies = await fetchData(event.target.value);
	console.log(movies);
};
let timeout_id;

input.addEventListener("input", debounce(on_input, 750));
