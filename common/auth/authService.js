import ApiService from "../apiService"
export const AuthService = {
    login(params) {
        console.log('service', params)
        return ApiService.post("api/v1/login", params)
    },
    logout(params) {
        console.log('token', params)
        return ApiService.post("api/v1/logout", params)
    }
}