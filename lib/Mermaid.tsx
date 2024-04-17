import { useRef, useEffect, useMemo } from "react";
import mermaid from "mermaid";

const DEFAULT_CONFIG = {
  startOnLoad: true,
  theme: "forest",
  logLevel: "fatal",
  securityLevel: "strict",
  arrowMarkerAbsolute: false,
  flowchart: {
    htmlLabels: true,
    curve: "linear",
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
    mirrorActors: true,
    bottomMarginAdj: 1,
    useMaxWidth: true,
    rightAngles: false,
    showSequenceNumbers: false,
  },
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    fontFamily: '"Open-Sans", "sans-serif"',
    numberSectionStyles: 4,
    axisFormat: "%Y-%m-%d",
  },
};

type Dimensions = {
  width: string | number;
  height: string | number;
};

type MermaidComponentProps = {
  name: string;
  chart: string;
  config?: Object;
  initialDimensions: Dimensions;
  forcedDimensions?: Dimensions;
  isResizable?: boolean;
  onDimensionsChange?: (dimensions: Dimensions) => void;
};

const Mermaid = ({
  name,
  chart = "",
  config = {},
  initialDimensions = {
    width: 400,
    height: "auto",
  },
  forcedDimensions,
  isResizable,
  onDimensionsChange,
}: MermaidComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserver = useRef<ResizeObserver>();
  useEffect(() => {
    mermaid.initialize({ ...DEFAULT_CONFIG, ...config });
  }, []);
  useEffect(() => {
    mermaid.contentLoaded();
  }, [config]);

  const id = useMemo(
    () => "mermaidBlock" + name?.substring(name.lastIndexOf("-") + 1),
    [name]
  );

  const rerender = async () => {
    try {
      const isValid = await mermaid.parse(chart, {
        suppressErrors: true,
      });
      if (!isValid) {
        if (containerRef.current)
          containerRef.current.textContent = "Invalid mermaid code!";
        return;
      }
      setTimeout(async () => {
        const { svg } = await mermaid.render(id, chart);
        if (svg) {
          if (containerRef.current) containerRef.current.innerHTML = svg;
        }
      }, 100)
    } catch (e) {
      if (containerRef.current)
        containerRef.current.textContent = "Invalid mermaid code!";
      throw e;
    }
  };
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width + 2;
        const height = entry.contentRect.height + 2;
        if (
          width == initialDimensions.width &&
          height == initialDimensions.height
        ) {
          return;
        }
        onDimensionsChange?.({
          width,
          height: height,
        });
      }
    });
  }, [containerRef]);
  
  useEffect(() => {
    rerender();
  }, [chart]);

  if (!chart) return null;
  return forcedDimensions ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        color: "red",
        textAlign: "center",
        width: forcedDimensions?.width,
        height: forcedDimensions?.height,
      }}
      ref={containerRef}
    ></div>
  ) : (
    <div
      id="mermaidContainer"
      className="resizable-container"
      style={{
        width: `${initialDimensions.width}px`,
        height: `${initialDimensions.height}px`,
        overflow: "hidden",
        position: "sticky",
        resize: isResizable ? "both" : "none",
        border: isResizable ? "1px solid #ccc" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "red",
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
        ref={containerRef}
      ></div>
    </div>
  );
};

export default Mermaid;
