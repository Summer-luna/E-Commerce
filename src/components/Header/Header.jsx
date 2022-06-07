import './header.scss';

const Header = () => {
  return(
    <header>
      <img id="logo" src="/logo.png" alt="luna moon" />
      <input type="text" className='searchField' />
      <div className='home-text home-account'>Account</div>
      <div className='home-text home-cart'>Cart</div>
    </header>
  )
}

export default Header