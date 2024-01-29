import Main from './Main'
import Footer from './Footer'
import Header from './Header'

import './css/layout.css'

function Layout(props) {
    return <div className="layout">
        <Header />
        <Main />
        <Footer />
    </div>
}

export default Layout;