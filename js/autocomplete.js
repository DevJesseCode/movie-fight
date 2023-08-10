const create_autocomplete = ({ root, renderOption, input_value, fetchData, onSelect, labelInfo }) => {
	root.innerHTML = `
<label for="${labelInfo}-input">
<strong>Search:</strong>
</label>
<input type="text" class="input" id="${labelInfo}-input"/>
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
	const on_input = async (event) => {
		const options = await fetchData(event.target.value);
		results_container.innerHTML = "";
		if (!options.length) {
			dropdown.classList.remove("is-active");
			return;
		}
		dropdown.classList.add("is-active");
		for (const option of options) {
			const div = document.createElement("div");
			div.innerHTML = renderOption(option);
			div.addEventListener("click", () => {
				dropdown.classList.remove("is-active");
				user_clicked = true;
				input.value = input_value(option);
				onSelect(option);
			});
			div.classList.add("dropdown-item");
			results_container.appendChild(div);
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
