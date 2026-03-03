export function ThemeInitScript() {
  const script = `(function(){try{var t=localStorage.getItem('scificn-theme');if(t&&t!=='sci-fi')document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
