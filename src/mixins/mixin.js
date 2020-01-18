import {
	mapState,
	mapMutations
} from 'vuex'
import state from '../store/state'
import mutation from '../store/mutations'


export default {
	computed: mapState(Object.keys(state)),
	methods: {
		...mapMutations(Object.keys(mutation)),
		resizeRem(rem) {
			this.setDomWidth(window.innerWidth + 'px')
			this.setDomHeight(window.innerHeight + 'px')
			let [whdef, wW] = [100 / 1020, window.innerWidth]
			document.documentElement.style.fontSize = wW * whdef + 'px'
			if (rem) {
				return rem * wW * whdef
			}
		}
	}
}
