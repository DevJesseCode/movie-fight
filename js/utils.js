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
