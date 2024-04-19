import { db } from '../../../firebase.js';
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

export default {
	async addUser(context, payload) {
		const authId = payload.authId;
		const userData = {
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			email: payload.email,
		};
		await setDoc(doc(db, "users", authId), userData);

		context.commit('addUser', {
			...userData,
			id: authId
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
		await deleteDoc(doc(db, "users", userId));

		context.commit('deleteUser', { userId: userId });
	},
	// async deleteUser(context, payload) {
	// 	const userId = payload.userId;
	// 	const token = context.rootGetters.token;
	// 	const response = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${token}`, {
	// 		method: 'DELETE',
	// 	});
	// 	const responseData = await response.json();

	// 	if (!response.ok) {
	// 		const error = new Error(`State: coaches, Padlo DELETE: ${responseData.error} STATUS: ${response.status} (${response.statusText})` || 'Failed to fetch!');
	// 		throw error;
	// 	}

	// 	context.commit('deleteUser', { userId: userId });
	// },
	async loadUsers(context) {
		const users = [];

		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			const userData = doc.data();
			const user = {
				id: doc.id,
				firstName: userData.firstName,
				lastName: userData.lastName,
				email: userData.email,
				description: userData.description,
			};
			users.push(user);
		});
		context.commit('setUsers', users);
	},
};