export default {
	async addItem(context, payload) {
		const itemData = {
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			email: payload.email,
		};
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/items.json?auth=${token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(itemData)
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(`State: coaches, Padlo POST: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
			throw error;
		}

		const itemId = responseData.name;
		context.commit('addItem', {
			...itemData,
			id: itemId
		});
	},
	async updateItem(context, payload) {
		const itemData = {
			itemId: payload.itemId,
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			email: payload.email,
		};
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/items/${itemData.itemId}.json?auth=${token}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(itemData)
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(`State: coaches, Padlo POST: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
			throw error;
		}

		context.commit('editItem', itemData);
	},
	async deleteItem(context, payload) {
		const itemId = payload.itemId;
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/items/${itemId}.json?auth=${token}`, {
			method: 'DELETE',
		});
		const responseData = await response.json();

		if (!response.ok) {
			const error = new Error(`State: coaches, Padlo DELETE: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
			throw error;
		}

		context.commit('deleteItem', { itemId: itemId });
	},
	async loadItems(context) {
		const token = context.rootGetters.token;
		const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/items.json?auth=${token}`);
		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(`state: coaches, Padlo fetch coaches.json: ${responseData.message}` || 'Failed to fetch!');
			throw error;
		}
		const items = [];
		for (const key in responseData) {
			const item = {
				id: key,
				firstName: responseData[key].firstName,
				lastName: responseData[key].lastName,
				email: responseData[key].email,
				description: responseData[key].description,
			};
			items.push(item);
		}
		context.commit('setItems', items);
	}
};