export namespace T {
  export type CardNode = {
    index: number;
    level: number;
    layout: Layout;
    position: Position;
    value: number; // value for matching
    viewUrl: string;
    status: Status;
    parents: CardNode[];
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
    levelCount: number;
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
