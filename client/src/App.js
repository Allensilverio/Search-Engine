import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Container from './components/Container';
import SearchList from './pages/SearchList';
import SearchListFinal from './pages/SearchListFinal';

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route path="/" element={<Container />}/>
            <Route path="/searchlist" element={<SearchList />}/>
            <Route path="/searchlistFinal" element={<SearchListFinal />}/>
          </Route>
        )
    );
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  );
}