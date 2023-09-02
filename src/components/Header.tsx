import SearchInput from "./SearchInput";
import LogoIcon from "./icons/LogoIcon";

const DUMMY_USER_PROFILE_IMAGE_URL =
  "https://plus.unsplash.com/premium_photo-1690366910332-6cb1dc10c000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60";
// 차후에 유저 인증, 로그인 기능을 구현하면 이 부분을 수정할 것.

export default function Header() {
  return (
    <header className="w-full h-[56px] px-4 flex flex-row items-center justify-between fixed z-50 bg-white">
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
        <img
          src={DUMMY_USER_PROFILE_IMAGE_URL}
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
