import '../styles/Footer.css';
import '../styles/Home.css';
import PageContent from '../components/AnimalPage'

function App() {
  document.title = 'Detalhes do animal';
  return (
    <div className="App">
      <PageContent />
    </div>
  );
}

export default App;
