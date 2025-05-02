"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Users,
  Fuel,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import Link from "next/link";

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  children?: {
    title: string;
    icon: React.ReactNode;
    link: string;
    active?: string;
  }[];
}

export default function SuperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobileDetection();
  const pathname = usePathname();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      title: "MANAGEMENT",
      icon: <FileText className="w-5 h-5" />,
      children: [
      
        {
          title: "Stations",
          icon: <Fuel className="w-5 h-5"/>,
          link: "/super/stations",
        },
        {
          title: "Employees",
          icon: <Users className="w-5 h-5" />,
          link: "/super/employees",
        },
      
      ],
    },
 
  ]);
  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }, [isMobile]);

  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <div className="flex min-h-screen bg-neutral-50 ">
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: isMobile ? (isOpen ? 240 : 0) : isOpen ? 200 : 72,
          opacity: isMobile ? (isOpen ? 1 : 0) : 1,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed md:relative z-50 h-full bg-neutral-800 flex flex-col`}
      >
        {isOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={toggleMenu}
          />
        )}

        <div
          style={{
            width: isMobile ? (isOpen ? 240 : 0) : isOpen ? 200 : 72,
          }}
          className="flex flex-col bg-neutral-800 h-full fixed"
        >
          <div className="overflow-y-auto hide-scrollbar flex-1 py-8 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
            <div className="px-4 space-y-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                  className="text-white"
                >
                  {isOpen && (
                    <div className="text-neutral-400 uppercase text-xs font-semibold px-4 mb-2">
                      {item.title}
                    </div>
                  )}
                  <div className="space-y-1">
                    {item.children?.map((child, childIndex) => (
                      <motion.div
                        key={child.title}
                        custom={childIndex}
                        variants={navVariants}
                        whileHover={{ x: 5 }}
                        className="ml-4"
                      >
                        <Link
                          href={child.link}
                          className={`flex items-center ${!isOpen ? "justify-center pr-15" : "px-4"} gap-3 py-2 rounded-lg text-sm ${
                            pathname === child.link
                              ? "text-white"
                              : isOpen
                              ? "text-neutral-300 hover:bg-neutral-700"
                              : "text-neutral-300"
                          }`}
                        >
                          <span className={`${
                            pathname === child.link
                              ? "text-white"
                              : "text-neutral-600"
                          }`}>
                            {child.icon}
                          </span>
                          {isOpen && (
                            <span className="whitespace-nowrap">{child.title}</span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 w-full">
        <div className="sticky top-0 z-40 bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between h-12 px-6">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-neutral-500 hover:text-neutral-600 hover:bg-neutral-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <main className="px-6 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}