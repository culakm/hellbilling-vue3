let timer;
//import config from '../../../app_config.js';

export default {
	async login(context, payload) {
		return context.dispatch('auth', { ...payload, mode: 'login' });
	},
	async signup(context, payload) {
		return context.dispatch('auth', { ...payload, mode: 'signup' });
	},
	async auth(context, payload) {
		const mode = payload.mode;
		const API_KEY = import.meta.env.VITE_API_KEY;

		let url = '';
		let body = '';
		if (mode === 'login') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
			body = JSON.stringify({
				email: payload.email,
				password: payload.password,
				returnSecureToken: true
			});
		}
		else if (mode === 'signup') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
			body = JSON.stringify({
				email: payload.email,
				password: payload.password,
				displayName: payload.displayName,
				returnSecureToken: true
			});
		}

		const response = await fetch(url, { method: 'POST', body: body });
		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to login. Check your login data.');
			throw error;
		}

		const idToken = responseData.idToken;
		const userId = responseData.localId;
		const displayName = responseData.displayName;

		if (mode === 'login') {
			const response2 = await fetch(`https://hellbilling1-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=${idToken}`);
			const responseData2 = await response2.json();
			if (!response2.ok) {
				const error = new Error(`State: coaches, Padlo POST: ${responseData2.error} STATUS: ${response2.status} (${response2.statusText})` || 'Failed to fetch!');
				throw error;
			}

			const expiresIn = +responseData.expiresIn * 1000;
			const expirationDate = new Date().getTime() + expiresIn;

			localStorage.setItem('token', idToken);
			localStorage.setItem('userId', userId);
			localStorage.setItem('displayName', displayName);
			localStorage.setItem('tokenExpiration', expirationDate);


			timer = setTimeout(function () {
				context.dispatch('autoLogout');
			}, expiresIn);

			context.commit('setUser', {
				token: idToken,
				userId: userId,
				displayName: displayName
			});
		}
		else if (mode === 'signup') {
			return responseData.userId;
		}
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
	tryLogin(context) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const displayName = localStorage.getItem('displayName');
		const tokenExpiration = localStorage.getItem('tokenExpiration');

		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(function () {
			context.dispatch('autoLogout');
		}, expiresIn);

		if (token && userId) {
			context.commit('setUser', {
				token: token,
				userId: userId,
				displayName: displayName
			});
		}
	},
	logout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('displayName');
		localStorage.removeItem('tokenExpiration');

		clearTimeout(timer);

		context.commit('setUser', {
			token: null,
			userId: null,
			displayName: null
		});
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	}
};