import React, { useState, Suspense, lazy, useEffect } from 'react';
import Navbar from './components/NavigationHero';
import './styles/global.css'

const Hero1 = lazy(() => import('./components/HeroSection/Hero1'));
const Hero2 = lazy(() => import('./components/HeroSection/Hero2'));
const Hero3 = lazy(() => import('./components/HeroSection/Hero3'));
const Hero4 = lazy(() => import('./components/HeroSection/Hero4'));
const Hero5 = lazy(() => import('./components/HeroSection/Hero5'));
const Hero6 = lazy(() => import('./components/HeroSection/Hero6'));
const Hero7 = lazy(() => import('./components/HeroSection/Hero7'));
const Hero8 = lazy(() => import('./components/HeroSection/Hero8'));

const isMobileScreen = () => window.innerWidth < 768; 

function HeroDisplayer() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [heroes, setHeroes] = useState([Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7, Hero8]);

  useEffect(() => {
    const updateHeroesForScreenSize = () => {
      if (isMobileScreen()) {
        //Quel Hero on affiche sur mobile
        setHeroes([Hero1, Hero2, Hero4, Hero5, Hero6, Hero8]);
      } else {
        //Quel Hero on affiche sur Desktop
        setHeroes([Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7, Hero8]);
      }
    };

    updateHeroesForScreenSize();
    window.addEventListener('resize', updateHeroesForScreenSize);

    //Clean Up
    return () => {
      window.removeEventListener('resize', updateHeroesForScreenSize);
    };
  }, []);

  const goToNextHero = () => {
    setCurrentHeroIndex((index) => (index + 1) % heroes.length);
  };

  const goToPreviousHero = () => {
    setCurrentHeroIndex((index) => (index - 1 + heroes.length) % heroes.length);
  };

  const CurrentHero = heroes[currentHeroIndex];

  return (
    <div>
      <Navbar onPreviousClick={goToPreviousHero} onNextClick={goToNextHero} />
      <Suspense fallback={
        <div className='loading-container'>
          <img src={`Loading.png`} alt="Loading" className='loading-image'/>
        </div>
      }>
        <CurrentHero />
      </Suspense>
    </div>
  );
}

export default HeroDisplayer;
