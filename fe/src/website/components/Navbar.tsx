const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between p-8 border-b sticky top-0 z-50 bg-white">
        <a href="">My Web</a>
        <nav className="flex items-center justify-center gap-8">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portofolio">Portofolio</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div></div>
    </>
  );
};

export default Navbar;
