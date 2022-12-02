import { FC } from 'react';

const Navbar: FC = () => {
  return (
    <div className="flex justify-center h-max items-center bg-blue-800/95 shadow-md">
      <h1 className="text-5xl p-3 text-white">MyBooks</h1>
    </div>
  );
};

export default Navbar;
