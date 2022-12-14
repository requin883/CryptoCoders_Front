import ValidatePays from "./ValidatePays/ValidatePays"
import { Routes, Route, Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import Transactions from "./Transactions/Transactions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import ProtectedRoute from "../ProtectedRoute";
import ExamplesNavbar from "./Homepages/Components/Navbar";
import { useState } from "react";

function Menu() {
    const [valFlag, setValFlag] = useState(false);
    const [transFlag, setTransFlag] = useState(false);
    const [profileFlag, setProfileFlag] = useState(false);

    let [userLogin, setUserLogin] = useLocalStorage('user', "")

    let menu = [
        { links: '/menu/validatepay', options: 'Validate Payments', opt: 'vp' },
        { links: '/menu/transactions', options: 'Make a transaction', opt: 'mt' },
        { links: '/profile', options: 'Profile', opt: 'pf' },
    ]

    const cbMenu = (nm) => {
        return (<Button key={nm.options} onClick={nm.opt == 'vp' ? () => setValFlag(true) : nm.opt == 'mt' ? () => setTransFlag(true) : () => setProfileFlag(true)}  size="lg" > <Link style={{color:"white",textDecoration:"none"}} key={nm.options} to={nm.links}>  {nm.options} </Link> </Button>)
    }
    useEffect(() => {
        let date = new Date()
        setUserLogin(date)
    }, [])
    return (
        <>
            <ExamplesNavbar />
            <Container className="linkscontainer d-flex justify-content-evenly">
                {menu.map(cbMenu)}
            </Container>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/validatepay' element={<ValidatePays val={{ valFlag, setValFlag }} />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/transactions" element={<Transactions val={{ transFlag, setTransFlag }} />} />
                </Route>

            </Routes>
        </>
    )
}

export default Menu