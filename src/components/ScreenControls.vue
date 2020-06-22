<template>
	<div class="controls">
		<button class="controls__enter controls--green" :class="{ selected: selectedIndex }">
			<span>Enter</span>
		</button>
		<button class="controls__return controls--grey"><span>Return</span></button>
	</div>
</template>

<script>
export default {
	props: {
		selectedIndex: {
			type: Number,
			default: null
		}
	}
};
</script>
