import Vue from 'vue';
import Vuex from 'vuex';
import vuexModules from './modules';

Vue.use(Vuex)

export default new Vuex.Store({
	modules:vuexModules,
	

})