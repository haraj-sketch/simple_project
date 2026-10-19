/* script.js (portfolio)
   - Theme button: switches light/dark.
   - Project rows: click to open/close.
   - Filter buttons: show only projects whose data-c matches. */
(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  function cur(){return root.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}
  function label(){btn.textContent=cur()==='dark'?'Light mode':'Dark mode'}
  var tm=0;
  btn.onclick=function(){
    if(!matchMedia('(prefers-reduced-motion:reduce)').matches){root.classList.add('theming');clearTimeout(tm);tm=setTimeout(function(){root.classList.remove('theming')},1000)}
    root.dataset.theme=cur()==='dark'?'light':'dark';label();
  };
  label();
  document.querySelectorAll('.row').forEach(function(r){
    r.onclick=function(){var o=r.parentNode.classList.toggle('open');r.setAttribute('aria-expanded',o)}
  });
  var fs=document.querySelectorAll('.f');
  fs.forEach(function(f){
    f.onclick=function(){
      fs.forEach(function(x){x.classList.toggle('on',x===f)});
      var k=f.dataset.f;
      var n=0;
      document.querySelectorAll('.work li').forEach(function(li){
        li.hidden=k!=='all'&&li.dataset.c!==k;
        li.classList.remove('enter');
        if(!li.hidden){void li.offsetWidth;li.style.animationDelay=(n++*90)+'ms';li.classList.add('enter')}
      });
    }
  });
})();