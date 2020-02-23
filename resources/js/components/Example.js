import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


function useEcho(channel, event, handler) {
    const call = useRef(null);

    call.current = handler;

    useEffect(() => {
        Echo.private(channel)
            .listen(event, () => {
                call.current();
            });
        return () => {
            Echo.leave(channel);
        }
    }, []);
}

function Counter() {
    const [count, setCount] = useState(0);

    useEcho('messages', 'TestEvent', () => {
        setCount(count + 1);
    });

    useEcho('messages', 'MessageEvent', () => {
        setCount(count + 1);
    });

    return <>
        <h1>Hooks: {count}</h1>
        <button onClick={() => {
            axios.get('/event');
        }}>Raise event
        </button>
    </>
}

class CounterClass extends React.Component {
    componentDidMount() {
        this.setState({count: 0});
        console.log('from classes0');

        Echo.private('messages')
            .listen('TestEvent', () => {
                console.log('from classes');
                this.setState(prev => ({
                    count: prev.count + 1,
                }));
            });
    }

    componentWillUnmount() {
        Echo.leave('messages');
    }

    render() {
        if (this.state) {
            return (
                <>
                    <h1>Class: {this.state.count}</h1>

                    <button onClick={() => {
                        axios.get('/event');
                    }}>Raise event
                    </button>
                </>
            )
        } else
            return <p>zzzz</p>
    }
}

ReactDOM.render(<>
    <Counter/>
    <CounterClass/>
</>, document.getElementById('container'));
