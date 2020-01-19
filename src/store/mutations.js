import {set_user_info} from './mutations-name'
export default {
	setDomHeight: (state, height) => {
		state.height = height
	},
	setDomWidth: (state, width) => {
		state.width = width
	},
	save_traffic:(state,info) => {
		state.save_traffics = info
	},
	// save_userInfo:(state,info)=>{
	// 	state.userInfos = info
	// },
	[set_user_info]:(state, data)=> {
		console.log('set_user_info');
		state.userInfos = data
	},
}
