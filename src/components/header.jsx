import React, { Component } from 'react';

class Header extends Component {
    state = {  } 
    render() { 
        return <div className='header'>
                  <div className='header-left'>
                    <img className='logo-img' src='./assets/images/tridimo-logo.png'/>
                    <h1 className='h1-grey'>Meine Termine</h1>
                  </div>

                  <div>
                    <h1 className='user-name'>Alexander Gulentz</h1>
                  </div>
               </div>;
    }
}
 
export default Header;