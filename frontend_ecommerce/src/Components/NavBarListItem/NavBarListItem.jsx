import PropTypes from "prop-types";

function NavBarListItem(props) {
  return (
    <li className="nav-item">
      <a className="nav-link" aria-current="page" href="#">
        {props.title}
      </a>
    </li>
  );
}

NavBarListItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavBarListItem;
