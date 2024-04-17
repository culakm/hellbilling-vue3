<template>
	<div>
		<base-dialog @close="handleError" :show="!!error" title="An error is ocurred!">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<h2>User:{{ userId }}</h2>
					<div v-if="isLoading">
						<base-spinner></base-spinner>
					</div>
				<user-form @save-data="saveData" :user="localUser"></user-form>
			</base-card>
		</section>
	</div>
</template>

<script>
import UserForm from '../../components/users/UserForm.vue';
export default {
	name: 'UserAdd',
	props: ['userId'],
	components: {
		UserForm,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			localUser: null,
		};
	},
	created() {
		this.localUser = this.$store.getters['users/users'].find(
			user => user.id === this.userId
		);
	},
	methods: {
		async saveData(userData) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('users/updateUser', userData);
			} catch (error) {
				this.error = `Component ${this.$options.name}, Padlo fetch lalalal: ${error.message}` || 'Something went wrong!';
				return;
			}

			this.isLoading = false;
			this.$router.replace('/users');
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>