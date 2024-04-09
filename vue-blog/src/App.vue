<script>
	import AppHeader from './components/AppHeader.vue';
	import AppFooter from './components/AppFooter.vue';

	export default {
		components: { AppHeader, AppFooter }
    }

</script>

<template>
    <AppHeader></AppHeader>
    <main>
		<router-view></router-view>
	</main>
	<AppFooter></AppFooter>
</template>

<style scoped>
	main {
		height: 80%;
		display: flex;
		justify-content: center;
		overflow: hidden;
		overflow-y: auto;
	}
</style>
