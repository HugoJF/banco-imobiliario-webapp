import React from 'react';
import {ChevronLeft, LogOut, User} from "react-feather";
import {useAuth, useToasts} from "../../selectors";
import {useIsAuthed} from "../../hooks/useIsAuthed";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import {useHistory} from "react-router";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Toast} from "../ui/Toast";

export const HeaderContainer: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch<Dispatch>();
    const auth = useAuth();
    const isAuthed = useIsAuthed();
    const toasts = useToasts();

    function handleOnBack() {
        history.goBack();
    }

    function handleOnLogout() {
        dispatch.auth.logout();
    }

    if (!isAuthed) {
        return null;
    }

    return <header className="relative flex justify-center text-white bg-gray-900">
        {/* Status bar */}
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

        {/* Toasts */}
        <TransitionGroup className="absolute top-full container space-y-4 z-20 overflow-hidden">
            {Object
                .entries(toasts)
                .filter((value, index) => index < 3)
                .map(([id, toast]) => <CSSTransition
                        key={id}
                        classNames="slide"
                        timeout={500}
                    >
                        <Toast key={id} id={id} toast={toast}/>
                    </CSSTransition>
                )}
        </TransitionGroup>
    </header>
};
