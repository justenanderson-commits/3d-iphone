import gsap from "gsap";

export const scrollAnimation = (position, target, onUpdate) => {
  const tl = gsap.timeline()

  tl.to(position, {
    scrollTrigger: {
      trigger: '.sound-section',
      start: 'top bottom',
      end: 'top'
    }
  })
}