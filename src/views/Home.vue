<template>
	<div class="container">
		<div class="main-screen">
			<h1 class="main-screen__title">POKEDEX INDEX</h1>
			<ul class="main-screen__list">
				<li class="main-screen__list-item">
					<span class="main-screen__list-item-prefix">No</span>
					001:Bulbasaur
				</li>
				<li class="main-screen__list-item selected">
					<span class="main-screen__list-item-prefix">No</span>
					001:Bulbasaur
				</li>
				<li class="main-screen__list-item">
					<span class="main-screen__list-item-prefix">No</span>
					001:Bulbasaur
				</li>
				<li class="main-screen__list-item">
					<span class="main-screen__list-item-prefix">No</span>
					001:Bulbasaur
				</li>
			</ul>
		</div>
		<div class="sidebar">
			<div class="sub-screen">
				<p>
					Welcome user to the pokedex index. Use the arrows keys below or your mouse to interact with the
					selection screen and find out more information about your selected pokemon.
				</p>
			</div>
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
			<div class="controls">
				<button class="controls__up controls--blue">
					<svg
						width="30px"
						height="17px"
						viewBox="0 0 30 17"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g
								id="10.2”-iPad"
								transform="translate(-733.000000, -551.000000)"
								fill="#FFFFFF"
								fill-rule="nonzero"
							>
								<path
									d="M762.520484,552.42084 L761.537793,551.471507 C761.228522,551.175031 760.817055,551.0117 760.377296,551.0117 C759.93778,551.0117 759.525825,551.175031 759.216555,551.471507 L748.006707,562.226552 L736.783933,551.459573 C736.47515,551.163097 736.063196,551 735.62368,551 C735.184164,551 734.771966,551.163097 734.462939,551.459573 L733.480004,552.403056 C732.839999,553.0166 732.839999,554.016008 733.480004,554.629553 L746.842064,567.495031 C747.150847,567.791273 747.562314,568 748.005732,568 L748.010854,568 C748.450613,568 748.86208,567.791039 749.170863,567.495031 L762.520484,554.664418 C762.829755,554.368176 762.999512,553.961487 763,553.539821 C763,553.117922 762.829755,552.716848 762.520484,552.42084 Z"
									id="Path-Copy"
									transform="translate(748.000000, 559.500000) scale(1, -1) translate(-748.000000, -559.500000) "
								></path>
							</g>
						</g>
					</svg>
				</button>
				<button class="controls__down controls--blue">
					<svg
						width="30px"
						height="17px"
						viewBox="0 0 30 17"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g
								id="10.2”-iPad"
								transform="translate(-862.000000, -551.000000)"
								fill="#FFFFFF"
								fill-rule="nonzero"
							>
								<g id="Group" transform="translate(862.000000, 551.000000)">
									<path
										d="M29.5204839,1.42083964 L28.537793,0.471507226 C28.2285222,0.17503097 27.8170554,0.0116999312 27.3772958,0.0116999312 C26.93778,0.0116999312 26.5258254,0.17503097 26.2165546,0.471507226 L15.0067074,11.226552 L3.7839332,0.459573297 C3.4751502,0.163097041 3.06319564,0 2.62367987,0 C2.1841641,0 1.77196563,0.163097041 1.46293872,0.459573297 L0.480003902,1.40305575 C-0.160001301,2.01660014 -0.160001301,3.01600826 0.480003902,3.62955265 L13.8420638,16.495031 C14.1508468,16.7912732 14.5623135,17 15.0057318,17 L15.0108537,17 C15.4506134,17 15.8620802,16.7910392 16.1708632,16.495031 L29.5204839,3.66441844 C29.8297547,3.36817619 29.9995122,2.96148658 30,2.53982106 C30,2.11792154 29.8297547,1.7168479 29.5204839,1.42083964 Z"
										id="Path-Copy-2"
									></path>
								</g>
							</g>
						</g>
					</svg>
				</button>
				<button class="controls__enter controls--green"><span>Enter</span></button>
				<button class="controls__return controls--grey"><span>Return</span></button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home"
};
</script>
