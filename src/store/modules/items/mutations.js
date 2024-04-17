export default {
	addItem(state, payload) {
		state.items.push(payload);
	},
	editItem(state, payload) {
		const itemIndex = state.items.findIndex(item => item.id === payload.itemId);
		state.items[itemIndex] = payload;
	},
	deleteItem(state, payload) {
		const itemId = payload.itemId;
		const itemIndex = state.items.findIndex(item => item.id === itemId);
		state.items.splice(itemIndex, 1);
	},
	setItems(state, payload) {
		state.items = payload;
	},
};