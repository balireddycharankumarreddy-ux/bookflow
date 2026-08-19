import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <div className="dashboard-layout">

            {/* Mobile Backdrop */}
            <div
                className={`sidebar-backdrop ${sidebarOpen ? "visible" : ""}`}
                onClick={closeSidebar}
            />

            {/* Left Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

            {/* Right Side */}
            <div className="main-content">

                {/* Header */}
                <Header onToggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="page-content">
                    <PageTransition>
                        <Outlet />
                    </PageTransition>
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;