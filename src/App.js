import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Navigation } from './ui/navigation';
import { getTodo } from 'ui/todo/store';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, []);
  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
