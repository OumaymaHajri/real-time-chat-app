import { Routes, Route, Navigate, Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Login";
import Chat from "./pages/Chat";
import { ChatProvider } from "./context/ChatContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/Signup";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";

function App() {


  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }
  return (
    <ChatProvider user={user}>
      <Navbar />
         <Routes>
          <Route element={<PrivateRoutes />}> 
            <Route path="/chat" element={<Chat />}></Route>
          </Route>
          <Route path="/" element={ user?<Chat /> :<Login /> }></Route>
          <Route path="/signup" element={user?<Chat /> :<Signup />}></Route>
        </Routes>
     </ChatProvider>

  );
}

export default App;
