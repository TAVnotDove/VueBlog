<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import useUserStore from "./store/userStore";

export default {
	components: { AppHeader, AppFooter },
	computed: {
		isDarkTheme() {
			const userStore = useUserStore();

			return userStore.theme === 'Dark'
		}
	},
}

</script>

<template>
	<AppHeader></AppHeader>
	<main :class="{ dark: isDarkTheme }">
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
