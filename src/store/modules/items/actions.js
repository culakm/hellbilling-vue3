import { db } from '../../../firebase.js';
import { collection, doc, addDoc, deleteDoc, getDocs } from "firebase/firestore";

export default {
	async addItem(context, payload) {
		const itemData = {
			firstName: payload.firstName,
			description: payload.description,
		};
		await addDoc(collection(db, 'items'), itemData);
		context.commit('addUser', { itemData });
	},
	async updateItem(context, payload) {
		const itemData = {
			itemId: payload.itemId,
			firstName: payload.firstName,
			description: payload.description,
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

		const items = [];

		const querySnapshot = await getDocs(collection(db, "items"));
		querySnapshot.forEach((doc) => {
			const itemData = doc.data();
			const item = {
				id: doc.id,
				firstName: itemData.firstName,
				description: itemData.description,
			};
			items.push(item);
		});
		context.commit('setItems', items);
	}
};