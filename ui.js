export function getHistoryDisplay(history){
  const historyLines = history.split('>');
  
  const htmlDisplay = document.createElement('p');
  for (let l of historyLines){
    htmlDisplay.innerHTML += `${l} <<br>`  
  }
  console.log('History:', historyLines)
  return htmlDisplay.innerHTML;
}

export function toggleTheme(root, theme){
  root.style.setProperty('--dashboard', `var(--${theme}-dashboard)`);
  root.style.setProperty('--side-menu', `var(--${theme}-side-menu)`);
  root.style.setProperty('--header', `var(--${theme}-header)`);
  root.style.setProperty('--header-text', `var(--${theme}-header-text)`);
  root.style.setProperty('--calculator-key', `var(--${theme}-calculator-key)`);
  root.style.setProperty('--calculator-display', `var(--${theme}-calculator-display)`);
  root.style.setProperty('--calculator-display-text', `var(--${theme}-calculator-display-text)`);
  root.style.setProperty('--calculator-key-accent', `var(--${theme}-calculator-key-accent)`);
}

export function setMobileHeight(){
  let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
}