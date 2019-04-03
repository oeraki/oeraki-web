// import Index from "views/Index.jsx";
// import Profile from "views/examples/Profile.jsx";
// import Maps from "views/examples/Maps.jsx";
// import Register from "views/examples/Register.jsx";
import Login from './components/Login';
import Register from './components/Register';
// import Tables from "views/examples/Tables.jsx";
// import Icons from "views/examples/Icons.jsx";

var routes = [
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth"
    }
];
export default routes;
