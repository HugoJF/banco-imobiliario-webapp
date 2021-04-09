import {useAuth} from "../selectors";

export function useIsAuthed(): boolean {
    const auth = useAuth();

    return Boolean(auth?.me || auth?.guest);
}
