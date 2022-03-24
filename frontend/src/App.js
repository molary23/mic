import "./style/main.css";

import Home from "./component/Home";
import Service from "./component/Service";
import Contact from "./component/Contact";
import MainNav from "./layout/MainNav";
import Footer from "./layout/Footer";
import SubFooter from "./layout/SubFooter";

function App() {
  return (
    <div className="App">
      <MainNav />
      <Home />
      <Service />
      <Contact />
      <Footer />
      <SubFooter />
    </div>
  );
}

export default App;
