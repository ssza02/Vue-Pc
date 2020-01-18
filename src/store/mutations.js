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
	[SET_USER_INFO]:(state, data)=> {
		state.userInfos = data
	},
}
