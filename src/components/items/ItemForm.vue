<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="{ invalid: !firstName.isValid }">
			<label for="first-name">First Name</label>
			<input type="text" id="first-name" v-model.trim="firstName.val" @blur="clearValidity('firstName')" />
			<p v-if="!firstName.isValid">Firstname must not be empty!</p>
		</div>
		<div class="form-control" :class="{ invalid: !description.isValid }">
			<label for="description">Description</label>
			<textarea id="description" rows="5" v-model.trim="description.val"
				@blur="clearValidity('description')"></textarea>
			<p v-if="!description.isValid">Description must not be empty!</p>
		</div>
		<p v-if="!formIsValid">Please fix errors</p>
		<base-button v-if="Object.keys(item).length === 0">Add Item</base-button>
		<base-button v-else>Edit Item</base-button>
	</form>
</template>

<script>
export default {
	emits: ['save-data'],
	props: {
		item: {
			type: Object,
			required: false,
			default: () => ({}),
		},
	},
	data() {
		return {
			firstName: {
				val: '',
				isValid: true
			},
			description: {
				val: '',
				isValid: true
			},
			formIsValid: true,
		};
	},
	created() {
		this.itemId = this.item.id || null;
		this.firstName.val = this.item.firstName || '';
		this.description.val = this.item.description || '';
	},
	methods: {
		clearValidity(input) {
			this[input].isValid = true;
		},
		validateForm() {
			this.formIsValid = true;
			if (this.firstName.val === '') {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (this.description.val === '') {
				this.description.isValid = false;
				this.formIsValid = false;
			}
		},
		submitForm() {
			this.validateForm();
			if (!this.formIsValid) {
				return;
			}
			const formData = {
				itemId: this.itemId,
				firstName: this.firstName.val,
				description: this.description.val,
			};
			this.$emit('save-data', formData);
		},
	},
};
</script>

<style scoped>
.form-control {
	margin: 0.5rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
}

input[type='checkbox']+label {
	font-weight: normal;
	display: inline;
	margin: 0 0 0 0.5rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 1px solid #ccc;
	font: inherit;
}

input:focus,
textarea:focus {
	background-color: #f0e6fd;
	outline: none;
	border-color: #3d008d;
}

input[type='checkbox'] {
	display: inline;
	width: auto;
	border: none;
}

input[type='checkbox']:focus {
	outline: #3d008d solid 1px;
}

h3 {
	margin: 0.5rem 0;
	font-size: 1rem;
}

.invalid label {
	color: red;
}

.invalid input,
.invalid textarea {
	border: 1px solid red;
}
</style>