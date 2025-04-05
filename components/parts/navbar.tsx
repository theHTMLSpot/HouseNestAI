export default function Navbar() {
  return (
    <div className="flex w-full items-center justify-between bg-[#11171a] p-4 text-[#aabfc6]">
      <div className="text-2xl font-bold">House Nest</div>
      <div className="flex space-x-4">
        <a href="#features" className="hover:text-[#4d7298]">
          Features
        </a>
        <a href="#about" className="hover:text-[#4d7298]">
          About
        </a>
        <a href="#contact" className="hover:text-[#4d7298]">
          Contact
        </a>
        <a href="#about" className="hover:text-[#4d7298]">
          login
        </a>
        <a href="#about" className="hover:text-[#4d7298]">
          register
        </a>
      </div>
    </div>
  );
}
