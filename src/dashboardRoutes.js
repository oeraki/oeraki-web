// import Index from "views/Index.jsx";
// import Profile from "views/examples/Profile.jsx";
// import Maps from "views/examples/Maps.jsx";
// import Register from "views/examples/Register.jsx";

// import Feed from './components/Feed';
import Profile from './components/Profile';
import Events from './components/Events';
import Collaboration from './components/Collaboration';

var routes = [
    // {
    //     path: "/feed",
    //     name: "Feed",
    //     icon: "ni ni-tv-2 text-primary",
    //     component: Feed,
    //     layout: "/dashboard"
    // },
    {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-single-02 text-primary",
        component: Profile,
        layout: "/dashboard"
    },
    {
        path: "/collaboration",
        name: "Collaboration",
        icon: "ni ni-world text-primary",
        component: Collaboration,
        layout: "/dashboard"
    },
    {
        path: "/events",
        name: "Events",
        icon: "ni ni-notification-70 text-primary",
        component: Events,
        layout: "/dashboard"
    },
];
export default routes;