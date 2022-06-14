import {createRoot} from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Routes/AuthContext";

const root = createRoot(document.querySelector('#root'));

root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)