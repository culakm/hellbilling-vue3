export default {
	items(state) {
		return state.items;
	},
	hasItems(state) {
		return state.items && state.items.length > 0;
	},
};