import React from 'react';

import TitleBar from '../components/common/title';
import MenuBar from '../components/common/menuBar';

class MainPage extends React.Component {
    render() {
        return (
            <div className="MainPage">
                <TitleBar />
                <MenuBar />
            </div>
        );
    }
}

export default MainPage;
