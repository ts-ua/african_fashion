
import { FaHome as HomeIcon } from "react-icons/fa";
import { FaCog as SettingsIcon } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
export const data = [
    {
        title: "Dashboard",
        icon: <RxDashboard />,
        link: "/admin",
    },
    {
        title: "Customers",
        icon: <FiUsers />,
        link: "/admin/customer",
    },
    {
        title: "Orders",
        icon: <FaCartArrowDown />,
        link: "/admin/order",
    },
    {
        title: "Products",
        icon: <SettingsIcon />,
        link: "/admin/products",
    },
];

//table
const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "TYPE", uid: "type", sortable: true },
    { name: "PRICE", uid: "price", sortable: true },
    { name: "SET", uid: "set" },
    { name: "ACTIONS", uid: "actions", }
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
];


const types = [
    "Georges", "Laces", "Waxes"
];

const SubTypes = [
    {
        title: "Georges",
        subTypes: ["Plain George", "Medium Silk George", "Medium Silk Stoned George", "Heavy Beaded George", "Heavy Beaded Silk George", "French George", "Intorica George", "Stoned George", "Net George"]
    },
    {
        title: "Laces",
        subTypes: ["Net White Lace", "Velvet Lace", "Cord Lace", "Tulle Lace", "Medium Tulle Lace", "French Lace", "Regular Lace", "Vole Lace"]
    },
    {
        title: "Waxes",
        subTypes: ["Super Wax", "Vlisco Dutch Hollandaise", "Vlisco Hollandaise Dutch", "Vlisco Hollandaise Wax", "White and Black Vlisco Hollandaise", "High Tek", "Davita Wax", "Embroidery Lace Wax"]
    },
];


export { columns, statusOptions, types, SubTypes };
