// src/data/home-data/MenuData.js
const menu_data = [
    {   
        id: 1,
        title: "Dashboard",
        link: "/instructor-dashboard"
    },
    {
        id: 2,
        title: "Formation",
        link: "#",
        sub_menus: [
            { link: "/courses", title: "All Formation" },
            { link: "/course-details", title: "Formation Details" },
            { link: "/lesson", title: "video" },
        ],
    },
    
];

export default menu_data;
