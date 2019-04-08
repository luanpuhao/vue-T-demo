import Vue from 'vue'
import table from "@/components/table/table.vue";

const component = {
	install: function(Vue) {
		Vue.component("v-table", table)
	}
}

Vue.use(component);