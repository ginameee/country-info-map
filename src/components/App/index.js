import React from 'react';
import Map from '../Map';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>Country's Infomation App</h1>
                <Map></Map>
            </>
        );
    }
}

export default App;