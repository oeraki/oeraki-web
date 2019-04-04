// import Index from "views/Index.jsx";
// import Profile from "views/examples/Profile.jsx";
// import Maps from "views/examples/Maps.jsx";
// import Register from "views/examples/Register.jsx";
import Feed from './components/Feed';
// import Tables from "views/examples/Tables.jsx";
// import Icons from "views/examples/Icons.jsx";

var routes = [
    {
        path: "/feed",
        name: "Feed",
        icon: "ni ni-tv-2 text-primary",
        component: Feed,
        layout: "/dashboard"
    },
];
export default routes;