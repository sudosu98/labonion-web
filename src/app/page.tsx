import Intro from "@/components/Intro";
import Description from "@/components/Description";
import { DocumentTextIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/16/solid";
export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center">
      <Intro />
      <Description />
      <footer className="row-start-3 w-full flex gap-6 flex-wrap items-center justify-center fixed z-10 bottom-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <DocumentTextIcon height={16} width={16} />
          Blogs
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <HomeIcon height={16} width={16}/>
          About
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
          rel="noopener noreferrer"
        >
          <UserGroupIcon height={16} width={16} />
          Team
        </a>
      </footer>
      <p>© {new Date().getFullYear()} Labonion. All rights reserved.</p>
    </main>
  );
}
