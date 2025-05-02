"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Fuel,
  Gauge,
  CreditCard,
  BookOpen,
  ArrowUpDown,
  DollarSign,
  Banknote,
  FileSearch,
  ShoppingCart,
  Tags,
  Truck,
  Box,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import Link from "next/link";
import Image from "next/image";

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

export default function ManagerLayout({
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
      title: "HOME",
      icon: <Home className="w-5 h-5" />,
      children: [
        {
          title: "Dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />,
          link: "/manager/dashboard",
        },
      ],
    },
    {
      title: "MANAGEMENT",
      icon: <FileText className="w-5 h-5" />,
      children: [
        {
          title: "Daily Report",
          icon: <Gauge className="w-5 h-5" />,
          link: "/manager/daily-report",
        },
        {
          title: "Manage Creditors",
          icon: <Users className="w-5 h-5" />,
          link: "/manager/credit-management",
        },
        {
          title: "Manage Orders",
          icon: <ShoppingCart className="w-5 h-5" />,
          link: "/manager/order-management",
        },
        {
          title: "Manage Prices",
          icon: <Tags className="w-5 h-5" />,
          link: "/manager/price-management",
        },
        {
          title: "Manage Stock",
          icon: <Box className="w-5 h-5" />,
          link: "/manager/stock-management",
        },
        {
          title: "Fleet move",
          icon: <Truck className="w-5 h-5" />,
          link: "#fleet-move",
        },
      ],
    },
    {
      title: "FINANCIALS",
      icon: <DollarSign className="w-5 h-5" />,
      children: [
        {
          title: "Money Banked",
          icon: <Banknote className="w-5 h-5" />,
          link: "/manager/banking",
        },
        {
          title: "Payouts",
          icon: <DollarSign className="w-5 h-5" />,
          link: "payouts",
        },
        {
          title: "Shortover",
          icon: <FileSearch className="w-5 h-5" />,
          link: "/short-over",
        },
        {
          title: "Card/EFT",
          icon: <CreditCard className="w-5 h-5" />,
          link: "/card-eft",
        },
        {
          title: "Payments",
          icon: <ArrowUpDown className="w-5 h-5" />,
          link: "/manager/payments",
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

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // router.push("/logout");
  };

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
          {/* Animated Logo at the top */}
          <motion.div 
            className="flex items-center justify-center py-4 border-b border-neutral-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: isOpen ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
      <div className="relative h-12 w-full px-4 flex items-center justify-center">
  <AnimatePresence mode="wait">
    {isOpen ? (
      <motion.div
        key="expanded-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="max-w-[120px] max-h-[40px]" // control size here
      >
        <Image 
          src="/PetroGlobal.png" 
          alt="PetroGlobal Logo" 
          fill 
          className="object-contain w-full h-full transition-all duration-200"
          priority
        />
      </motion.div>
    ) : (
      <motion.div
        key="collapsed-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="rounded-full bg-neutral-700 p-2 flex items-center justify-center">
          <Image 
            src="/PetroGlobal.png" 
            alt="PetroGlobal Logo" 
            width={32} 
            height={32} 
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

          </motion.div>

          <div className="overflow-y-auto hide-scrollbar flex-1 py-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
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

          {/* Animated Logout button at the bottom */}
          <motion.div 
            className="mt-auto p-4 border-t border-neutral-700"
            whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleLogout}
              className={`flex items-center ${!isOpen ? "justify-center" : "px-4"} gap-3 py-2 rounded-lg text-sm w-full text-neutral-300 hover:text-white`}
            >
              <motion.div
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <LogOut className="w-5 h-5" />
              </motion.div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
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