import "./NavBarDropdown.css";
import NavBarListItem from "../NavBarListItem/NavBarListItem.jsx";

function NavBarDropdown() {
  return (
    <>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown link
        </a>
        <ul className="dropdown-menu">
          <NavBarListItem title="Opcion 1" />
          <NavBarListItem title="Opcion 2" />
          <NavBarListItem title="Opcion 3" />
        </ul>
      </li>
    </>
  );
}

export default NavBarDropdown;
