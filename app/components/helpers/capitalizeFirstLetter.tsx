export const capitalizeFirstLetter = (word = "") => {
	if (word.length > 0) {
		return word?.split(" ")[0].slice(0, 1).toUpperCase() + word.slice(1)
	} else {
		return ""
	}
}
