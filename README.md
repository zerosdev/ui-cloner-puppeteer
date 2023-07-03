# UI Cloner - Puppeteer
Clone web page and save assets locally

## Installation

  - Clone or download this repository
  - Open Terminal and run `cd path/to/ui-cloner-puppeteer`
  - Run `npm install`

## Usage

Run `node clone url={target url}`

Example : `node clone url=https://google.com`

## Arguments

  - `url={target url}` = Specify target url
  - `disable={asset types}` = Exclude some asset type. Available value: `image`, `css`, `js`, `font`. For multiple type, separate with comma: `image,css,js`
  - `--no-progress` = Hide progress

## Disclaimer

This software is provided as is for educational purposes. No warranty or responsibility for any kind of misuse of this software
