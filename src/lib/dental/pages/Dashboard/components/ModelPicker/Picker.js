import React from 'react'
import { Tooltip } from 'antd'

import ModelSVG from './ModelSVG'
import './Styles.css'

const ModelPicker = ({ idx, product, setModel, clearUnits }) =>
  <div className="tooth-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" width="49mm" height="91mm" version="1.0"
      style={{shapeRendering:'geometricPrecision', textRendering:'geometricPrecision', imageRendering:'optimizeQuality', fillRule:'evenodd', clipRule:'evenodd' }}
      viewBox="0 0 490000 910000">
      <ModelSVG idx={idx} product={product} setModel={setModel}  />
    </svg>
    <Tooltip placement='top' title='Clear units' onClick={() => clearUnits(idx)}>
      <div className="tooth-number disabled" data-next-step="2">&times;</div>
    </Tooltip>
  </div>

export default ModelPicker
