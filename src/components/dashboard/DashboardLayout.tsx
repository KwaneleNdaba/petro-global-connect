"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import {
    Home,
    BarChart2,
    FileText,
    Users,
    Settings
} from 'lucide-react';
import DetailCard from './DetailCard';
import InsightsPanel from './InsightsPanel';
import SalesOverview from './SalesOverview';


interface NavItem {
    path: string;
    icon: React.ReactNode;
    active: boolean;
}

const DashboardLayout = () => {
    const [navItems, setNavItems] = useState<NavItem[]>([
        { path: '/', icon: <Home className="w-5 h-5" />, active: true },
        { path: '/sales', icon: <BarChart2 className="w-5 h-5" />, active: false },
        { path: '/reports', icon: <FileText className="w-5 h-5" />, active: false },
        { path: '/users', icon: <Users className="w-5 h-5" />, active: false },
        { path: '/settings', icon: <Settings className="w-5 h-5" />, active: false },
    ]);

    const handleNavClick = (clickedPath: string) => {
        setNavItems(navItems.map(item => ({
            ...item,
            active: item.path === clickedPath
        })));
    };

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

    return (
        <div className="px-6 h-full w-full bg-neutral-50 flex flex-col">
        <div className="relative bottom-3">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col h-full"
            >
                <div>
                    <DetailCard />
                    <SalesOverview />
                    <InsightsPanel />
                </div>
       
            </motion.div>
        </div>
    </div>
    );
};

export default DashboardLayout;