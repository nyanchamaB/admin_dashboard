import { ColorModeContext,useMode } from './theme';
import { Routes,BrowserRouter, Route,Link } from 'react-router-dom';
import { CssBaseline,ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import Sidebar from './scenes/global/Sidebar';
import { useState } from 'react';

import Students from './scenes/students';
import Teachers from './scenes/teachers';
import Events from './scenes/calendar';
import Accounts from './scenes/accounts';
import Pie from './scenes/pie';
import Line from './scenes/line';
import Bar from './scenes/bar';
import FAQS from './scenes/faqs';
import Notifications from './scenes/notifications';
import Exams from './scenes/exams';
 import Profile  from './scenes/profile';
function App() {
  const [theme,colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);



  return (<ColorModeContext.Provider value={colorMode}>
     <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            
        <Routes>
        <Route path="/" element = {<Dashboard/>} />
       <Route path="/students" element = {<Students/>} />
       <Route path="/teachers" element = {<Teachers/>} />
        <Route path="/calendar" element = {<Events/>} />
        <Route path="/accounts" element = {<Accounts/>} />
        <Route path="/exams" element = {<Exams/>} />
        <Route path="/pie" element = {<Pie/>} />
        <Route path="/line" element = {<Line/>} />
        <Route path="/bar" element = {<Bar/>} />
        <Route path="/faqs" element = {<FAQS/>} />
        <Route path="/profile" element={<Profile/>} />
  <Route path="/notifications" element = {<Notifications/>} />*/
        </Routes>
        
        </main>
     </div>
     </ThemeProvider>
      </ColorModeContext.Provider>); 
 
}

export default App;
