<template>
	<div>
		<base-dialog @close="handleError" :show="!!error" title="An error is ocurred!">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<h2>Add User</h2>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<user-form @save-data="saveData" :clear-form="clearForm"></user-form>
			</base-card>
		</section>
	</div>
</template>

<script>
import UserForm from '../../components/users/UserForm.vue';
export default {
	name: 'UserAdd',
	components: {
		UserForm,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			clearForm: false,
		};
	},
	methods: {
		async saveData(userData) {
			this.isLoading = true;

			const actionPayload = {
				email: userData.email,
				password: userData.password,
				displayName: `${userData.firstName} ${userData.lastName}`,
			};
			try {
				const userId = await this.$store.dispatch('signup', actionPayload);
				let updatedUserData = { ...userData, authId: userId };
				await this.$store.dispatch('users/addUser', updatedUserData);

			} catch (error) {
				this.error = `Can't add user because: ${error.message}` || 'Something went wrong!';
				return;
			}

			this.isLoading = false;
			this.$router.replace('/users');
		},
		handleError() {
			this.isLoading = false;
			this.clearForm = true;
			this.error = null;
		},
	},
};
</script>