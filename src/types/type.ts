export namespace T {
  export type CardNode = {
    /** levelIndex is for generating position for the node on its level */
    levelIndex: number; 
    /** name is used for debugging */
    name: string; 
    level: number;
    layout: Layout;
    position: Position;
    type: number;
    viewUrl: string;
    status: Status;
    parents: CardNode[];
    size: number;
  };

  export type Layout = {
    left: number;
    top: number;
  };

  export type Position = {
    row: number;
    col: number;
  };

  export enum Status {
    Clickable,
    Frozen,
    Selected,
    Removed,
  }

  /**
   * A backtracing log for the go-back feature
   */
  export type EventLog = {
    node: CardNode | null;
    preEventLog: EventLog | null;
  };

  export interface GameConfig {
    expectedLevelCount: number;
    typeCount: number;
    cardSize: number;
    containerWidth: number;
    containerHeight: number;
  }

  export interface GameContext {
    nodes: CardNode[];
    selectedNodes: CardNode[];
    removedNodes: CardNode[];
    canBack: boolean;
    canUnblockFirstThree: boolean;

    onSelect: (node: CardNode) => void;
    onBack: () => void;
    onUnblockFirstThree: () => void;
    onInitialize: () => void;
  }

  export type GameMeta = {
    title: string;
    author: string;
    copyright: string;
  };
}
