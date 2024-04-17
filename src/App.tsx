import "./App.css";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems } from "@blocknote/core";
import { MermaidBlock, insertMermaid } from "../lib/MermaidBlock";


const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    mermaid: MermaidBlock,
  },
});


const App = (props: React.PropsWithChildren) => {
  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: [
      {
          "id": "f98e261b-4bad-47f1-82df-898c117161c7",
          "type": "mermaid",
          "props": {
              "data": "mindmap\n      root((mindmap))\n        Origins\n          Long history\n          ::icon(fa fa-book)\n          Popularisation\n            British popular psychology author Tony Buzan\n        Research\n          On effectivness<br/>and features\n          On Automatic creation\n            Uses\n                Creative techniques\n                Strategic planning\n                Argument mapping\n        Tools\n          Pen and paper\n          Mermaid",
              "dimensions": {
                  "width": 886,
                  "height": 430
              }
          },
          "children": []
      },
      {
          "id": "71867b03-7c3b-49fb-a95e-1452910e7a1d",
          "type": "paragraph",
          "props": {
              "textColor": "default",
              "backgroundColor": "default",
              "textAlignment": "left"
          },
          "content": [
              {
                  "type": "text",
                  "text": "asd",
                  "styles": {}
              }
          ],
          "children": []
      },
      {
          "id": "97e438fc-0bcd-414f-a049-a6b8faf45b22",
          "type": "paragraph",
          "props": {
              "textColor": "default",
              "backgroundColor": "default",
              "textAlignment": "left"
          },
          "content": [],
          "children": []
      }
  ]
  });

  return (
    <BlockNoteView
      // onChange={() => console.log(editor.document)}
      theme={"light"}
      // editable={false}
      editor={editor}
      slashMenu={false}
    >
      {/* @ts-ignore */}
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          // Gets all default slash menu items and `insertAlert` item.
          filterSuggestionItems(
            [...getDefaultReactSlashMenuItems(editor), insertMermaid()],
            query
          )
        }
      />
    </BlockNoteView>
  );
};


export default App