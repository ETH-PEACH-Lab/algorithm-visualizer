import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [lengthInput, setLengthInput] = useState('');
  const [initValuesInput, setInitValuesInput] = useState('');
  const [colorInputVisible, setColorInputVisible] = useState(false);
  const [redIndicesInput, setRedIndicesInput] = useState('');
  const [greenIndicesInput, setGreenIndicesInput] = useState('');
  const [blueIndicesInput, setBlueIndicesInput] = useState('');
  const [showIndex, setShowIndex] = useState(false);
  const [selectedArrowIndex, setSelectedArrowIndex] = useState('');
  const [selectedArrowText, setSelectedArrowText] = useState('');
  const [contextInputs, setContextInputs] = useState([]);
  const [pointerInput, setPointerInput] = useState('');

  const handleLengthInputChange = (e) => {
    setLengthInput(e.target.value);
  };

  const handleInitValuesInputChange = (e) => {
    setInitValuesInput(e.target.value);
  };

  const handleRedIndicesInputChange = (e) => {
    setRedIndicesInput(e.target.value);
  };

  const handleGreenIndicesInputChange = (e) => {
    setGreenIndicesInput(e.target.value);
  };

  const handleBlueIndicesInputChange = (e) => {
    setBlueIndicesInput(e.target.value);
  };

  const handleArrowInputChange = (e) => {
    setSelectedArrowIndex(e.target.value);
  };

  const handleArrowTextInputChange = (e) => {
    setSelectedArrowText(e.target.value);
  };

  const handlePointerInputChange = (e) => {
    setPointerInput(e.target.value);
  };

  const generateArrayFromInputs = () => {
    const length = parseInt(lengthInput);
    const values = initValuesInput
      .split(',')
      .map((value) => parseInt(value.trim()))
      .filter((value) => !isNaN(value)); // Remove NaN values

    if (isNaN(length)) {
      alert('Invalid length input! Please enter a valid number.');
      return;
    }

    let newArray = new Array(length).fill(0).map((_, index) => ({
      value: values[index] !== undefined ? values[index] : 0,
      color: '',
      arrow: false,
      arrowText: ''
    }));

    setArray(newArray);
  };

  const toggleColorInputVisible = () => {
    setColorInputVisible(!colorInputVisible);
  };

  const changeColor = () => {
    const redIndices = redIndicesInput.split(',').map((index) => parseInt(index.trim()));
    const greenIndices = greenIndicesInput.split(',').map((index) => parseInt(index.trim()));
    const blueIndices = blueIndicesInput.split(',').map((index) => parseInt(index.trim()));

    const updatedArray = array.map((item, index) => {
      if (redIndices.includes(index)) {
        return { ...item, color: 'red' };
      } else if (greenIndices.includes(index)) {
        return { ...item, color: 'green' };
      } else if (blueIndices.includes(index)) {
        return { ...item, color: 'blue' };
      } else {
        return item; // Return the item without changing the value if it's not colored
      }
    });

    setArray(updatedArray);
  };

  const toggleIndex = () => {
    setShowIndex(!showIndex);
  };

  const showArrows = () => {
    const indices = selectedArrowIndex.split(',').map(index => parseInt(index.trim()));
    const texts = selectedArrowText.split(',').map(text => text.trim());

    if (indices.length !== texts.length) {
      alert('Number of indices and texts should match!');
      return;
    }

    const updatedArray = array.map(item => ({ ...item, arrow: false, arrowText: '' }));
    indices.forEach((index, i) => {
      updatedArray[index] = { ...updatedArray[index], arrow: true, arrowText: texts[i] };
    });
    setArray(updatedArray);
  };

  const addContextInput = () => {
    setContextInputs([...contextInputs, { x: 0, y: 0, text: '' }]);
  };

  const handleContextInputChange = (index, value) => {
    const updatedInputs = [...contextInputs];
    updatedInputs[index].text = value;
    setContextInputs(updatedInputs);
  };

  const removeContextInput = (index) => {
    const updatedInputs = [...contextInputs];
    updatedInputs.splice(index, 1);
    setContextInputs(updatedInputs);
  };

  const addPointer = () => {
    const [from, to] = pointerInput.split(',');
    if (!from || !to) {
      alert('Invalid input for pointer!');
      return;
    }
    const fromIndex = parseInt(from.trim());
    const toIndex = parseInt(to.trim());
    if (isNaN(fromIndex) || isNaN(toIndex)) {
      alert('Invalid input for pointer!');
      return;
    }
    if (fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
      alert('Pointer indices out of range!');
      return;
    }
    const updatedArray = [...array];
    updatedArray[fromIndex] = { ...updatedArray[fromIndex], pointer: true, pointerTo: toIndex };
    setArray(updatedArray);
  };

  return (
    <div className="App">
      <div className="left-panel">
        <div className="array-visualization">
          {array.map((item, index) => (
            <div key={index} className={`array-square ${item.color}`}>
              {item.value !== undefined ? item.value : 0}
              {showIndex && <div className="index">{index}</div>}
              {item.arrow && <div className="arrow">&#8593;</div>}
              {item.arrowText && <div className="arrow-text">{item.arrowText}</div>}
              {item.pointer && <div className="pointer">&#8594;</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="right-panel">
        <div className="input-container">
          <label>Length:</label>
          <input type="text" value={lengthInput} onChange={handleLengthInputChange} />
        </div>
        <div className="input-container">
          <label>Init Values (comma-separated):</label>
          <input type="text" value={initValuesInput} onChange={handleInitValuesInputChange} />
        </div>
        <div className="button-container">
          <button onClick={generateArrayFromInputs}>Init</button>
        </div>
        <div className="button-container">
          <button onClick={toggleColorInputVisible}>Color</button>
          {colorInputVisible && (
            <div className="color-inputs">
              <div>
                <input
                  type="text"
                  placeholder="Red indices (comma-separated)"
                  value={redIndicesInput}
                  onChange={handleRedIndicesInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Green indices (comma-separated)"
                  value={greenIndicesInput}
                  onChange={handleGreenIndicesInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Blue indices (comma-separated)"
                  value={blueIndicesInput}
                  onChange={handleBlueIndicesInputChange}
                />
              </div>
            </div>
          )}
        </div>
        <div className="button-container">
          <button onClick={changeColor}>Apply Color</button>
        </div>
        <div className="button-container">
          <button onClick={toggleIndex}>Index</button>
        </div>
        <div className="button-container">
          <div>
            <input
              type="text"
              placeholder="Arrow Indices (comma-separated)"
              value={selectedArrowIndex}
              onChange={handleArrowInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Arrow Text (comma-separated)"
              value={selectedArrowText}
              onChange={handleArrowTextInputChange}
            />
          </div>
          <button onClick={showArrows}>Apply Arrows</button>
        </div>
        <div className="button-container">
          <button onClick={addPointer}>Pointer</button>
          <input
            type="text"
            placeholder="Pointer (from, to)"
            value={pointerInput}
            onChange={handlePointerInputChange}
          />
        </div>
        <div className="button-container">
          <button onClick={addContextInput}>Context</button>
        </div>
        {contextInputs.map((input, index) => (
          <Draggable key={index}>
            <div className="context-box" style={{ position: 'absolute', left: input.x, top: input.y }}>
              <input
                type="text"
                value={input.text}
                onChange={(e) => handleContextInputChange(index, e.target.value)}
              />
              <button className="delete-button" onClick={() => removeContextInput(index)}>x</button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
