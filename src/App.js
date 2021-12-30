import Header from "./components/Header";
import { Signup } from "./pages/auth/Signup";
import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Dashboard } from "./pages/Dashboard";
import { useState, useEffect } from 'react'
import { supabase } from "./client/supabaseClient";
function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {session && <Route path="/dashboard" element={<Dashboard />}>

        </Route>}
      </Routes>

    </div>
  );
}

export default App;
