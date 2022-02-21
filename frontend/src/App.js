import "./style/main.css";

import Home from "./component/Home";
import MainNav from "./layout/MainNav";
import Footer from "./layout/Footer";
import SubFooter from "./layout/SubFooter";

function App() {
  return (
    <div className="App">
      <MainNav />
      <Home />
      <Footer />
      <SubFooter />
    </div>
  );
}

export default App;
