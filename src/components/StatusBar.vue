<template>
	<ul class="status-bar">
		<li class="status-bar__item status-bar__item--working">
			<div class="status-bar__light status-bar__light--green"></div>
			<div class="status-bar__title">Loading</div>
		</li>
		<li class="status-bar__item status-bar__item--error">
			<div class="status-bar__light status-bar__light--red"></div>
			<div class="status-bar__title">Error</div>
		</li>
	</ul>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: {
		loading() {
			return this.controls.loading;
		},
		error() {
			return this.controls.apiError;
		},
		...mapState(["controls"])
	}
};
</script>
