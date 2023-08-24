import SearchInput from "./SearchInput";
import LogoIcon from "./icons/LogoIcon";

export default function Header() {
  return (
    <header className="w-full h-[56px] px-4 flex flex-row items-center justify-between border-b">
      {/* Logo */}
      <a
        className="relative flex flex-row items-center gap-1 cursor-pointer"
        href="/"
      >
        <LogoIcon />
        <h1 className="text-2xl font-bold">YouTube</h1>
        <span className="absolute top-0 text-gray-400 -right-4 text-caption">
          KR
        </span>
      </a>
      {/* Search Input */}
      <SearchInput />
      {/* User Menu */}
      <div>
        <img/>
      </div>
    </header>
  );
}
