import { getLocalUser } from "./helpers/auth";

const user = getLocalUser();

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        product:[],
        cart: [],
        find: 0,
        courier:[],
        province:[],
        city:[],
        service: [],
        serviceStatus:false
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        product(state) {
            var cate = state.find;
            if (cate === 0) {
                return state.product;
            }else {
                return state.product.filter(function (product) {
                    return product.type_product === state.find;
                })
            }
        },
        cart(state) {
            return state.cart;
        },
        courier(state) {
            return state.courier;
        },
        province(state) {
            return state.province;
        },
        city(state) {
            return state.city;
        },
        service(state) {
            return state.service;
        },
        serviceStatus(state) {
            return state.serviceStatus;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        register(state) {
            state.loading = true;
            state.auth_error = null;
        },
        prosesSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        getProduct(state, product) {
            state.product = product;
        },
        getFill(state, idFill) {
            state.find = idFill;
        },
        getCart(state, cart) {
            state.cart = cart;
        },
        getCourier(state, courier) {
            state.courier = courier;
        },
        getProvince(state, province) {
            state.province = province;
        },
        getCity(state, city) {
            state.city = city;
        },
        getService(state, service) {
            state.service = service;
            state.serviceStatus = true;
        },
    },
    actions: {
        login(context) {
            context.commit("login");
        },
        register(context) {
            context.commit("register");
        }
    }
};