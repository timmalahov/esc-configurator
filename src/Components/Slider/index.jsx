import PropTypes from 'prop-types';
import React, {
  useState, 
} from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './style.css';

function Slider({
  name,
  value,
  step,
  min,
  max,
  label,
  suffix,
  onChange,
  inSync,
  offset,
  factor,
  round,
}) {
  const [currentValue, setCurrentValue] = useState(value);

  const getDisplayValue = () => {
    let value = factor * currentValue + offset;

    if (round !== null) {
      value = Math.round(value);
    }

    return value;
  };

  function updateValue(value) {
    value = Math.floor((value - offset) / factor);
    setCurrentValue(value);
  }

  function handleUpdate(value) {
    /**
     * This timeout is needed in order for the InputRange component to
     * disable the on click handlers.
     *
     * TODO: Improve this by using a different InputRange library - this one
     *       is pretty outdated.
     */
    setTimeout(() => {
      value = Math.floor((value - offset) / factor);
      onChange(name, value);
    }, 100);
  }

  return (
    <div className="number">
      <label>
        <InputRange
          labelSuffix={suffix}
          maxValue={max}
          minValue={min}
          name={name}
          onChange={updateValue}
          onChangeComplete={handleUpdate}
          step={step}
          value={inSync ? getDisplayValue() : null}
        />

        <span className={!inSync ? 'not-in-sync' : ''}>
          {label}
        </span>
      </label>
    </div>
  );
}

Slider.defaultProps = {
  factor: 1,
  inSync: true,
  offset: 0,
  suffix: '',
};

Slider.propTypes = {
  factor: PropTypes.number,
  inSync: PropTypes.bool,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  offset: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  round: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default Slider;