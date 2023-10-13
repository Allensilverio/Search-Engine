import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useNavigate, Routes, Route, BrowserRouter} from 'react-router-dom';
import Container from './components/Container';
import ProtectedPage from './ProtectedPage';
import SearchListFinal from './pages/SearchListFinal';
 
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
 
const root = ReactDOM.createRoot(document.getElementById('root'));

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
 
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >

      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/searchlistfinal" element={<SearchListFinal />}/>
      <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/home'} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/home'} routing="path" path="/sign-up" />}
        />
                <Route
          path="/home"
          element={
          <>
            <SignedIn>
              <Container />
            </SignedIn>
             <SignedOut>
              <RedirectToSignIn />
           </SignedOut>
          </>
          }
        />    
      </Routes>
    </ClerkProvider>
  )

  }

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ClerkProviderWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
