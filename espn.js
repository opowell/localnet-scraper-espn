// A story (/nba/story/_/id/50473732/…) reads as its headline and the paragraphs, headings, lists and pictures of its
// body (.article-body), without its byline and the boxes beside it, headed by its authors and time. Any other page (the
// home page, a sport's page) is a listing of each story it links to.
function parseESPN(_profileId) {
  if (!/(?:^|\.)espn\.com$/.test(location.hostname)) {
    return null
  }
  return newsPage({
    body: '.article-body',
    title: '.article-header h1, article header h1',
    skip: '.article-meta, aside, .content-reactions, .inline-track, .video-play-button, .ad-wrapper',
    listed: /^https:\/\/www\.espn\.com\/(?:[a-z-]+\/)*story\/_\/(?:id|page)\//,
    article: /\/story\/_\//.test(location.pathname),
  })
}

// The parser a scrape calls.
registerParser(parseESPN)
