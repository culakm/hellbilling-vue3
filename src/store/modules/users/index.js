import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
	namespaced: true,
	state() {
		return {
			users: [],
		};
	},
	mutations, // mutations: mutations ak su mena rovnake, tak staci len jedno meno
	actions, // actions: actions
	getters // getters: getters
};