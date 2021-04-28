import useRelativePath from "./useRelativePath";
import {useHistory, useLocation} from "react-router-dom";

export default function useNavigation() {
    const relative = useRelativePath();
    const history = useHistory();
    const location = useLocation();

    const goBack = history.goBack;

    function goUp() {
        const path = location.pathname;
        const parts = path.split('/');
        parts.pop();

        history.push(parts.join('/'));
    }

    function autoRelative(to: string) {
        if (to.startsWith('./')) {
            return relative(to.substr(1));
        } else {
            return to;
        }
    }

    function go(to: string) {
        history.push(autoRelative(to));
    }

    function bindGo(to: string) {
        return go.bind(null, to);
    }

    return {relative, goBack, goUp, go, bindGo};
}
