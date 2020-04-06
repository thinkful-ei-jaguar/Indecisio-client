import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service'
import UserContext from '../contexts/UserContext'
import './NavBar.css';


class NavBar extends Component {
   static contextType = UserContext

   handleLogout = () => {
      this.context.processLogout()
    }

   renderPrivateNav = () => {
      return <>
       
               <li><Link className='nav-link' to='/dashboard'>Home</Link></li>
               <li><Link className='nav-link' to='/top-activities'>Top Activities</Link></li>
               <li><Link className='nav-link' to='/add-activity'>Add</Link></li>
               <li><Link className='nav-link' to='/login' onClick={this.handleLogout}>Logout</Link></li>
            
            </>
   }

   renderPublicNav = () => {
      return <>
                              <li><Link className='nav-link' to='/top-activities'>Top Activities</Link></li>
               <li><Link className='nav-link' to='/login'>Login</Link></li>
               <li><Link className='nav-link' to='/'>Register</Link></li>
            </>
   }

   render() {
   return (
      <section className="NavBar">
         
         <ul id='navlist'>
            {TokenService.hasAuthToken()
               ? this.renderPrivateNav()
               : this.renderPublicNav()}
         </ul>
        
      </section>
   )
   }
}
export default NavBar;