import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import SearchList from '../pages/SearchList';
import Container from '../components/Container';

export default function Router(props) {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Container />} />
                <Route path="/SearchList" element={<SearchList />} />
            </Route>
        )
    );
  return (
    <div>
    <RouterProvider router={router}>

    </div>
  );
}







