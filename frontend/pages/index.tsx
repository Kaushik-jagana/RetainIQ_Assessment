import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Table from '../components/Table';
import UpperHead from '../components/Header';

const Home = () => {
  return (
    <div className="flex flex-col w-full max-w-8xl p-2 sm:p-6">
      <UpperHead />
      <DndProvider backend={HTML5Backend}>
        <Table />
      </DndProvider>
    </div>
  );
};

export default Home;
