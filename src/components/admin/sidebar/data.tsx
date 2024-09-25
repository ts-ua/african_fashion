import { FaFileAlt as DocIcon } from "react-icons/fa";
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaTasks as TaskIcon } from "react-icons/fa";
import { FaChartBar as ReportIcon } from "react-icons/fa";
import { FaProjectDiagram as ProjectIcon } from "react-icons/fa";
import { FaCog as SettingsIcon } from "react-icons/fa";
import { FaCalendarAlt as CalendarIcon } from "react-icons/fa";
import { FaClock as TimeManageIcon } from "react-icons/fa";

export const data = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        title: "Projects",
        icon: <ProjectIcon />,
        link: "/admin/projects",
    },
    {
        title: "My tasks",
        icon: <TaskIcon />,
        link: "/admin/tasks",
    },
    {
        title: "Calendar",
        icon: <CalendarIcon />,
        link: "/admin/calendar",
    },
    {
        title: "Time manage",
        icon: <TimeManageIcon />,
        link: "/admin/time-manage",
    },
    {
        title: "Reports",
        icon: <ReportIcon />,
        link: "/admin/reports",
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/admin/settings",
    },
    {
        title: "Documentation",
        icon: <DocIcon />,
        link: "/admin/documentation",
    },
];
