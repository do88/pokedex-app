import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PokemonView from "../views/PokemonView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/pokemon/:id",
		name: "Pokemon",
		component: PokemonView,
		props: true
	}
];

const router = new VueRouter({
	routes
});

export default router;
