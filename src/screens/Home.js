import '../App.css';
import '../styles/Home.css';
import '../styles/Buttons.scss';
import Header from '../components/Header';
import About from '../components/About';
import PetList from '../components/petList';
import Adotar from '../components/Adopt';
import Doar from '../components/Donate'


function App() {
  document.title = '4 Patas';
  return (
    <div className="App">
      <Header />
      <About />
      <PetList />
      <Adotar />
      <Doar />
    </div >
  );
}

export default App;
