/**
 * js/portfolio.js - исправленная версия
 * - стабильный "Ещё/Скрыть" (не удаляем и не клонируем узлы, просто скрываем/показываем существующие span)
 * - "+N" для тэгов (корректный показ/скрытие)
 * - фильтры и пересчёт при ресайзе
 */

(function () {
  'use strict';

  const MOBILE_BP = 700;
  const DESKTOP_SENTENCES = 2;
  const MOBILE_SENTENCES = 1;
  const RESIZE_DEBOUNCE = 140;

  /* ---------- Утилиты ---------- */
  function splitSentences(text) {
    if (!text) return [''];
    const re = /[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g;
    const matches = text.match(re);
    return matches ? matches.map(s => s.trim()) : [text.trim()];
  }

  function debounce(fn, ms) {
    let t = null;
    return function (...args) {
      if (t) clearTimeout(t);
      t = setTimeout(() => { fn(...args); t = null; }, ms);
    };
  }

  /* ---------- Нормализация карточки (перемещаем узлы) ---------- */
  function normalizeCardDOM(item) {
    // Ищем узлы
    const h3 = item.querySelector('h3');
    const image = item.querySelector('.portfolio-image');
    let p = item.querySelector('.portfolio-desc-block p');
    if (!p) p = item.querySelector('.portfolio-content p') || null;
    const bottom = item.querySelector('.portfolio-bottom-row');

    // Создаём или используем headerWrap
    let headerWrap = item.querySelector('.portfolio-title-block');
    if (!headerWrap) {
      headerWrap = document.createElement('div');
      headerWrap.className = 'portfolio-title-block';
    }

    if (h3) {
      headerWrap.innerHTML = '';
      headerWrap.appendChild(h3); // перемещает h3 в headerWrap
    }

    // descWrap
    let descWrap = item.querySelector('.portfolio-desc-block');
    if (!descWrap) {
      descWrap = document.createElement('div');
      descWrap.className = 'portfolio-desc-block';
    }
    if (p) {
      descWrap.appendChild(p); // переместит p
    }

    const frag = document.createDocumentFragment();
    if (headerWrap && headerWrap.children.length) frag.appendChild(headerWrap);
    if (image) frag.appendChild(image);
    if (descWrap && descWrap.children.length) frag.appendChild(descWrap);
    if (bottom) frag.appendChild(bottom);

    item.innerHTML = '';
    item.appendChild(frag);
  }

  function normalizeAllCards() {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => normalizeCardDOM(item));
  }

  /* ---------- Превью/Toggle (надежно) ---------- */
  function setupPreviewStructure(item, sentencesToShow) {
    const p = item.querySelector('.portfolio-desc-block p');
    if (!p) return;

    if (!p.dataset.fullText) p.dataset.fullText = p.textContent.trim();
    const full = p.dataset.fullText;

    // если уже инициализировано (есть элемент .preview), не пересоздавать структуру, только обновить тексты
    const existingPreview = p.querySelector('.preview');
    if (existingPreview) {
      // обновим содержимое в случае изменения размера (кол-во предложений)
      const sentences = splitSentences(full);
      if (sentences.length <= sentencesToShow) {
        p.innerHTML = ''; // покажем весь текст, удалим кнопку
        const spanFull = document.createElement('span');
        spanFull.className = 'fulltext';
        spanFull.textContent = full;
        p.appendChild(spanFull);
        const btn = item.querySelector('.desc-toggle');
        if (btn) btn.remove();
        item.classList.remove('expanded');
        item.dataset.expanded = 'false';
      } else {
        // перестроим preview/full для текущего sentencesToShow, но сохраним кнопку
        const previewText = sentences.slice(0, sentencesToShow).join(' ');
        const restText = sentences.slice(sentencesToShow).join(' ').trim();
        existingPreview.textContent = previewText;
        const ell = p.querySelector('.ellipsis') || document.createElement('span');
        ell.className = 'ellipsis';
        ell.textContent = '…';
        const fullSpan = p.querySelector('.fulltext') || document.createElement('span');
        fullSpan.className = 'fulltext';
        fullSpan.style.display = 'none';
        fullSpan.textContent = ' ' + restText;

        // rebuild p inner if necessary
        p.innerHTML = '';
        p.appendChild(existingPreview);
        p.appendChild(ell);
        p.appendChild(fullSpan);

        // if expanded was true, keep expanded state
        if (item.classList.contains('expanded')) {
          p.querySelector('.preview').style.display = 'none';
          p.querySelector('.ellipsis').style.display = 'none';
          p.querySelector('.fulltext').style.display = '';
        }
      }
      return;
    }

    // initial create
    const sentences = splitSentences(full);
    if (sentences.length <= sentencesToShow) {
      p.innerHTML = '';
      const spanFull = document.createElement('span');
      spanFull.className = 'fulltext';
      spanFull.textContent = full;
      p.appendChild(spanFull);
      item.classList.remove('expanded');
      item.dataset.expanded = 'false';
      return;
    }

    const previewText = sentences.slice(0, sentencesToShow).join(' ');
    const restText = sentences.slice(sentencesToShow).join(' ').trim();

    const previewSpan = document.createElement('span');
    previewSpan.className = 'preview';
    previewSpan.textContent = previewText;

    const ell = document.createElement('span');
    ell.className = 'ellipsis';
    ell.textContent = '…';

    const fullSpan = document.createElement('span');
    fullSpan.className = 'fulltext';
    fullSpan.style.display = 'none';
    fullSpan.textContent = ' ' + restText;

    p.innerHTML = '';
    p.appendChild(previewSpan);
    p.appendChild(ell);
    p.appendChild(fullSpan);

    // create button if not exists
    let btn = item.querySelector('.desc-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'desc-toggle';
      btn.textContent = 'Ещё';
      btn.setAttribute('aria-expanded', 'false');
      item.querySelector('.portfolio-desc-block').appendChild(btn);

      btn.addEventListener('click', function () {
        const expanded = item.classList.toggle('expanded');
        const pLocal = item.querySelector('.portfolio-desc-block p');
        if (expanded) {
          // показать полный: скрываем preview/ellipsis, показываем fulltext
          const previewEl = pLocal.querySelector('.preview');
          const ellEl = pLocal.querySelector('.ellipsis');
          const fullEl = pLocal.querySelector('.fulltext');
          if (previewEl) previewEl.style.display = 'none';
          if (ellEl) ellEl.style.display = 'none';
          if (fullEl) fullEl.style.display = '';
          btn.textContent = 'Скрыть';
          btn.setAttribute('aria-expanded', 'true');
          item.dataset.expanded = 'true';
        } else {
          // свернуть: показать preview, скрыть fulltext
          const previewEl = pLocal.querySelector('.preview');
          const ellEl = pLocal.querySelector('.ellipsis');
          const fullEl = pLocal.querySelector('.fulltext');
          if (previewEl) previewEl.style.display = '';
          if (ellEl) ellEl.style.display = '';
          if (fullEl) fullEl.style.display = 'none';
          btn.textContent = 'Ещё';
          btn.setAttribute('aria-expanded', 'false');
          item.dataset.expanded = 'false';
        }
      });
    } else {
      // ensure initial state
      btn.textContent = 'Ещё';
      btn.setAttribute('aria-expanded', 'false');
    }
    item.dataset.expanded = 'false';
  }

  function prepareAllPreviews() {
    const items = document.querySelectorAll('.portfolio-item');
    const isMobile = window.innerWidth <= MOBILE_BP;
    const sentences = isMobile ? MOBILE_SENTENCES : DESKTOP_SENTENCES;
    items.forEach(item => setupPreviewStructure(item, sentencesToShow = sentences));
  }

  /* ---------- Хэштеги +N ---------- */
  function collapseTagsInItem(item) {
    const tech = item.querySelector('.portfolio-tech');
    if (!tech) return;

    // удалить старую кнопу, показать все
    const oldMore = tech.querySelector('.tech-more');
    if (oldMore) oldMore.remove();

    const tags = Array.from(tech.querySelectorAll('.tech-tag'));
    if (!tags.length) return;

    tags.forEach(t => t.style.display = 'inline-flex');

    // вычислить доступную ширину
    const containerWidth = tech.clientWidth;
    const parent = item;
    const rightNode = parent ? parent.querySelector('.portfolio-links') : null;
    const rightWidth = rightNode ? Math.ceil(rightNode.getBoundingClientRect().width) + 8 : 0;
    const available = Math.max(0, containerWidth - rightWidth - 6);

    let sum = 0, visibleCount = 0;
    for (const t of tags) {
      const w = Math.ceil(t.getBoundingClientRect().width) + 8;
      if (sum + w <= available || visibleCount === 0) {
        sum += w; visibleCount++;
      } else break;
    }

    if (visibleCount >= tags.length) return; // все помещаются

    const hidden = tags.slice(visibleCount);
    hidden.forEach(h => h.style.display = 'none');

    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'tech-more';
    more.textContent = `+${hidden.length}`;
    more.setAttribute('aria-expanded', 'false');

    more.addEventListener('click', () => {
      const open = more.getAttribute('aria-expanded') === 'true';
      if (!open) {
        hidden.forEach(h => h.style.display = 'inline-flex');
        more.textContent = 'Скрыть';
        more.setAttribute('aria-expanded', 'true');
      } else {
        hidden.forEach(h => h.style.display = 'none');
        more.textContent = `+${hidden.length}`;
        more.setAttribute('aria-expanded', 'false');
      }
    });

    tech.appendChild(more);
  }

  function collapseAllTags() {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => collapseTagsInItem(item));
  }

  /* ---------- Фильтры ---------- */
  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    if (!buttons.length) return;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        const f = (btn.dataset.filter || 'all').toLowerCase();
        applyFilter(f);
      });
      btn.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); btn.click(); } });
    });
  }

  function applyFilter(filter) {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
      if (filter === 'all') { item.hidden = false; item.setAttribute('aria-hidden', 'false'); return; }
      const cats = (item.dataset.category || '').toLowerCase();
      const list = cats.split(/[\s,]+/).filter(Boolean);
      const show = list.includes(filter);
      item.hidden = !show;
      item.setAttribute('aria-hidden', item.hidden ? 'true' : 'false');
    });
  }

  /* ---------- Инициализация ---------- */
  function initAll() {
    normalizeAllCards();
    prepareAllPreviews();
    collapseAllTags();
    initFilters();

    const recompute = debounce(() => {
      // сохранение открытых карточек
      const openItems = Array.from(document.querySelectorAll('.portfolio-item.expanded'));
      normalizeAllCards();
      prepareAllPreviews();
      collapseAllTags();
      // вернуть открытые
      openItems.forEach(it => {
        const p = it.querySelector('.portfolio-desc-block p');
        if (p && p.dataset && p.dataset.fullText) {
          const btn = it.querySelector('.desc-toggle');
          if (btn) {
            it.classList.add('expanded');
            btn.textContent = 'Скрыть';
            btn.setAttribute('aria-expanded', 'true');
            const previewEl = p.querySelector('.preview');
            const ellEl = p.querySelector('.ellipsis');
            const fullEl = p.querySelector('.fulltext');
            if (previewEl) previewEl.style.display = 'none';
            if (ellEl) ellEl.style.display = 'none';
            if (fullEl) fullEl.style.display = '';
          }
        }
      });
    }, RESIZE_DEBOUNCE);

    window.addEventListener('resize', recompute);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else initAll();

})();
