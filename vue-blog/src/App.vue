<script>
	import AppHeader from './components/AppHeader.vue';
	import AppFooter from './components/AppFooter.vue';
	import Home from './pages/Home.vue';
	import Register from './pages/Register.vue';
	import Login from './pages/Login.vue';

	export default {
    	data() {
        	return {
            	currentPage: 'Home'
			}
        },
		components: { AppHeader, AppFooter, Home, Register, Login }
    }

</script>

<template>
    <AppHeader @changed-page="newPage => { currentPage = newPage }"></AppHeader>
    <main class="flex-center">
		<component :is="currentPage"></component>
	</main>
	<AppFooter></AppFooter>
</template>

<style scoped>
	main {
		height: 80%;
	}
</style>
