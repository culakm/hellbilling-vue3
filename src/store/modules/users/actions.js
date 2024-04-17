export default {
	async addUser(context, payload) {
		const authId = payload.authId;
		const userData = {
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			email: payload.email,
		};
		const token = context.rootGetters.token;
		// const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`, {
		// 	method: 'POST',
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json?auth=${token}`, {
			method: 'PUT',//POST je pre automaticky generovane ID, PUT je pre vlastne ID, ktore je authId a je zadefinovane aj v URL
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(`State: coaches, Padlo POST: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
			throw error;
		}

		const userId = responseData.name;
		context.commit('addUser', {
			...userData,
			id: userId
		});
	},
	async updateUser(context, payload) {
		const userData = {
			userId: payload.userId,
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			email: payload.email,
		};
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users/${userData.userId}.json?auth=${token}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(`State: coaches, Padlo POST: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
			throw error;
		}

		context.commit('editUser', userData);
	},
	async deleteUser(context, payload) {
		const userId = payload.userId;
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`, {
			method: 'DELETE',
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(`State: coaches, Padlo DELETE: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
			throw error;
		}

		context.commit('deleteUser', { userId: userId });
	},
	async loadUsers(context) {
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}`);
		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(`state: coaches, Padlo fetch coaches.json: ${responseData.message}` || 'Failed to fetch!');
			throw error;
		}
		const users = [];
		for (const key in responseData) {
			const user = {
				id: key,
				firstName: responseData[key].firstName,
				lastName: responseData[key].lastName,
				email: responseData[key].email,
				description: responseData[key].description,
			};
			users.push(user);
		}
		context.commit('setUsers', users);
	}
};