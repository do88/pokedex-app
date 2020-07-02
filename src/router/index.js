import Vue from "vue";
import VueRouter from "vue-router";
import MainView from "../views/MainView.vue";
import PokemonView from "../views/PokemonView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: MainView
	},
	{
		path: "/pokemon/:id",
		name: "pokemon",
		component: PokemonView,
		props: true
	},
	{
		path: "*",
		redirect: { name: "home" }
	}
];

const router = new VueRouter({
	routes
});

export default router;
