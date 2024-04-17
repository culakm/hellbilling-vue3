import { createRouter, createWebHistory } from 'vue-router';

const UserAuth = () => import('./pages/auth/UserAuth.vue');

import ItemsList from './pages/items/ItemsList.vue';
import ItemAdd from './pages/items/ItemAdd.vue';
import itemEdit from './pages/items/ItemEdit.vue';

import UsersList from './pages/users/UsersList.vue';
import UserAdd from './pages/users/UserAdd.vue';
import UserEdit from './pages/users/UserEdit.vue';

import indexPage from './pages/IndexPage.vue';

import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: indexPage },
		{ name: 'items', path: '/items', component: ItemsList, meta: { requiresAuth: true } },
		{ name: 'item-add', path: '/items/add', component: ItemAdd, meta: { requiresAuth: true } },
		{ name: 'item-edit', path: '/items/:itemId', component: itemEdit, props: true, meta: { requiresAuth: true } },

		{ name: 'users', path: '/users', component: UsersList, meta: { requiresAuth: true } },
		{ name: 'user-add', path: '/users/add', component: UserAdd, meta: { requiresAuth: true } },
		{ name: 'user-edit', path: '/users/edit/:userId', component: UserEdit, props: true, meta: { requiresAuth: true } },
		{ name: 'auth', path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
		{ path: '/:notFound(.*)', component: NotFound }
	]
});

router.beforeEach((to, _, next) => {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/auth');
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/');
	} else {
		next();
	}
});

export default router;