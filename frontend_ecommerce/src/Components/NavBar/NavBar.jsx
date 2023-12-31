import "./NavBar.css";
import NavBarBtn from "../NavBarBtn/NavBarBtn.jsx";
import NavBarList from "../NavBarList/NavBarList.jsx";
import NavBarTitle from "../NavBarTitle/NavBarTitle.jsx";
import CartWidget from "../CartWidget/CartWidget.jsx";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavBarTitle />
        <NavBarBtn />
        <NavBarList />
        <CartWidget />
      </div>
    </nav>
  );
}

export default NavBar;
