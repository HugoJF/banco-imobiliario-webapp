import React from 'react';
import domElements from "./domElements";

const filterProps = (props) => {
    const filtered = {};
    const domProp = /^\$/;

    for (let key in props) {
        if (!props.hasOwnProperty(key)) continue;

        if (domProp.test(key)) {
            filtered[key.substr(1)] = props[key];
        }
    }

    return filtered;
};

const helpers = props => ({
    when: (cond, t, f = null) => props[cond] ? t : f
});

const resolveDynamicProp = (props) => {
    return (fn) => {
        if (typeof fn === 'string') {
            return props[fn];
        } else {
            return fn({...props, ...helpers(props)});
        }
    }
};

const createConstructor = (type) => function (strings, ...values) {
    return function (props) {
        const {className: preClassName, children} = props;

        const fixed = strings.join(' ');
        const dynamic = values.map(resolveDynamicProp(props)).join(' ');

        const className = [fixed, dynamic, preClassName].join(' ').replace(/\s+/g, ' ').trim();

        return React.createElement(type, {...filterProps(props), className}, children);
    };
};

const tailwind = domElements.reduce((prev, cur) => {
    prev[cur] = createConstructor(cur);

    return prev;
}, {});

export default tailwind;
