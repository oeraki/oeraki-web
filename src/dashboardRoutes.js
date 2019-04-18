// import Index from "views/Index.jsx";
// import Profile from "views/examples/Profile.jsx";
// import Maps from "views/examples/Maps.jsx";
// import Register from "views/examples/Register.jsx";
import Feed from './components/Feed';
import Profile from './components/Profile';
import VideoPage from './components/VideoPage';
var routes = [
    {
        path: "/feed",
        name: "Feed",
        icon: "ni ni-tv-2 text-primary",
        component: Feed,
        layout: "/dashboard",
        show: true
    },
    {
        path: "/profile",
        name: "Profile",
        icon: "ni ni-single-02 text-primary",
        component: Profile,
        layout: "/dashboard",
        show: true
    },
    {
        path: "/video",
        name: "Video",
        icon: "ni ni-single-02 text-primary",
        component: VideoPage,
        layout: "/dashboard",
        show: false
    },
];
export default routes;