<script>
	import AppHeader from './components/AppHeader.vue';
	import AppFooter from './components/AppFooter.vue';

	export default {
		components: { AppHeader, AppFooter }
    }

</script>

<template>
    <AppHeader></AppHeader>
    <main class="flex-center">
		<router-view></router-view>
	</main>
	<AppFooter></AppFooter>
</template>

<style scoped>
	main {
		height: 80%;
	}
</style>
