import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
	// namespaced: true, kvoli tomu ze userId je pre celu aplikaciu tak to nenamespacujeme !!! museli by sme vsetko prepisovat
	state() {
		return {
			userId: null,
			token: null,
			displayName: null,
			didAutoLogout: false,
		};
	},
	mutations, // mutations: mutations ak su mena rovnake, tak staci len jedno meno
	actions, // actions: actions
	getters // getters: getters
};