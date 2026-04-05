# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-04-05

### Added

- Initial Tampermonkey script: [WXReadingGetCover.js](WXReadingGetCover.js)
- Auto-inject copy button at the bottom-right of the WeRead cover image
- Copy cover image `src` to clipboard on button click
- Support WeRead routes:
  - `https://weread.qq.com/web/bookDetail/*`
  - `https://weread.qq.com/web/reader/*`
- Support multiple cover XPaths (book detail + reader)
- Fallback copy strategy when `navigator.clipboard` is unavailable
- Initial repository docs and license (`README.md`, `LICENSE`, `.gitignore`)
