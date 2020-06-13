<template>
	<div class="main-screen">
		<h1 class="main-screen__title">{{ currentPokemon.name }}</h1>
		<div class="main-screen__stats">
			<div class="main-screen__stats-image"><img src="" alt="" /></div>
			<div class="main-screen__stats-image"><img src="" alt="" /></div>
			<div class="main-screen__stats-height"></div>
			<div class="main-screen__stats-weight"></div>
			<div class="main-screen__stats-type"></div>
			<div class="main-screen__stats-base">
				<ul class="main-screen__stats-base-list">
					<li>HP: 00</li>
					<li>Speed: 00</li>
					<li>Attack: 00</li>
					<li>Defence: 00</li>
					<li>Special Attack: 00</li>
					<li>Special Defence: 00</li>
				</ul>
			</div>
			<div class="main-screen__stats-controls">
				<button class="main-screen__stats-controls__button">
					<span class="main-screen__stats-controls__image">
						<img src="" alt="" />
					</span>
					<span class="main-screen__stats-controls__navigation">Previous</span>
					<span class="main-screen__stats-controls__title">000:Pokemon</span>
				</button>
				<button class="main-screen__stats-controls__button">
					<span class="main-screen__stats-controls__image">
						<img src="" alt="" />
					</span>
					<span class="main-screen__stats-controls__navigation">Next</span>
					<span class="main-screen__stats-controls__title">000:Pokemon</span>
				</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		currentPokemon: {
			type: Object,
			required: true
		},
		nextPokemon: {
			type: Object,
			required: true
		},
		previousPokemon: {
			type: Object,
			required: true
		}
	}
};
</script>

<style lang="scss" scoped></style>
