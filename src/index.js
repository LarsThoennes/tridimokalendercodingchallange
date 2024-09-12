import React from "react"
import * as ReactDomClient from 'react-dom/client'
import App from "./App";
import './styles/index.css';
import './styles/header.css';

// Hier wird auf den div container mit der id root aus der index.html zugegriffen in dem dann der content aus App gerendert wird
const root = ReactDomClient.createRoot(document.getElementById('root'));

root.render(<App/>);