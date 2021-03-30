import "./logo.scss";

function Logo(props) {
  return (
    <div className="title">
      <div className="title__logo-wrapper">
        <img className="title__header-logo" alt="logo" src={`${process.env.PUBLIC_URL}/logo192.png`}></img>
      </div>
      <h2 className="title__heading">Heron Mobile</h2>
    </div>
  );
}

export default Logo;
