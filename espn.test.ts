import { afterEach, describe, expect, it } from 'vitest'
import { parserLoader, resetPage, visit } from '#scraper-test'

// The parser, evaluated with the helpers it is injected with, as a scrape runs it.
const load = parserLoader(__dirname)

afterEach(resetPage)

describe('news fronts', () => {
  it.each([
    ['espn.js', 'parseESPN', 'https://www.espn.com/', '<a href="/nba/story/_/id/1/a">A</a><a href="/nba/">NBA</a>', ['https://www.espn.com/nba/story/_/id/1/a']],
  ])('%s reads a front as a listing of its stories', async (file, parser, url, body, listed) => {
    visit(url, body)
    const parsed = await load(file, [parser])[parser]()
    expect(parsed.listing).toBe(true)
    expect(parsed.links.map((link: any) => link.url)).toEqual(listed)
  })
})
