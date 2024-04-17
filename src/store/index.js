import { createStore } from 'vuex';
import itemsModule from './modules/items/index.js';
import usersModule from './modules/users/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
	modules: {
		items: itemsModule,
		users: usersModule,
		auth: authModule
	}
});
export default store;