// @ts-ignore
import Logo from '../assets/stackline_logo.svg?react'

const Header = () => {
  return (
    <header>
      <nav className="bg-logo py-4">
        <div className="flex flex-wrap justify-start items-center mx-2 text-white">
          <div className={'w-60'}>
            <Logo/>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;