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

        /**
         * TODO: not yet implemented
         *
         * @param state - current match state
         * @param payload
         * @returns {null}
         */
        leave(state, payload) {
            return null;
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
        }
    }),
};
