import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { Navigation } from './ui/navigation';
import { getTodo } from 'ui/todo/store';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodo());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Navigation />
      </div>
    </DndProvider>
  );
}

export default App;
