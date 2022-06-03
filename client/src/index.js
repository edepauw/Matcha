import React, { useContext, useState } from "react";
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from './context/ThemeContext.tsx';

ReactDOM.render(
		<ThemeProvider>
			<App />
		</ThemeProvider>
	,
	document.getElementById('root')
	);
registerServiceWorker();
