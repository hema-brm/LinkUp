"use client";

import { UserListSectionProps } from "@/types/sidebar";

  
export default function UserListSection({
    title,
    users,
    color,
    bg,
    text,
    total,
  }: UserListSectionProps) {
    return (
      <div>
        <h4 className={`text-md font-semibold mb-2 ${text}`}>
          {title}
          {typeof total === "number" && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({users.length}/{total})
            </span>
          )}
        </h4>
        <ul className="space-y-2 text-sm">
          {users.map((user, index) => (
            <li
              key={`${title}-${index}`}
              className={`flex px-2 py-1 ${bg} rounded items-center gap-3`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              {user}
            </li>
          ))}
        </ul>
      </div>
    );
}
  