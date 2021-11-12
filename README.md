# UI Cloner - Puppeteer
### Clone web page and save assets

## Installation

  - Clone this repository
  - Open Terminal and run `cd path/to/ui-cloner-puppeteer`
  - Run `npm install`

## Usage

Run `node clone.js url={target url}`

Example : `node clone.js url=https://google.com`

## Arguments

  - `url` = Specify target url
  - `disable` = Exclude resource type. Available value: `image`, `css`, `js`, `font`. For multiple type, separate with comma: `image,css,js`