# Mermaid for Blocknote

![Stability Badge](https://img.shields.io/badge/stability-stable-green.svg)
![](https://badgen.net/badge/Version/v1.0.0/blue)

Comments feature for [Blocknote](https://www.blocknotejs.org/).

![](assets/demo.gif)

## Demo

[A demo is worth a thousand words](https://codesandbox.io/p/sandbox/blocknote-mermaid-dyh5d5?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clv4ft0ng00062v6dtzhqi3ha%2522%252C%2522sizes%2522%253A%255B100%252C0%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clv4ft0ng00022v6ddbczzsx2%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clv4ft0ng00032v6dd8el7rvw%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clv4ft0ng00052v6dc0zbxpse%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clv4ft0ng00022v6ddbczzsx2%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clv4ft0ng00012v6d7pczhoqa%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Findex.js%2522%257D%255D%252C%2522id%2522%253A%2522clv4ft0ng00022v6ddbczzsx2%2522%252C%2522activeTabId%2522%253A%2522clv4ft0ng00012v6d7pczhoqa%2522%257D%252C%2522clv4ft0ng00052v6dc0zbxpse%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clv4ft0ng00042v6deolyf8rw%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clv4ft0ng00052v6dc0zbxpse%2522%252C%2522activeTabId%2522%253A%2522clv4ft0ng00042v6deolyf8rw%2522%257D%252C%2522clv4ft0ng00032v6dd8el7rvw%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clv4ft0ng00032v6dd8el7rvw%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Afalse%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

## Installation

### Install via YARN

Get the package

```shell
$ yarn add @defensestation/blocknote-mermaid
```



## Usage

Include module at your application

```javascript
import { MermaidBlock, insertMermaid } from "@defensestation/blocknote-mermaid";
```

Create schema with mermaid block.
```javascript
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    mermaid: MermaidBlock,
  },
});
```

Add slash menu item.
```javascript
<BlockNoteView
    editor={editor}
    slashMenu={false}
  >
    <SuggestionMenuController
      triggerCharacter={"/"}
      getItems={async (query) =>
        filterSuggestionItems(
          [...getDefaultReactSlashMenuItems(editor), insertMermaid()],
          query
        )
      }
    />
  </BlockNoteView>
```

## Roadmap

- [ ] Custom styles
- [ ] Chart viewer in read only mode.


