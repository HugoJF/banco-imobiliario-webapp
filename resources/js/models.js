export const me = {
    state: 0,
    reducers: {
        set(state, payload) {
            state = payload;
            return state;
        },
    },
    effects: dispatch => ({
        async get(payload, rootState) {
            try {
                let response = await axios.get(`api/me`);
                dispatch.me.set(response.data);
                await dispatch.players.getById(response.data);

                return response.data;
            } catch (e) {
                console.error('Error while fetching own information', e);
            }
        },
    }),
};

export const players = {
    state: null, // null is basically unloaded
    reducers: {
        /**
         * Add new player to state
         *
         * @param state - current `players` state
         * @param payload - player data
         * @returns {{}}
         */
        add(state, payload) {
            // Check if state is still unloaded and set it to empty Object
            if (state === null) {
                state = {};
            }

            state[payload.id] = payload;
            return state;
        },
        update(state, payload) {
            if (state === null) {
                return state;
            }

            if (state[payload.id]) {
                state[payload.id] = payload;
            }

            return state;
        },
        /**
         * Remove player from state
         *
         * @param state - current `players` state
         * @param payload - player data
         * @returns {*}
         */
        remove(state, payload) {
            // Avoid errors if state is null
            if (state === null) {
                return;
            }

            delete state[payload.id];
            return state;
        }
    },
    effects: dispatch => ({
        /**
         * Fetches every player in the match
         *
         * @param payload - match ID
         * @param rootState - full app state
         * @returns {Promise<void>}
         */
        async get(payload, rootState) {
            try {
                let response = await axios.get(`api/match/${payload}/players`);

                // TODO: avoid dispatching multiple actions by updating reducer
                for (let player of response.data) {
                    dispatch.players.add(player);
                }

                return response.data;
            } catch (e) {
                console.error('Error while fetching players from match', e);
            }
        },
        async edit(payload, rootState) {
            try {
                let response = await axios.patch(`api/users/${payload.id}`, payload.data);

                dispatch.players.update(response.data);

                return response.data;
            } catch (e) {
                console.log('Error fetching user', e);
            }
        },
        async getById(payload, rootState) {
            try {
                let response = await axios.get(`api/users/${payload}`);

                dispatch.players.add(response.data);

                return response.data;
            } catch (e) {
                console.log('Error fetching user', e);
            }
        }
    }),
};

export const balances = {
    state: {}, // null is basically unloaded
    reducers: {
        update(state, payload) {
            let balances = Object
                .entries(payload)
                .map(([id, balance]) => ({id, balance}));

            for (let balance of balances) {
                state[balance.id] = balance.balance;
            }

            return state;
        },
    },
    effects: dispatch => ({
        async get(payload, rootState) {
            try {
                let response = await axios.get(`api/match/${payload}/balances`);

                dispatch.balances.update(response.data);

                return response.data;
            } catch (e) {
                console.error('Error while fetching players from match', e);
            }
        },
    }),
};

export const transactions = {
    state: {},
    reducers: {
        add(state, payload) {
            if (!Array.isArray(payload)) {
                payload = [payload];
            }

            for (let transaction of payload) {
                state[transaction.id] = transaction;
            }

            return state;
        },
    },
    effects: dispatch => ({
        async create(payload, rootState) {
            try {
                let response = await axios.post(`api/match/${payload.id}/transaction`, payload.data);

                dispatch.transactions.add(response.data);

                return response.data;
            } catch (e) {
                console.error('Error creating new transaction');
            }
        },

        async getByMatchId(payload, rootState) {
            try {
                let response = await axios.get(`api/match/${payload}/transactions`);

                dispatch.transactions.add(response.data);

                return response.data;
            } catch (e) {
                console.error('Error fetching match transactions', e);
            }
        },
    }),
};

export const match = {
    state: null,
    reducers: {
        /**
         * Set current match data
         *
         * @param state - current match data
         * @param payload - match data
         * @returns {*}
         */
        set(state, payload) {
            return payload;
        },
    },
    effects: dispatch => ({
        /**
         * Check if player is already in a game
         *
         * @param payload - unused
         * @param rootState - app state
         * @returns {Promise<void>}
         */
        async search(payload, rootState) {
            try {
                let response = await axios.get('api/match/search');

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Error while search for current match', e);
            }
        },

        async createAndJoin(payload, rootState) {
            try {
                let match = await dispatch.match.create();
                await dispatch.match.join(match.id);

                return match;
            } catch (e) {
                console.error('Error while trying to create and join a match', e);
            }
        },

        async create(payload, rootState) {
            try {
                let response = await axios.post('api/match/create');

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Error while trying to create and join a match', e);
            }
        },

        /**
         * Attempts to join match by ID
         *
         * @param payload - match ID
         * @param rootState - app state
         * @returns {Promise<void>}
         */
        async join(payload, rootState) {
            try {
                let response = await axios.post(`api/match/${payload}/join`);

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Failed to join match', payload, e);
            }
        },

        async nextTurn(payload, rootState) {
            try {
                let response = await axios.patch(`api/match/${payload}/next`);

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Error going to the next turn', e);
            }
        },

        async start(payload, rootState) {
            try {
                let response = await axios.patch(`api/match/${payload}/start`);

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Failed to start match', payload, e);
            }
        },

        async end(payload, rootState) {
            try {
                let response = await axios.patch(`api/match/${payload}/end`);

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Failed to end match', payload, e);
            }
        },

        async update(payload, rootState) {
            try {
                let response = await axios.patch(`api/match/${payload.id}`, payload.data);

                dispatch.match.set(response.data);

                return response.data;
            } catch (e) {
                console.error('Failed to update match details', payload, e);
            }
        },

        async leave(payload, rootState) {
            try {
                let response = await axios.delete(`api/match/leave`);

                dispatch.match.set(null);

                return response.data;
            } catch (e) {
                console.error('Failed to leave match', payload, e);
            }
        },
    })
};
