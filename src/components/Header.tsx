import LogoIcon from "./icons/LogoIcon";

export default function Header() {
  return (
    <header className="w-full h-[56px] px-4 flex flex-row items-center justify-between border-b">
      {/* Logo */}
      <a
        className="relative flex flex-row items-center gap-2 cursor-pointer"
        href="/"
      >
        <LogoIcon />
        <h1 className="font-bold">YouTube</h1>
        <span className="absolute top-0 text-gray-400 -right-4 text-caption">
          KR
        </span>
      </a>
      {/* Search Input */}
      
      {/* User Menu */}
    </header>
  );
}
