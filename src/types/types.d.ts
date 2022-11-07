type CardNode = {
  index: number;
  level: number;
  keyPoint: Point;
  position: Position;
  value: number; // value for matching
  viewUrl: string;
  status: Status;
  parents: CardNode[];
};

type Point = {
  x: number;
  y: number;
};

type Position = {
  row: number;
  col: number;
};

enum Status {
  Clickable,
  Frozen,
  Selected,
  Removed,
}

/**
 * A backtracing log for the go-back feature
 */
type EventLog = {
  node: CardNode?;
  preEventLog: EventLog?;
};

interface GameConfig {
  levelCount: number;
  nodeCount: number;
}

interface GameContext {
  nodes: CardNode[];
  selectedNodes: CardNode[];
  removedNodes: CardNode[];
  canBack: boolean;
  canUnblockFirstThree: boolean;

  onSelect: (node: CardNode) => void;
  onBack: () => void;
  onUnblockFirstThree: () => void;
}