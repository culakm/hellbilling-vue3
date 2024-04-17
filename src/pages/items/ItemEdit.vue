<template>
	<div>
		<base-dialog @close="handleError" :show="!!error" title="An error is ocurred!">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<h2>Item:{{ itemId }}</h2>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<item-form @save-data="saveData" :item="localItem"></item-form>
			</base-card>
		</section>
	</div>
</template>

<script>
import ItemForm from '../../components/items/ItemForm.vue';
export default {
	name: 'ItemAdd',
	props: ['itemId'],
	components: {
		ItemForm,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			localItem: null,
		};
	},
	created() {
		this.localItem = this.$store.getters['items/items'].find(
			item => item.id === this.itemId
		);
	},
	methods: {
		async saveData(itemData) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('items/updateItem', itemData);
			} catch (error) {
				this.error = `Component ${this.$options.name}, Padlo fetch lalalal: ${error.message}` || 'Something went wrong!';
				return;
			}

			this.isLoading = false;
			this.$router.replace('/items');
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>