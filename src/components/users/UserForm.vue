<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="{ invalid: !firstName.isValid }">
			<label for="first-name">First Name</label>
			<input type="text" id="first-name" v-model.trim="firstName.val" @blur="clearValidity('firstName')" />
			<p v-if="!firstName.isValid">Firstname must not be empty!</p>
		</div>
		<div class="form-control" :class="{ invalid: !lastName.isValid }">
			<label for="last-name">Last Name</label>
			<input type="text" id="last-name" v-model.trim="lastName.val" @blur="clearValidity('lastName')" />
			<p v-if="!lastName.isValid">Lastname must not be empty!</p>
		</div>
		<div class="form-control" :class="{ invalid: !email.isValid }">
			<label for="email">Email</label>
			<input type="text" id="email" v-model.trim="email.val" @blur="clearValidity('email')" />
			<p v-if="!email.isValid">Email must not be empty!</p>
		</div>
		<div class="form-control" :class="{ invalid: !password.isValid }">
			<label for="password">Password</label>
			<input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')" />
			<p v-if="!password.isValid">Password must contains min. 6 characters!</p>
		</div>
		<div class="form-control" :class="{ invalid: !description.isValid }">
			<label for="description">Description</label>
			<textarea id="description" rows="5" v-model.trim="description.val"
				@blur="clearValidity('description')"></textarea>
			<p v-if="!description.isValid">Description must not be empty!</p>
		</div>
		<p v-if="!formIsValid">Please fix errors</p>
		<base-button>{{ submitButtonCaption }}</base-button>
	</form>
</template>

<script>
export default {
	emits: ['save-data'],
	props: {
		user: {
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
			lastName: {
				val: '',
				isValid: true
			},
			email: {
				val: '',
				isValid: true
			},
			password: {
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
	computed: {
		submitButtonCaption() {
			return this.userId === null ? 'Add User' : 'Edit User';
		},
	},
	created() {
		this.userId = this.user.id || null;
		this.firstName.val = this.user.firstName || '';
		this.lastName.val = this.user.lastName || '';
		this.email.val = this.user.email || '';
		this.password.val = '';
		this.description.val = this.user.description || '';
	},
	methods: {
		clearValidity(input) {
			this[input].isValid = true;
			this.formIsValid = true;
		},
		validateForm() {
			this.formIsValid = true;
			if (this.firstName.val === '') {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}
			if (this.lastName.val === '') {
				this.lastName.isValid = false;
				this.formIsValid = false;
			}
			if (this.email.val === '' || !this.email.val.includes('@')) {
				this.email.isValid = false;
				this.formIsValid = false;
			}
			if (this.password.val === '' || this.password.val.length < 6) {
				this.password.isValid = false;
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
				userId: this.userId,
				firstName: this.firstName.val,
				lastName: this.lastName.val,
				email: this.email.val,
				password: this.password.val,
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