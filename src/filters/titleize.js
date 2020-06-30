export default value => {
	return value.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
};
