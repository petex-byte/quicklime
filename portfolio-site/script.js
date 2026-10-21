/* Red Pen & Pixel: the folio and the "catch it yourself" exercise.
   The scroll engine (scrollcraft.js) is untouched; everything bespoke lives here. */
(function () {
  'use strict';

  ScrollCraft.mount(document.body);

  // ---- folio: chapter title follows the chapter in the middle of the screen
  var folio = document.querySelector('.folio');
  var folioText = document.querySelector('[data-folio-text]');
  if (folio && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var t = e.target.getAttribute('data-folio');
        if (t === folioText.textContent) return;
        folio.classList.add('is-swapping');
        setTimeout(function () { folioText.textContent = t; folio.classList.remove('is-swapping'); }, 160);
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    document.querySelectorAll('[data-folio]').forEach(function (s) { io.observe(s); });
  }

  // ---- catch it yourself
  var box = document.querySelector('[data-catch]');
  if (!box) return;
  box.classList.add('is-live');

  var TOTAL = box.querySelectorAll('[data-note]').length;
  var caught = {};
  var you = 0;
  var revealed = false;
  var youEl = box.querySelector('[data-you]');
  var msgEl = box.querySelector('[data-msg]');
  var showBtn = box.querySelector('[data-show]');
  var CIRCLE = 'M50 3 C 80 2, 99 10, 97 22 C 95 35, 70 39, 46 38 C 20 37, 2 31, 3 19 C 4 8, 28 3, 56 5';

  function makeBtn(text, err) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'w';
    b.tabIndex = -1;
    b.textContent = text;
    if (err) b.setAttribute('data-err', err);
    return b;
  }

  // Turn every word of every clause into a button. A [data-err] span becomes
  // one button, so "may not" and "twenty thousand" are a single catch.
  box.querySelectorAll('.cl').forEach(function (cl) {
    Array.prototype.slice.call(cl.childNodes).forEach(function (node) {
      if (node.nodeType === 1 && node.hasAttribute('data-err')) {
        cl.replaceChild(makeBtn(node.textContent, node.getAttribute('data-err')), node);
        return;
      }
      if (node.nodeType !== 3) return;
      var frag = document.createDocumentFragment();
      node.textContent.split(/([ \t\n]+)/).forEach(function (part) {
        if (!part) return;
        if (/^[ \t\n]+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var m = part.match(/^([(]?)(.*?)([.,;:)]*)$/);
        if (m[1]) frag.appendChild(document.createTextNode(m[1]));
        if (m[2]) frag.appendChild(makeBtn(m[2]));
        if (m[3]) frag.appendChild(document.createTextNode(m[3]));
      });
      cl.replaceChild(frag, node);
    });
  });

  var words = Array.prototype.slice.call(box.querySelectorAll('.w'));
  words[0].tabIndex = 0;
  box.querySelector('.cl').setAttribute('aria-describedby', 'catch-help');
  var help = document.createElement('p');
  help.id = 'catch-help';
  help.hidden = true;
  help.textContent = 'Use the arrow keys to move between words and Enter to mark one.';
  box.appendChild(help);

  function circle(btn, shown) {
    if (btn.classList.contains('hit')) return;
    btn.classList.add('hit');
    if (shown) btn.classList.add('shown');
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 100 40');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', CIRCLE);
    p.setAttribute('pathLength', '1');
    svg.appendChild(p);
    btn.appendChild(svg);
    requestAnimationFrame(function () { requestAnimationFrame(function () { btn.classList.add('on'); }); });
  }

  function mark(err, shown) {
    caught[err] = true;
    box.querySelectorAll('.w[data-err="' + err + '"]').forEach(function (b) {
      circle(b, shown);
      b.setAttribute('aria-label', b.textContent + ', marked as a mistake');
    });
    box.querySelector('[data-pair="' + err + '"]').classList.add('is-caught');
  }

  function say(t) { msgEl.textContent = t; }

  box.addEventListener('click', function (e) {
    var b = e.target.closest('.w');
    if (!b) return;
    var err = b.getAttribute('data-err');
    if (err) {
      if (caught[err]) { say('Already caught. The note is in the margin.'); return; }
      mark(err, false);
      you++;
      youEl.textContent = you;
      if (you === TOTAL) { say('All four. You read like a proofreader.'); showBtn.disabled = true; }
      else say(you === 1 ? 'Caught one. Read the note, then keep going.' : 'Caught ' + you + '. ' + (TOTAL - you) + ' left.');
      return;
    }
    var old = b.querySelector('.tick');
    if (old) old.remove();
    var t = document.createElement('span');
    t.className = 'tick';
    t.setAttribute('aria-hidden', 'true');
    t.textContent = 'fine';
    b.appendChild(t);
    setTimeout(function () { t.remove(); }, 2300);
    say('"' + b.firstChild.textContent + '" matches in both versions. Keep looking.');
  });

  box.addEventListener('keydown', function (e) {
    var i = words.indexOf(document.activeElement);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = words[Math.min(words.length - 1, i + 1)];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = words[Math.max(0, i - 1)];
    else if (e.key === 'Home') next = words[0];
    else if (e.key === 'End') next = words[words.length - 1];
    if (!next) return;
    e.preventDefault();
    words[i].tabIndex = -1;
    next.tabIndex = 0;
    next.focus();
  });

  showBtn.addEventListener('click', function () {
    if (revealed) return;
    revealed = true;
    box.querySelectorAll('[data-note]').forEach(function (n) {
      var err = n.getAttribute('data-note');
      if (!caught[err]) mark(err, true);
    });
    showBtn.disabled = true;
    say(you === TOTAL ? 'All four.' : 'You caught ' + you + ' of ' + TOTAL + '. The dotted circles are the ones you missed.');
  });
})();

/* The email and screens chapters: width toggle and the checkout before/after. */
(function () {
  'use strict';
  function group(sel, attr, apply) {
    var g = document.querySelector(sel);
    if (!g) return;
    g.addEventListener('click', function (e) {
      var b = e.target.closest('button[' + attr + ']');
      if (!b) return;
      g.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      apply(b.getAttribute(attr));
    });
  }
  var frame = document.querySelector('[data-frame]');
  group('#email .made__toggle', 'data-width', function (w) { frame.setAttribute('style', '--w:' + w + 'px'); frame.closest('.made__grid').classList.toggle('is-wide', w === '600'); });

  var co = document.querySelector('.co');
  var cap = document.querySelector('[data-se-cap]');
  group('#screens .made__toggle', 'data-ver', function (v) {
    co.setAttribute('data-ver-state', v);
    cap.textContent = v === 'after'
      ? 'Same screen, fixed: a shorter photo and a Pay bar that stays on screen while you scroll.'
      : 'Demo screen at iPhone SE size, 320 by 568. The Pay button is below the edge.';
  });
})();
