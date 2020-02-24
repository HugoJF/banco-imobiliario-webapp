import {init} from '@rematch/core'
import immerPlugin from '@rematch/immer'
import * as models from './models'

const store = init({
    plugins: [immerPlugin()],
    models
});

export default store
