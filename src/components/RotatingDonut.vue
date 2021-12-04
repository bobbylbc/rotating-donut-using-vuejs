<template>
	<div class="wrapper">
		<div class="donut" ref="donut">
			<div v-for="n in 20" :key="n">
				<div>
					<div class="segment-wrapper">
						<div v-for="k in 6" :key="k"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// Example from: https://codepen.io/CucuIonel/pen/pjBGVe
export default {
	name: 'RotatingDonut',
	props: {
		msg: String
	},
	mounted() {},
	methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$donut_segments: 20;
$inner_segments: 6;
$step: 360 / $donut_segments;
$inner_step: 360 / $inner_segments;
$donut_segments_list: ();

body {
	background: #000;
	font-family: 'Open Sans', Arial, sans-serif;
	user-select: none;

	h1 {
		color: #fff;
		text-align: center;
		a {
			color: #dedede;
		}
	}
}
.wrapper {
	perspective: 1550px;
	perspective-origin: 50% 50%;
}
.donut {
	position: absolute;
	width: 1px;
	height: 1px;
	transform-style: preserve-3d;
	left: 50%;
	top: 300px;
	transform: translateX(-50%);
	animation: rotate-body 5s linear infinite;
	// .transform: rotateY(60deg); // unused
}

@for $i from 1 through $donut_segments {
	.donut > div:nth-child(#{$i}) {
		transform: rotateZ(#{$step * $i}deg) translate(150px, -50%);
		@for $j from 1 through $inner_segments {
			> div > div > div:nth-child(#{$j}) {
				transform: rotateY(#{$inner_step * $j}deg) translate3D(0, 0, 47px);
				background: hsla($step * $i, 50%, 50%, 1);
			}
		}
	}
}

.donut > div {
	position: absolute;
	width: 100px;
	height: 20px;
	transform-style: preserve-3d;
	transform-origin: 0% 0%;
}

.donut > div > div {
	position: absolute;
	width: 0;
	height: 0;
	transform-style: preserve-3d;
	transform-origin: 0% 0%;
}

.donut > div > div > div {
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 0;
	transform-style: preserve-3d;
}

@for $i from 1 through $donut_segments {
	.donut > div:nth-child(#{$i}) > div > div {
		animation: rotate-segment-#{$i} 2s linear infinite;
	}
}

.donut > div > div > div > div {
	position: absolute;
	top: 0;
	left: 0;
	width: 53px;
	height: 24px;
	background: rgba(0, 0, 0, 1);
	border: 2px solid rgba(255, 255, 255, 1);
	margin-left: -26.5px;
	margin-top: -12px;
	transform-origin: 50% 50%;
}

@keyframes rotate-body {
	from {
		transform: rotateY(360deg);
	}
	to {
		transform: rotateY(0deg);
	}
}

@for $i from 1 through $donut_segments {
	@keyframes rotate-segment-#{$i} {
		from {
			transform: rotateZ(40deg) rotateY(#{$i * (180 / $donut_segments)}deg);
		}
		to {
			transform: rotateZ(40deg) rotateY(#{$i * (180 / $donut_segments) + 360}deg);
		}
	}
}
</style>
