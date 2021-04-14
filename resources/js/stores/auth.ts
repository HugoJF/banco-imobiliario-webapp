import {createModel} from "@rematch/core";
import {RootModel} from "./index";
import {AuthState, RegisterCredentials} from "../types/auth";
import {UserProperties, UserType} from "../types/users";

export type PasswordResetParameters = {
    email: string,
    password: string,
    password_confirmation: string,
    token: string
}

export const auth = createModel<RootModel>()({
    state: {} as AuthState,
    reducers: {
        setUser: (state, payload: Partial<UserProperties> | boolean) => {
            return {me: payload} as AuthState;
        },
        setGuest: (state, payload: boolean) => {
            return {guest: true} as AuthState;
        },
        setFailed: (state, payload: boolean) => {
            return {failed: payload} as AuthState;
        }
    },

    effects: (dispatch) => ({
        async csrf(): Promise<void> {
            await window.axios.get('/sanctum/csrf-cookie', {
                headers: {Accept: 'application/javascript'}
            });
        },

        async me(): Promise<UserProperties> {
            await dispatch.auth.csrf();
            const response = await window.axios.get('/api/users/me', {
                headers: {Accept: 'application/javascript'}
            });

            const user = response.data;

            if (user) {
                dispatch.auth.setUser(user as UserProperties);
            }

            return user;
        },

        async registration(payload: RegisterCredentials): Promise<void> {
            const {name, email, password, password_confirmation} = payload;

            return await window.axios.post('/register', {
                name, email, password, password_confirmation,
            });
        },

        async forgotPassword(payload: string): Promise<void> {
            return await window.axios.post('/forgot-password', {email: payload});
        },

        async resetPassword(payload: PasswordResetParameters): Promise<void> {
            return await window.axios.post('/forgot-password', payload);
        },

        async update(payload: Partial<UserProperties>): Promise<void> {
            const response = await window.axios.patch('/api/me', payload);

            const user = response.data.user;

            if (user) {
                dispatch.auth.setUser(user as UserProperties);
            }

            return user;
        },

        async logout(): Promise<void> {
            const me = await dispatch.auth.me();

            if (!me) {
                return;
            }

            try {
                await window.axios.post('/logout');

                dispatch.auth.setUser(false);
            } catch (e) {
                dispatch.auth.setFailed(true);
            }
        },

        async loginAsGuest(payload: UserType): Promise<void> {
            dispatch.auth.setGuest(true);
        },

        async login(payload: UserType): Promise<void> {
            await dispatch.auth.csrf();
            const me = await dispatch.auth.me();

            if (me) {
                return;
            }

            try {
                await window.axios.post(`/api/users/login/${payload.id}`, [], {
                    headers: {Accept: 'application/javascript'}
                });

                await dispatch.auth.me();
            } catch (e) {
                dispatch.auth.setFailed(true);
                // TODO: maybe pass API message
                throw e;
            }
        }
    })
});
