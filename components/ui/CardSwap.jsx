'use client';

import React, {
  Children, cloneElement, forwardRef, isValidElement,
  useEffect, useMemo, useRef,
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

// ── Card primitive ────────────────────────────────────────────────────────────
export const Card = forwardRef(({ customClass, className, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`card-swap-card ${customClass ?? ''} ${className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

// ── Slot math ─────────────────────────────────────────────────────────────────
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x, y: slot.y, z: slot.z,
    xPercent: -50, yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

// ── CardSwap ──────────────────────────────────────────────────────────────────
const CardSwap = ({
  width = 320,
  height = 220,
  cardDistance = 50,
  verticalDistance = 60,
  delay = 3500,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const cfg = easing === 'elastic'
    ? { ease: 'elastic.out(0.6,0.9)', durDrop: 1.6, durMove: 1.6, durReturn: 1.6, promoteOverlap: 0.9, returnDelay: 0.05 }
    : { ease: 'power1.inOut', durDrop: 0.7, durMove: 0.7, durReturn: 0.7, promoteOverlap: 0.45, returnDelay: 0.2 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs     = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  const order    = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef    = useRef(null);
  const intRef   = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, { y: '+=500', duration: cfg.durDrop, ease: cfg.ease });
      tl.addLabel('promote', `-=${cfg.durDrop * cfg.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el   = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, duration: cfg.durMove, ease: cfg.ease }, `promote+=${i * 0.12}`);
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel('return', `promote+=${cfg.durMove * cfg.returnDelay}`);
      tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: cfg.durReturn, ease: cfg.ease }, 'return');
      tl.call(() => { order.current = [...rest, front]; });
    };

    swap();
    intRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = containerRef.current;
      const pause  = () => { tlRef.current?.pause(); clearInterval(intRef.current); };
      const resume = () => { tlRef.current?.play(); intRef.current = window.setInterval(swap, delay); };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intRef.current);
      };
    }
    return () => clearInterval(intRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i, ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => { child.props.onClick?.(e); onCardClick?.(i); },
        })
      : child
  );

  return (
    <div ref={containerRef} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
