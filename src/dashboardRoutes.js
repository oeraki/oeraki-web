// import Index from "views/Index.jsx";
// import Profile from "views/examples/Profile.jsx";
// import Maps from "views/examples/Maps.jsx";
// import Register from "views/examples/Register.jsx";
import Feed from './components/Feed';
import Profile from './components/Profile';
import Video from './components/Video';
var routes = [
    {
        path: "/feed",
        name: "Feed",
        icon: "ni ni-tv-2 text-primary",
        component: Feed,
        layout: "/dashboard"
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-single-02 text-primary",
        component: Profile,
        layout: "/dashboard"
    },
    {
        path: "/videos",
        name: "Videos",
        icon: "ni ni-single-02 text-primary",
        component: Video,
        layout: "/video"
    },
];
export default routes;