import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
  const fadeInUp = (element, delay = 0) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );
  };

  const staggerFadeInUp = (elements, stagger = 0.2) => {
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger,
        ease: 'power3.out',
      }
    );
  };

  const scaleIn = (element, delay = 0) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );
  };

  const slideInLeft = (element, delay = 0) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );
  };

  const slideInRight = (element, delay = 0) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );
  };

  const scrollAnimation = (element, animation = 'fadeInUp') => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        switch (animation) {
          case 'fadeInUp':
            fadeInUp(element);
            break;
          case 'scaleIn':
            scaleIn(element);
            break;
          case 'slideInLeft':
            slideInLeft(element);
            break;
          case 'slideInRight':
            slideInRight(element);
            break;
          default:
            fadeInUp(element);
        }
      },
    });
  };

  return {
    fadeInUp,
    staggerFadeInUp,
    scaleIn,
    slideInLeft,
    slideInRight,
    scrollAnimation,
  };
}; 