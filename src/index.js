import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserProvider from './UserContext';
import GameProvider from './GameContext';
import BubbleProvider from './BubbleContext';

ReactDOM.render(<BubbleProvider><GameProvider><UserProvider><App /></UserProvider></GameProvider></BubbleProvider>, document.getElementById('root'));

