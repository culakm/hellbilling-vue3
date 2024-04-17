<template>
	<div>
		<base-dialog @close="handleError" :show="!!error" title="An error is ocurred!">
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<h2>Add Item.</h2>
				<div v-if="isLoading">
					<base-spinner></base-spinner>
				</div>
				<item-form @save-data="saveData"></item-form>
			</base-card>
		</section>
	</div>
</template>

<script>
import ItemForm from '../../components/items/ItemForm.vue';
export default {
	name: 'ItemAdd',
	components: {
		ItemForm,
	},
	data() {
		return {
			isLoading: false,
			error: null,
		};
	},
	methods: {
		async saveData(itemData) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('items/addItem', itemData);
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