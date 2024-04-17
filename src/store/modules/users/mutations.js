export default {
	addUser(state, payload) {
		state.users.push(payload);
	},
	editUser(state, payload) {
		const userIndex = state.users.findIndex(user => user.id === payload.userId);
		state.users[userIndex] = payload;
	},
	deleteUser(state, payload) {
		const userId = payload.userId;
		const userIndex = state.users.findIndex(user => user.id === userId);
		state.users.splice(userIndex, 1);
	},
	setUsers(state, payload) {
		state.users = payload;
	},
};