import Navbar from './default/Navbar.jsx'
import Home from './home/Home.jsx'
import Films from './home/Films.jsx'
import Actors from './home/Actors.jsx'
import HotPicks from './home/HotPicks.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddFilm from './post/AddFilm.jsx'
import EditFilm from './put/EditFilm.jsx'
import DeleteFilm from './delete/DeleteFilm.jsx'
import AddActor from './post/AddActor.jsx'
import EditActor from './put/EditActor.jsx'
import DeleteActor from './delete/DeleteActor.jsx'
import {SnackbarProvider} from 'notistack';

function App() {

  return (
        <Router>
          <SnackbarProvider>
            <div id='main'>
              <Navbar />
              <Routes>
                <Route exact path="/" element={
                  <>
                  <Home />
                  <Films />
                  <Actors />
                  <HotPicks />
                  </>
                  }/>
                <Route exact path='/addFilm' element={<AddFilm /> }/>
                <Route exact path='/editFilm' element={<EditFilm /> }/>
                <Route exact path='/deleteFilm' element={<DeleteFilm /> }/>
                <Route exact path='/addActor' element={<AddActor /> }/>
                <Route exact path='/editActor' element={<EditActor /> }/>
                <Route exact path='/deleteActor' element={<DeleteActor /> }/>
              </Routes>
            </div>
          </SnackbarProvider>
        </Router>
  )
}

export default App