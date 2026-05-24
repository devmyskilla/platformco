const $ = id => document.getElementById(id);
const detailLoading = $('detailLoading');
const detailWrapper = $('detailWrapper');
const langSwitcher = $('langSwitcher');

let currentPlatform = null;

function renderPlatform(p) {
  currentPlatform = p;
  const lang = currentLang;
  const existing = detailWrapper.querySelector('.detail-content');
  if (existing) existing.remove();

  detailLoading.style.display = 'none';

  const name = pf(p, 'name');
  const desc = pf(p, 'description');
  const plat = pf(p, 'platform');
  const cat = translateCat(p.category);
  const langVal = translateLang(p.language);
  const priceText = p.free ? getText('free') : getText('paid');
  const priceClass = p.free ? 'free-text' : 'paid-text';
  const certText = p.certificate ? getText('yes') : getText('no');
  const backLink = detailWrapper.querySelector('.back-link');

  const html = `
    <div class="detail-content">
      <div class="detail-header">
        ${p.thumbnail
          ? `<img class="detail-thumb" src="${p.thumbnail}" alt="${escapeHtml(name)}">`
          : `<div class="detail-thumb-placeholder">🌐</div>`
        }
        <div class="detail-info">
          <h1 class="detail-title">${escapeHtml(name)}</h1>
          <span class="detail-platform">${escapeHtml(plat)}</span>
          <p class="detail-description">${escapeHtml(desc)}</p>
        </div>
      </div>
      <div class="detail-meta-grid">
        <div class="meta-item">
          <span class="meta-label">${escapeHtml(i18n[lang].category)}</span>
          <span class="meta-value">${escapeHtml(cat)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">${escapeHtml(i18n[lang].language)}</span>
          <span class="meta-value">${escapeHtml(langVal)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">${escapeHtml(i18n[lang].price)}</span>
          <span class="meta-value ${priceClass}">${priceText}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">${escapeHtml(i18n[lang].certificate)}</span>
          <span class="meta-value">${certText}</span>
        </div>
      </div>
      <div class="detail-actions">
        ${p.link ? `<a class="btn-primary" href="${p.link}" target="_blank" rel="noopener">${escapeHtml(getText('visitPlatform'))}</a>` : ''}
      </div>
    </div>
  `;

  backLink.href = 'index.html?lang=' + currentLang;
  backLink.insertAdjacentHTML('afterend', html);
  document.title = name + ' - ' + getText('siteName');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function changeLang(lang) {
  setLang(lang);
  applyTranslations();
  var logoLink2 = document.querySelector('.logo-link');
  if (logoLink2) { logoLink2.href = 'index.html?lang=' + lang; }
  var backLink2 = document.querySelector('.back-link');
  if (backLink2) { backLink2.href = 'index.html?lang=' + lang; }
  if (currentPlatform) {
    renderPlatform(currentPlatform);
  }
}

if (langSwitcher) {
  langSwitcher.addEventListener('change', function() {
    changeLang(this.value);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var params = new URLSearchParams(window.location.search);
  var langParam = params.get('lang');
  if (langParam) { setLang(langParam); }
  setLang(currentLang);
  applyTranslations();
  if (langSwitcher) langSwitcher.value = currentLang;

  var backLink = document.querySelector('.back-link');
  if (backLink) { backLink.href = 'index.html?lang=' + currentLang; }
  var logoLink = document.querySelector('.logo-link');
  if (logoLink) { logoLink.href = 'index.html?lang=' + currentLang; }

  var platformId = params.get('id');

  if (!platformId) {
    detailLoading.style.display = 'none';
    detailLoading.textContent = '\u26a0\ufe0f ' + getText('platformNotFound');
    return;
  }

  try {
    var platform = null;
    for (var i = 0; i < PLATFORMS_DATA.length; i++) {
      if (PLATFORMS_DATA[i].id === platformId) {
        platform = PLATFORMS_DATA[i];
        break;
      }
    }

    if (!platform) {
      detailLoading.style.display = 'none';
      detailLoading.textContent = '\u26a0\ufe0f ' + getText('platformNotFound');
      return;
    }

    renderPlatform(platform);
  } catch (err) {
    detailLoading.style.display = 'none';
    detailLoading.textContent = '\u26a0\ufe0f ' + getText('errorLoading');
  }
});
