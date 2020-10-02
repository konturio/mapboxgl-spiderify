import { SpiderifyOptions, SpiderElement, Spider } from '../types';

function el(query: string, options = {}, children?: any) {
  const [tag, ...classes] = query.split('.');
  const element = document.createElement(tag);
  element.className = classes.join(' ');
  Object.entries(options).forEach(([key, val]) => {
    if (key === 'style') {
      //@ts-ignore
      Object.entries(val).forEach(([stl, stlVal]) => {
        //@ts-ignore
        element.style[stl] = stlVal;
      });
    } else {
      //@ts-ignore
      element[key] = val
    }
  });

  if (children) {
    const childrenSet = Array.isArray(children)
      ? children
      : [children]
     
    childrenSet.forEach(child => typeof children !== 'string'
      ? element.appendChild(child)
      : element.innerHTML = element.innerHTML === undefined ? child : element.innerHTML + child
     )
  }

  return element;
}

// TODO: Add support for styling options
// TODO: Add event listener options.onClick
export function generateSpiderElement(
  { legs, position, onClick }: Spider,
  options: SpiderifyOptions
): SpiderElement {
  const wrapper = el('div.spider-wrapper', { }, legs.map((leg, i) => (
    el(
      'div.spider-leg',
      { style: { transform: `rotate(${(360 / legs.length) * i}deg)`} },
      el('div.spider-slot', { style: { transform: `rotate(-${(360 / legs.length) * i}deg)`}, id: leg.id }, String(leg.value))
    )
  )));
  if (typeof onClick === 'function') {
    wrapper.addEventListener('click', (e) => {
      const target: Element = e.target as Element;
      if (target.classList.contains('spider-slot')) {
        const selectedLeg = legs.find(leg => leg.id === target.id);
        if (selectedLeg) onClick(e, selectedLeg);
      }
    }, false);
  }
  return { element: wrapper, position };
}