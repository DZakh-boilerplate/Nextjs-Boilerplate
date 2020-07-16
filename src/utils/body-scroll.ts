import forEach from 'lodash/forEach';

export const getScrollbarWidth: () => number = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

// Запоминаем ширину скрола для функции allowScroll
let scrollbarWidth = 0;
let overflowPropBefore: string | null = null;

/**
 * @description Если элемент владеет свойством rigth, меняем его на коэффициент
 * @param  {element} el
 * @param  {number} coefficient
 */
const adjustRightProp: (el: HTMLElement, coefficient: number) => void = (el, coefficient) => {
  const rightProp = Number.parseFloat(el.style.right);

  if (!rightProp) {
    return;
  }

  el.style.setProperty('right', `${rightProp + coefficient}px`);
};

/**
 * @description Функция, что предотвращает скролл
 * и корректирует положение фиксированных элементов, чтобы избежать скачка.
 * @param  {element[]} fixedEls Массив элементов с position: fixed
 */
export const preventScroll: (fixedEls?: HTMLElement[]) => void = (fixedEls) => {
  scrollbarWidth = getScrollbarWidth();

  overflowPropBefore = document.body.style.getPropertyValue('overflow');
  document.body.style.setProperty('overflow', 'hidden');

  if (!scrollbarWidth) {
    return;
  }

  document.documentElement.style.setProperty('margin-right', `${scrollbarWidth}px`);

  forEach(fixedEls, (el) => {
    adjustRightProp(el, scrollbarWidth);
  });
};

/**
 * @description Возвращает возможность скролить, а также корректирует
 * положение фиксированных элементов, измененное preventScroll
 * @param  {element[]} fixedEls Массив элементов с position: fixed
 */
export const allowScroll: (fixedEls?: HTMLElement[]) => void = (fixedEls) => {
  if (overflowPropBefore) {
    document.body.style.setProperty('overflow', overflowPropBefore);
    overflowPropBefore = null;
  } else {
    document.body.style.removeProperty('overflow');
  }

  if (!scrollbarWidth) {
    return;
  }

  document.documentElement.style.removeProperty('margin-right');

  forEach(fixedEls, (el) => {
    adjustRightProp(el, -scrollbarWidth);
  });
};