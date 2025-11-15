import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Test from "./Components/Test";
import { Provider } from "react-redux";
import appStore from "./utils.js/appStore";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Request from "./Components/Request";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/request" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
