// @flow

import React, { Component } from 'react';
import { COLORS } from '../constants/tetromino';
import { getExactPosition } from '../utils/grid';
import WellGridComponent from './WellGrid';
import TetriminoComponent from './Tetromino';

import type {
  WellGrid,
  Tetromino,
  TetrominoGrid,
  Position2d
} from '../types/state';

type Props = {
  grid: WellGrid,
  blocksCleared: WellGrid,
  blocksPending: WellGrid,
  activeTetromino: Tetromino,
  activeTetrominoGrid: TetrominoGrid,
  activeTetrominoPosition: Position2d
};

class Well extends Component<Props> {
  /**
   * A rectangular vertical shaft, where Tetrominoes fall into during a Flatris
   * game. The Well has configurable size and speed. Tetromino pieces can be
   * inserted inside the well and they will fall until they hit the bottom, and
   * eventually fill it. Whenever the pieces form a straight horizontal line it
   * will be cleared, emptying up space and allowing more pieces to enter
   * afterwards.
   */
  shouldComponentUpdate(nextProps: Props) {
    return (
      nextProps.grid !== this.props.grid ||
      nextProps.blocksCleared !== this.props.blocksCleared ||
      nextProps.blocksPending !== this.props.blocksPending ||
      nextProps.activeTetromino !== this.props.activeTetromino ||
      nextProps.activeTetrominoGrid !== this.props.activeTetrominoGrid ||
      nextProps.activeTetrominoPosition !== this.props.activeTetrominoPosition
    );
  }

  getNumberOfRows() {
    return this.props.grid.length;
  }

  getNumberOfCols() {
    return this.props.grid[0].length;
  }

  getActiveTetrominoestyles() {
    const rows = this.getNumberOfRows();
    const cols = this.getNumberOfCols();
    const { x, y } = getExactPosition(this.props.activeTetrominoPosition);

    return {
      top: `${100 / rows * y}%`,
      left: `${100 / cols * x}%`,
      width: `${100 / cols * 4}%`,
      height: `${100 / rows * 4}%`
    };
  }

  render() {
    const {
      grid,
      blocksCleared,
      blocksPending,
      activeTetromino,
      activeTetrominoGrid
    } = this.props;

    return (
      <div className="well">
        {activeTetromino ? (
          <div
            className="active-tetromino"
            style={this.getActiveTetrominoestyles()}
          >
            <TetriminoComponent
              color={COLORS[activeTetromino]}
              grid={activeTetrominoGrid}
            />
          </div>
        ) : null}
        <WellGridComponent
          grid={grid}
          blocksCleared={blocksCleared}
          blocksPending={blocksPending}
        />
        <style jsx>{`
          .well {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .well .active-tetromino {
            position: absolute;
          }
        `}</style>
      </div>
    );
  }
}

export default Well;
