import { createReactBlockSpec } from "@blocknote/react";
import {
  BlockNoteEditor,
  insertOrUpdateBlock,
  BlockFromConfig,
  CustomBlockConfig,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import Mermaid from "./Mermaid";
import { MdNote } from "react-icons/md";
import ReactCodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { MERMAID_EXAMPLES } from "./example";
import { useEffect, useMemo, useRef } from "react";
import Accordion from "./components/accordion";
// import { useMermaid } from "../../context/mermaid-context";

const TYPE = "mermaid";

type Dimensions = {
  width: number | string;
  height: number | string;
};

export const MermaidBlock = createReactBlockSpec(
  {
    type: TYPE,
    propSchema: {
      //@ts-ignore
      data: "",
      dimensions: {
        //@ts-ignore
        width: "400px",
        height: "auto",
      },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const isReadOnly = useMemo(() => !editor.isEditable, [editor]);
      const { data, dimensions } = block?.props;
      const blockRef =
        useRef<
          BlockFromConfig<CustomBlockConfig, InlineContentSchema, StyleSchema>
        >();
      blockRef.current = block;
      const onInputChange = (val: string) => {
        editor.updateBlock(block, {
          //@ts-ignore
          props: { ...block.props, data: val, dimensions },
        });
      };

      useEffect(() => {}, [editor]);

      const onDimensionsChange = (dimensions: Dimensions) => {
        editor.updateBlock(block, {
          props: {
            //@ts-ignore
            ...blockRef.current?.props,
            //@ts-ignore
            data: blockRef.current?.props?.data,
            //@ts-ignore
            dimensions: dimensions,
          },
        });
      };


      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            borderColor: "#adb5bd",
            padding: "10px",
            borderWidth: !isReadOnly ? "1px" : "0px",
            borderRadius: "5px",
            alignItems: "center",
          }}
        >
          {!isReadOnly && (
            <Accordion title="Examples">
              <div
                style={{
                  display: "grid",
                  gridGap: "0.5rem",
                  gridTemplateColumns: "repeat(6, minmax(0px, 1fr))",
                }}
              >
                {MERMAID_EXAMPLES?.map((example) => (
                  <button
                    key={example.name}
                    onClick={() => onInputChange(example.code)}
                  >
                    {example.name}
                  </button>
                ))}
              </div>
            </Accordion>
          )}
          {!isReadOnly && (
            <ReactCodeMirror
              placeholder={"Write your mermaid code here..."}
              style={{ width: "100%", resize: "vertical" }}
              extensions={[langs.mermaid()]}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                syntaxHighlighting: true,
              }}
              theme={"dark"}
              value={data}
              width="100%"
              height="200px"
              onChange={onInputChange}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              cursor: !isReadOnly ? "default" : "pointer",
            }}
          >
            <Mermaid
              name={block?.id}
              //@ts-ignore
              chart={data?.trim()}
              isResizable={!isReadOnly}
              initialDimensions={dimensions}
              onDimensionsChange={onDimensionsChange}
            />
          </div>
        </div>
      );
    },
  }
);

export const insertMermaid = () => ({
  title: "Mermaid",
  group: "Other",
  onItemClick: (editor: BlockNoteEditor) => {
    insertOrUpdateBlock(editor, {
      //@ts-ignore
      type: TYPE,
    });
  },
  aliases: ["mermaid"],
  icon: <MdNote />,
  subtext: "Insert a Mermaid chart",
});
