var _reg = /'$/gi;
var baseUrl = process.env.VUE_APP_URL.toString().replace(_reg,'') + '/apis'

const apis = {
    test:baseUrl+'/test',
}

export default apis