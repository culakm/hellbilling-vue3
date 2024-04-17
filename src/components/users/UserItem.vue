<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h3>id: {{ userId }}</h3>
		<div class="actions">
			<base-button link :to="userDetailsLink">View Details</base-button>
			<base-button @click="deleteUser">Delete</base-button>
		</div>
	</li>
</template>

<script>
export default {
	name: 'UserItem',
	props: ['userId', 'firstName', 'lastName'],
	computed: {
		fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		userDetailsLink() {
			return this.$route.path + `/edit/${this.userId}`;
		},
	},
	methods: {
		deleteUser() {
			this.$store.dispatch('users/deleteUser', { userId: this.userId });
			this.$router.replace('/users');
		},
	}
};
</script>

<style scoped>
li {
	margin: 1rem 0;
	border: 1px solid #424242;
	border-radius: 12px;
	padding: 1rem;
}

h3 {
	font-size: 1.5rem;
}

h3,
h4 {
	margin: 0.5rem 0;
}

div {
	margin: 0.5rem 0;
}

.actions {
	display: flex;
	justify-content: flex-end;
}
</style>