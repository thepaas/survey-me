import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Event from '@pages/event';
import EventReview from '@pages/event-review';
import ProofEvent from '@pages/proof-event';
import ProofEventSuccess from '@pages/proof-event-success';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/event/6412345' replace />} />
          <Route path='/event/:eventId' element={<Event />} />
          <Route path='/event/:eventId/review' element={<EventReview />} />
          <Route path='/event/:eventId/proof' element={<ProofEvent />} />
          <Route
            path='/event/:eventId/proof/success'
            element={<ProofEventSuccess />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
