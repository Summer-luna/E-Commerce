import {createRoot} from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import { ProductProvider} from "./components/Context/ProductContext";

const root = createRoot(document.querySelector('#root'));

root.render(
    <BrowserRouter>
        <ProductProvider>
          <AuthProvider>
              <App />
          </AuthProvider>
        </ProductProvider>
    </BrowserRouter>
)