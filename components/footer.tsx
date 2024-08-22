import CustomLink from "./custom-link";

export default function Footer() {
  return (
    <footer className="flex bg-card rounded-md p-12 flex-col gap-4 px-4 my-4 mx-0 w-full text-sm sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:my-12 sm:mx-auto sm:h-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <CustomLink href="https://docs.expo.dev/technical-specs/expo-updates-1/">
          Documentation
        </CustomLink>
        <CustomLink href="https://github.com/Shuniy/expo-updates-client">
          Client Test App
        </CustomLink>
        <CustomLink href="https://github.com/Shuniy/expo-updates-server">
          Source on GitHub
        </CustomLink>
      </div>
      <div className="flex gap-2 justify-start items-center">
        <CustomLink href="https://github.com/Shuniy">{"Shubham Kumar"}</CustomLink>
      </div>
    </footer>
  );
}
