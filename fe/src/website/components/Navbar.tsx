const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between p-8 border-b sticky top-0 z-50 bg-white">
        <div>My Web</div>
        <ul className="flex items-center justify-center gap-8">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Portofolio</li>
          <li>Contact</li>
        </ul>
      </div>
      <div></div>
    </>
  );
};

export default Navbar;
