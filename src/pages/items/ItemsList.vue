<template>
	<div>
		<base-dialog :show="!!confirm" title="Really???">
			<p>Are you shure you want to delete this item?</p>
		</base-dialog>
		<section>
			<base-card>
				<div v-if="isLoggedIn" class="controls">
					<base-button link to="/items/add">Add New Item</base-button>
				</div>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<ul v-else-if="hasItems">
					<item v-for="item in items" :key="item.id" :item-id="item.id" :first-name="item.firstName"
						:last-name="item.lastName"></item>
				</ul>
				<h3 v-else>No items found</h3>
			</base-card>
		</section>
	</div>
</template>

<script>
import Item from '../../components/items/Item.vue';
export default {
	name: 'ItemsList',
	components: {
		Item,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			confirm: false,
		};
	},
	computed: {
		items() {
			return this.$store.getters['items/items'];
		},
		hasItems() {
			return !this.isLoading && this.$store.getters['items/hasItems'];
		},
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
	},
	created() {
		this.loadItems();
	},
	methods: {
		handleError() {
			this.error = null;
		},
		async loadItems(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('items/loadItems', { forcedRefresh: refresh });
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