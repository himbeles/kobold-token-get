import { createRoot } from 'react-dom/client';
import MainView from "./MainView"
import React from 'react';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<MainView />);
