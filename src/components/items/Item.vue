<template>
	<li>
		<h3>{{ fullName }}</h3>
		<h3>id: {{ itemId }}</h3>
		<div class="actions">
			<base-button link :to="itemDetailsLink">View Details</base-button>
			<base-button @click="deleteItem">Delete</base-button>
		</div>
	</li>
</template>

<script>
export default {
	name: 'ItemItem',
	props: ['itemId', 'firstName', 'lastName'],
	computed: {
		fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		itemDetailsLink() {
			return this.$route.path + `/${this.itemId}`;
		},
	},
	methods: {
		deleteItem() {
			this.$store.dispatch('items/deleteItem', { itemId: this.itemId });
			this.$router.replace('/items');
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