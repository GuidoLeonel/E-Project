import NavBarDropdown from "../NavBarDropdown/NavBarDropdown.jsx";
import NavBarListItem from "../NavBarListItem/NavBarListItem.jsx";

function NavBarList() {
  return (
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <NavBarListItem title="Inicio" />
        <NavBarListItem title="Productos" />
        <NavBarListItem title="Contacto" />
        <NavBarDropdown />
      </ul>
    </div>
  );
}

export default NavBarList;
