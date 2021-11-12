# UI Cloner - Puppeteer
Clone web page and save assets locally

## Installation

  - Clone this repository
  - Open Terminal and run `cd path/to/ui-cloner-puppeteer`
  - Run `npm install`

## Usage

Run `node clone url={target url}`

Example : `node clone url=https://google.com`

## Arguments

  - `url` = Specify target url
  - `disable` = Exclude some asset type. Available value: `image`, `css`, `js`, `font`. For multiple type, separate with comma: `image,css,js`