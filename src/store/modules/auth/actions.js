let timer;
import { auth } from '../../../firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export default {
	async login(context, payload) {
		console.log('treba riesit ulozenie API_KEY vo firebase.js a import.meta.env.VITE_API_KEY');

		const responseData = await signInWithEmailAndPassword(auth, payload.email, payload.password);
		if (!responseData) {
			const error = new Error(responseData.message || 'Failed to login. Check your login data.');
			throw error;
		}

		const idToken = responseData.user.accessToken;
		const userId = responseData.user.uid;
		const displayName = responseData.user.displayName;
		const expiresIn = +responseData._tokenResponse.expiresIn * 1000;
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

	},
	async signup(context, payload) {
		const responseData = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
		await updateProfile(responseData.user, {
			displayName: payload.displayName,
			photoURL: "https://example.com/jane-q-user/profile.jpg"
		});
		return responseData.user.uid;
	},
	async delete(context, payload) {
		alert('tu bude delete');
		// const responseData = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
		// await updateProfile(responseData.user, {
		// 	displayName: payload.displayName,
		// 	photoURL: "https://example.com/jane-q-user/profile.jpg"
		// });
		// return responseData.user.uid;
	},
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

		signOut(auth);
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	}
};