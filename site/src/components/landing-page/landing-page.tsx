import NavigationBar from '../nav-bar/nav-bar';
import styles from './landing-page.module.css';

function LandingPage() {
  return (
    <>
      <NavigationBar/>
      <div className={styles.wrapper}>
    
          <p>Here is some text</p>
          <a href="/test">Open test page</a>
      </div>
    </>
  );
}

export default LandingPage;
