async function loadLinks() {
  try {
    // JSONファイルを読み込む
    const response = await fetch('data/links.json');
    const links = await response.json();
    
    // 表示する場所を取得
    const container = document.getElementById('links-container');
    
    // 1個ずつカードを作って追加
    links.forEach(link => {
      const target = link.external ? 'target="_blank" rel="noopener"' : '';
      
      const html = `
        <a href="${link.url}" ${target} class="sns-link">
          <span class="sns-icon">${link.icon}</span>
          <div class="sns-text">
            <span class="sns-name">${link.name}</span>
            <span class="sns-handle">${link.handle}</span>
          </div>
        </a>
      `;
      
      container.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('リンク読み込み失敗:', error);
  }
}

async function loadWorks() {
  try {
    const response = await fetch('data/works.json');
    const works = await response.json();
    
    const container = document.getElementById('works-container');
    
    works.forEach(work => {
      // タグのHTMLを作る（配列をループ）
      const tagsHtml = work.tags
        .map(tag => `<span class="work-card-tag">${tag}</span>`)
        .join('');
      
      // バッジのクラス決定
      const badgeClass = work.badgeType === 'soon' ? 'work-card-badge soon' : 'work-card-badge';
      
      // カード本体
      const cardContent = `
        <div class="work-card-header">
          <span class="${badgeClass}">${work.badge}</span>
          <span class="work-card-icon">${work.icon}</span>
        </div>
        <div class="work-card-body">
          <h3 class="work-card-title">${work.title}</h3>
          <p class="work-card-desc">${work.description}</p>
          <div class="work-card-tags">${tagsHtml}</div>
        </div>
      `;
      
      // クリックできるかで <a> か <div> か変える
      let html;
      if (work.clickable) {
        html = `<a href="${work.url}" class="work-card">${cardContent}</a>`;
      } else {
        html = `<div class="work-card coming-soon">${cardContent}</div>`;
      }
      
      container.insertAdjacentHTML('beforeend', html);
    });
  } catch (error) {
    console.error('作品読み込み失敗:', error);
  }
}

// ページ読み込み後に実行
document.addEventListener('DOMContentLoaded', loadWorks);

document.addEventListener('DOMContentLoaded', loadLinks);