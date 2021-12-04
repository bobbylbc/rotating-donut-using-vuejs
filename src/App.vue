<template>
	<div class="app">
		<RotatingDonutSquare />
		<div style="height: 400px"></div>
		<RotatingDonutTriangle />
		<div style="height: 400px"></div>
		<RotatingDonut />
		<div style="height: 510px"></div>
		<RotatingExperiment />
	</div>
</template>

<script>
import RotatingDonut from './components/RotatingDonut.vue'
import RotatingDonutTriangle from './components/RotatingDonutTriangle.vue'
import RotatingDonutSquare from './components/RotatingDonutSquare.vue'
import RotatingExperiment from './components/RotatingExperiment.vue'

export default {
	name: 'App',
	components: {
		RotatingDonut,
		RotatingDonutTriangle,
		RotatingDonutSquare,
		RotatingExperiment
	}
}
</script>

<style>
.app {
	/* background-color: black; */
	height: 100vh;
	width: 100vw;
	margin: -8px;
}
</style>
