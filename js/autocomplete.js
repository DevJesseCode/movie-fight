const create_autocomplete = ({ root, renderOption }) => {
	root.innerHTML = `
<label for="input">
<strong>Search for a movie:</strong>
</label>
<input type="text" class="input" id="input"/>
<br>
<div class="dropdown">
<div class="dropdown-menu">
<div class="dropdown-content results">
</div>
</div>
</div>
`;

	const input = root.querySelector("input");
	const dropdown = root.querySelector(".dropdown");
	const results_container = root.querySelector(".results");
	let user_clicked = false;
	let timeout_id;
	const on_input = async (event) => {
		let movies = await fetchData(event.target.value);
		movies = movies.Search;
		results_container.innerHTML = "";
		if (!movies.length) {
			dropdown.classList.remove("is-active");
			return;
		}
		dropdown.classList.add("is-active");
		for (const movie of movies) {
			const option = document.createElement("div");
			option.innerHTML = renderOption(movie);
			option.addEventListener("click", (event) => {
				dropdown.classList.remove("is-active");
				user_clicked = true;
				input.value =
					event.target.tagName !== "DIV"
						? event.target.parentElement.children[1].textContent
						: event.target.children[1].textContent;
				on_select(movie);
			});
			option.classList.add("dropdown-item");
			results_container.appendChild(option);
		}
	};

	document.addEventListener("click", (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove("is-active");
		} else if (!dropdown.classList.contains("is-active") && results_container.childElementCount && !user_clicked) {
			dropdown.classList.add("is-active");
		} else {
			user_clicked = false;
		}
	});
	input.addEventListener("input", debounce(on_input, 750));
};
