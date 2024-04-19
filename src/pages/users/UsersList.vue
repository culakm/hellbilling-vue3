<template>
	<div>
		<base-dialog :show="!!confirm" title="Really???">
			<p>Are you shure you want to delete this user?</p>
		</base-dialog>
		<section>
			<base-card>
				<div v-if="isLoggedIn" class="controls">
					<base-button link to="/users/add">Add New User</base-button>
				</div>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<ul v-else-if="hasUsers">
					<user-item v-for="user in users" :key="user.id" :user-id="user.id" :first-name="user.firstName"
						:last-name="user.lastName"></user-item>
				</ul>
				<h3 v-else>No users found</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import UserItem from '../../components/users/UserItem.vue';
export default {
	name: 'UsersList',
	components: {
		UserItem,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			confirm: false,
		};
	},
	computed: {
		users() {
			return this.$store.getters['users/users'];
		},
		hasUsers() {
			return !this.isLoading && this.$store.getters['users/hasUsers'];
		},
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
	},
	created() {
		this.loadUsers();
	},
	methods: {
		handleError() {
			this.error = null;
		},
		async loadUsers(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('users/loadUsers', { forcedRefresh: refresh });
			} catch (error) {
				// this.$options.name musi byt definovene name v komponente
				this.error = `Component ${this.$options.name}, Padlo tralalsdfas: ${error.message}` || 'Something went wrong!';
			}
			this.isLoading = false;
		},
	},

};
</script>

<style scoped>
ul {
	list-style: none;
	margin: 0;
	padding: 0;
}

.controls {
	display: flex;
	justify-content: space-between;
}
</style>