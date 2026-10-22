// Shared step engine for the direct-mail digital twins.
// Page sets window.MAIL = { hints: [...], onStep(i) {} } before loading this file.
(function () {
  var M = window.MAIL || {}, hints = M.hints || [], N = hints.length;
  var st = document.getElementById('stage'), hint = document.getElementById('hint'),
      prev = document.getElementById('prev'), next = document.getElementById('next'), pos = document.getElementById('pos');
  var cur = 0, busy = false;
  var q = new URLSearchParams(location.search);
  if (q.has('share')) document.body.classList.add('share');
  function fit() {
    var w = st.offsetWidth, h = st.offsetHeight;
    var share = document.body.classList.contains('share');
    var s = share ? Math.min(innerWidth / (w + 30), innerHeight / (h + 10)) : Math.min(innerWidth / (w + 30), (innerHeight - 150) / h, 1.3);
    st.style.setProperty('--s', s);
  }
  addEventListener('resize', fit); fit();
  function show(i, fast) {
    cur = i; document.body.dataset.step = i;
    document.body.classList.toggle('done', i === N - 1);
    if (hint) hint.textContent = hints[i] || '';
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === N - 1;
    if (pos) pos.textContent = (i + 1) + ' / ' + N;
    if (M.onStep) M.onStep(i, fast);
  }
  function go(d) {
    if (busy) return; var n = cur + d; if (n < 0 || n > N - 1) return;
    busy = true; show(n); setTimeout(function () { busy = false; }, 650);
  }
  window.MAIL.go = go; window.MAIL.show = show;
  if (next) next.onclick = function () { go(1); };
  if (prev) prev.onclick = function () { go(-1); };
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-next]'); if (!t || e.target.closest('a')) return;
    if (+t.dataset.next === cur) go(1);
  });
  addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });
  var s0 = Math.min(N - 1, +q.get('s') || 0);
  if (s0) document.body.classList.add('fast');
  show(s0, true);
  if (s0) setTimeout(function () { document.body.classList.remove('fast'); }, 50);
})();
