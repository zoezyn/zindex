import { Link, useNavigate } from 'react-router-dom'
import logo from "/src/assets/logo.png";
import './navbar.css'
import React, {useEffect,useState} from 'react'
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import { supabase } from '../../lib/supabaseClient';

// import { supabase } from '../lib/supabaseClient';

// export const Navbar: React.FC = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logoContainer}>
//         <img src={logo} alt="Zindex Logo" className={styles.logo} />
//         <span className={styles.brandName}>Zindex</span>
//       </div>
//       <ul className={styles.navLinks}>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/how-it-works">How It Works</Link></li>
//         <li><Link to="/my-notes">My Notes</Link></li>
//       </ul>
//       <div className={styles.actionButtons}>
//         <button className={`${styles.actionButton} ${styles.uploadButton}`}>Upload Your Notes</button>
//         <Link to="/login" className={styles.actionButton}>Log in</Link>
//         <Link to="/signup" className={styles.actionButton}>Sign up</Link>
//       </div>
//     </nav>
//   );
// };
export const Navbar: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate()
  const scrollToFeature = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  // const signOut = async () => {
  //   await supabase.auth.signOut();
  //   setUser(null); // Update user state after signing out
  // };

  async function signOut() {
    await supabase.auth.signOut() // Wait for this to complete
    setUser(null)
    navigate('/') // Only runs after sign-out is done
  }
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Zindex Logo" className="logo" />
          <Link to="/">Zindex</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {/* <Link to="/how-it-works">How It Works</Link> */}
          <a href="#how-it-works" onClick={scrollToFeature}>How It Works</a>
          <Link to="/login">My Notes</Link>
        </div>
        <div className="navbar-buttons">
        {user ? (
          <button className="btn btn-secondary" onClick={signOut}>Sign Out</button>
        ) : (
          <>
            {/* <button className="btn btn-primary">Upload Your Notes</button> */}
            <Link to="/login" className="btn btn-primary">Log in</Link>
            {/* <Link to="/login" className="btn btn-secondary">Sign up</Link> */}
          </>
        )}
        </div>
        <div className="navbar-menu">
          {toggleMenu
          ? <RiCloseLine color="#064E3B" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#064E3B" size={27} onClick={() => setToggleMenu(true)}  />
          }
          {
            toggleMenu && (
              <div className="navbar-menu-container scale-up-center">
                <div className="navbar-menu-container-links"> 
                  <Link to="/">Home</Link>
                  {/* <Link to="/how-it-works">How It Works</Link> */}
                  {/* <a href="#how-it-works" onClick={scrollToFeature}>How It Works</a> */}
                  <Link to="/login">My Notes</Link>
                </div>
                <div className="navbar-menu-container-buttons">
                  {/* <button className="btn btn-primary">Upload Your Notes</button> */}
                  <Link to="/login" className="btn btn-secondary">Log in</Link>
                  {/* <button>Sign up</button> */}
                </div>
              </div>
            )
          }
        </div>
      </nav>
    );
  };
