export const me = {
    state: 0,
    reducers: {
        set(state, payload) {
            state = payload;
            console.log(payload);
            return state;
        },
    },
    effects: dispatch => ({
        async get(payload, rootState) {
            try {
                let response = await axios.get(`me`);
                dispatch.me.set(response.data);
                await dispatch.players.getById(response.data);
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
                let response = await axios.get(`match/${payload}/players`);

                // TODO: avoid dispatching multiple actions by updating reducer
                if (response.data) {
                    for (let player of response.data) {
                        dispatch.players.add(player);
                    }
                }
            } catch (e) {
                console.error('Error while fetching players from match', e);
            }
        },
        async edit(payload, rootState) {
            try {
                let response = await axios.patch(`users/${payload.id}`, payload.data);

                if (response.data) {
                    dispatch.players.update(response.data);
                }
            } catch (e) {
                console.log('Error fetching user', e);
            }
        },
        async getById(payload, rootState) {
            try {
                let response = await axios.get(`users/${payload}`);

                if (response.data) {
                    dispatch.players.add(response.data);
                }
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
                .map((b) => ({id: b[0], balance: b[1]}));

            for (let balance of balances) {
                state[balance.id] = balance.balance;
            }

            return state;
        },
    },
    effects: dispatch => ({
        async get(payload, rootState) {
            try {
                let response = await axios.get(`match/${payload}/balances`);

                if (response.data) {
                    dispatch.balances.update(response.data);
                }
            } catch (e) {
                console.error('Error while fetching players from match', e);
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
                let response = await axios.get('match/search');

                if (response.data) {
                    dispatch.match.set(response.data);
                }
            } catch (e) {
                console.error('Error while search for current match', e);
            }
        },

        async createAndJoin(payload, rootState) {
            try {
                await dispatch.match.create();
                await dispatch.match.join(rootState.match.id);
            } catch (e) {
                console.error('Error while trying to create and join a match', e);
            }
        },

        async create(payload, rootState) {
            try {
                let response = await axios.post('match/create');

                if (response.data) {
                    dispatch.match.set(response.data);
                }

                dispatch.match.join(response.data.id);
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
                let response = await axios.post(`match/${payload}/join`);
                if (response.data) {
                    dispatch.match.set(response.data);
                }
            } catch (e) {
                console.error('Failed to join match', payload, e);
            }
        },

        async start(payload, rootState) {
            try {
                let response = await axios.patch(`match/${payload}/start`);
                if (response.data) {
                    dispatch.match.set(response.data);
                }
            } catch (e) {
                console.error('Failed to start match', payload, e);
            }
        },

        async end(payload, rootState) {
            try {
                let response = await axios.patch(`match/${payload}/end`);
                if (response.data) {
                    dispatch.match.set(response.data);
                }
            } catch (e) {
                console.error('Failed to end match', payload, e);
            }
        },

        async leave(payload, rootState) {
            try {
                let response = await axios.delete(`match/leave`);
                if (response.data) {
                    dispatch.match.set(null);
                }
            } catch (e) {
                console.error('Failed to leave match', payload, e);
            }
        },
    })
};
