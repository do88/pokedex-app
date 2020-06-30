import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import store from "./store";
import TitleFilter from "./filters/titleize";
import PadFilter from "./filters/pad";
import "@/style/index.scss";

Vue.filter("titleize", TitleFilter);
Vue.filter("pad", PadFilter);

Vue.config.productionTip = false;

const requireComponent = require.context("./components", false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName);
	const componentName = upperFirst(
		camelCase(
			fileName
				.split("/")
				.pop()
				.replace(/\.\w+$/, "")
		)
	);
	Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
