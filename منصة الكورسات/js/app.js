let allPlatforms = [];
let filtersData = { languages: [], categories: [] };

const $ = id => document.getElementById(id);
const filterLang = $('filterLang');
const filterCategory = $('filterCategory');
const filterFree = $('filterFree');
const filterCert = $('filterCert');
const resetBtn = $('resetFilters');
const coursesGrid = $('coursesGrid');
const resultsCount = $('resultsCount');
const langSwitcher = $('langSwitcher');

function fetchFilters() {
  allPlatforms = PLATFORMS_DATA;

  const langs = new Set();
  const cats = new Set();

  allPlatforms.forEach(p => {
    if (p.language) langs.add(p.language);
    if (p.category) cats.add(p.category);
  });

  filtersData = {
    languages: [...langs].sort(),
    categories: [...cats].sort(),
  };

  populateSelect(filterLang, filtersData.languages, translateLang);
  populateSelect(filterCategory, filtersData.categories, translateCat);
}

function populateSelect(select, options, translateFn) {
  select.innerHTML = `<option value="">${getText('all')}</option>`;
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = translateFn ? translateFn(opt) : opt;
    select.appendChild(option);
  });
}

function fetchPlatforms() {
  let filtered = [...allPlatforms];

  if (filterLang.value) {
    filtered = filtered.filter(p => p.language === filterLang.value);
  }
  if (filterCategory.value) {
    filtered = filtered.filter(p => p.category === filterCategory.value);
  }
  if (filterFree.checked) {
    filtered = filtered.filter(p => p.free);
  }
  if (filterCert.checked) {
    filtered = filtered.filter(p => p.certificate);
  }

  renderPlatforms(filtered);
}

function renderPlatforms(platforms) {
  resultsCount.textContent = platforms.length;

  if (!platforms.length) {
    coursesGrid.innerHTML = `<div class="no-results">${getText('noResults')}</div>`;
    return;
  }

  coursesGrid.innerHTML = platforms.map(p => {
    const detailUrl = `course.html?id=${encodeURIComponent(p.id)}&lang=${currentLang}`;
    const name = pf(p, 'name');
    const desc = pf(p, 'description');
    const lang = translateLang(p.language);
    const cat = translateCat(p.category);
    return `
      <div class="course-card" onclick="window.location.href='${detailUrl}'">
        ${p.thumbnail
          ? `<img class="card-thumb" src="${p.thumbnail}" alt="${escapeHtml(name)}" loading="lazy">`
          : `<div class="card-thumb-placeholder">🌐</div>`
        }
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(name)}</h3>
          <p class="card-desc">${escapeHtml(desc)}</p>
          <div class="card-meta">
            <span class="tag">${escapeHtml(lang)}</span>
            <span class="tag ${p.free ? 'free' : 'paid'}">${p.free ? getText('free') : getText('paid')}</span>
            ${p.certificate ? `<span class="tag cert">${getText('withCertificate')}</span>` : ''}
          </div>
          <div class="card-footer">
            <span class="card-platform">${escapeHtml(cat)}</span>
            <a class="card-detail-link" href="${detailUrl}">${getText('details')}</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function resetFilters() {
  filterLang.value = '';
  filterCategory.value = '';
  filterFree.checked = false;
  filterCert.checked = false;
  fetchPlatforms();
}

function changeLang(lang) {
  setLang(lang);
  applyTranslations();
  var logoLink = document.querySelector('.logo-link');
  if (logoLink) { logoLink.href = 'index.html?lang=' + lang; }
  populateSelect(filterLang, filtersData.languages, translateLang);
  populateSelect(filterCategory, filtersData.categories, translateCat);
  fetchPlatforms();
}

filterLang.addEventListener('change', fetchPlatforms);
filterCategory.addEventListener('change', fetchPlatforms);
filterFree.addEventListener('change', fetchPlatforms);
filterCert.addEventListener('change', fetchPlatforms);
resetBtn.addEventListener('click', resetFilters);

if (langSwitcher) {
  langSwitcher.addEventListener('change', function() {
    changeLang(this.value);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    var p = new URLSearchParams(window.location.search);
    var lp = p.get('lang');
    if (lp) { setLang(lp); }
    setLang(currentLang);
    applyTranslations();
    if (langSwitcher) langSwitcher.value = currentLang;
    var logoLink = document.querySelector('.logo-link');
    if (logoLink) { logoLink.href = 'index.html?lang=' + currentLang; }
    fetchFilters();
    fetchPlatforms();
  } catch (err) {
    coursesGrid.innerHTML = `<div class="no-results">${getText('errorLoading')}</div>`;
  }
});
