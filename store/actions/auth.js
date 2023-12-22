import { AuthService } from '../../common/auth/authService';
import { setToken, destroyToken } from '../../common/asynStorage';

export const loginAction = (phone_number, password, onSuccess = () => {}, onError = () => {}) => (dispatch) => {

    return AuthService.login({ phone_number, password }).then(res => {
        console.log(res)
    });
};

export const logoutAction = (token, onSuccess = () => {}, onError = () => {}) => (dispatch) => {
    return AuthService.logout({ token }).then(
        (response) => {
            dispatch({
                type: 'LOGOUT'
            });
            onSuccess();
            destroyToken();
            // destroyRole();


        },
        (error) => {
            console.log('error', error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log('message', message)
            dispatch({
                type: 'LOGIN_FAIL',
            });

            onError()
        }
    );
};