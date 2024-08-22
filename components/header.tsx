import MainNav from "./main-nav";
import ThemeSwitcher from "./theme-switcher";
import UserButton from "./user-button";

export default function Header() {
  return (
    <header className="sticky bg-card rounded-md px-3 flex-row top-0 left-0 right-0 flex justify-between items-center w-full h-16 mx-auto">
      <MainNav />
      <div className="flex flex-row gap-3">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </header>
  );
}
