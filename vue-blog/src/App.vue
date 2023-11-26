<script setup>
	import AppHeader from './components/AppHeader.vue'
	import AppFooter from './components/AppFooter.vue'
</script>

<template>
    <AppHeader></AppHeader>
    <main class="flex-center">
		<div>
			<h1>Welcome to VueBlog!</h1>
		</div>
	</main>
	<AppFooter></AppFooter>
</template>

<style scoped>
	main {
		height: 80%;
	}
</style>
