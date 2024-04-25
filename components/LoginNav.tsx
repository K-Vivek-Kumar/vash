import Link from "next/link";

const LoginNav = () => {
  return (
    <nav className="bg-white py-2 lg:py-0 border-b-2 text-green-400">
      <div className="flex flex-col items-center lg:flex-row lg:justify-around">
        <div className="mb-4 lg:mb-0">
          <Link href={"/"}>
            <img src="/full_logo.png" alt="Logo" className="h-24" />
          </Link>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <p className="font-bold text-black">Need Assistance?</p>
          <button className="font-bold">
            <Link href="/authentication">Contact our Customer Service</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LoginNav;
