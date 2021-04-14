import React from 'react';
import {ChevronLeft, LogOut, User} from "react-feather";
import {useAuth} from "../../selectors";
import {useIsAuthed} from "../../hooks/useIsAuthed";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import {useHistory} from "react-router";

export const HeaderContainer: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch<Dispatch>();
    const auth = useAuth();
    const isAuthed = useIsAuthed();

    function handleOnBack() {
        history.goBack();
    }

    function handleOnLogout() {
        dispatch.auth.logout();
    }

    if (!isAuthed) {
        return null;
    }

    return <header className="text-white bg-gray-900">
        <div className="flex items-center justify-between mx-auto container py-5 space-x-4">
            {/* Left side */}
            <ChevronLeft className="cursor-pointer" onClick={handleOnBack}/>

            {/* Middle */}
            <div className="flex items-center space-x-4">
                <User/>
                <span>{auth?.me?.name}</span>
            </div>

            {/* Right side */}
            <div onClick={handleOnLogout}>
                <LogOut className="cursor-pointer"/>
            </div>
        </div>
    </header>
};
