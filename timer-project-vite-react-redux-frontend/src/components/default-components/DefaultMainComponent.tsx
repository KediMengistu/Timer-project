import { Outlet } from "react-router";

function DefaultMainComponent() {
  return (
    <main className="flex h-full w-full flex-row bg-white bg-[radial-gradient(black_1px,transparent_1px)] [background-size:16px_16px] dark:bg-gray-900 dark:bg-[radial-gradient(#4B5563_1px,transparent_1px)]">
      <div className="m-8! flex flex-1 items-center justify-center rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] md:m-16! dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
        <Outlet />
      </div>
    </main>
  );
}

export default DefaultMainComponent;
