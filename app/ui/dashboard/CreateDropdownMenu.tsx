import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

export const CreateDropdownMenu: FC = () => {
  return (
    <div className="dropdown dropdown-bottom rounded-md bg-base-200 text-sm font-medium hover:bg-primary flex-none justify-start">
      <div tabIndex={0} role="button" className="flex items-center w-full p-3 gap-2">
        <PlusCircleIcon className="w-6" />
        <p className="block">Create</p>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 mt-2 shadow bg-base-200 hover:bg-primary rounded-box w-full"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};
