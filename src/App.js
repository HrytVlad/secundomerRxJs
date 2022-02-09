import React, { useEffect, useState } from 'react';
import {
  interval,
  Subject,
} from 'rxjs';
import {
  takeUntil,
} from 'rxjs/operators';

import './App.css';

function App() {
  const [sec, setSec] = useState(0);
  const [onClickBtn, setonClickBtn] = useState(false);
  const [startStopTgle, setStartStopTgle] = useState();

  const handleClick = () => {
    if (!onClickBtn) {
      setonClickBtn(!onClickBtn)
    } else {
      setonClickBtn(!onClickBtn)
      setSec(0)
    }

  };

  const handleWait = () => {
    if (sec !== 0) {
      setonClickBtn(false);
    }
  };

  const handleReset = () => {
    setSec(0);
    setStartStopTgle(true);
  };

  useEffect(() => {
    if (onClickBtn) {
      setStartStopTgle('Stop');

    } else {
      setStartStopTgle('Start');
    }

    const timeSubject$ = new Subject();
    interval(10)
      .pipe(takeUntil(timeSubject$))
      .subscribe(() => {
        if (onClickBtn) {
          setSec((val) => val + 1);
        }
      });

    return () => {
      timeSubject$.next();
      timeSubject$.complete();
    };
  }, [onClickBtn]);

  return (
    <section className="App">
      <div >
        <div >
          <div >
            <div >
              {(sec / 6000) < 10
                && <span>0</span>}
              {Math.trunc(sec / 36000)}
            </div>
            <div >
              :
            </div>
            <div >
              {(sec / 6000) < 10
                && <span>0</span>}
              {Math.trunc(sec / 6000)}
            </div>
            <div >
              :
            </div>
            <div >{(sec / 100) < 10 && <span>0</span>}
              {Math.trunc(sec / 100) % 60}
            </div>
          </div>
          <div >
            <button className={onClickBtn ? 'stop' : ''} onClick={handleClick}>{startStopTgle}</button>
            <button onDoubleClick={handleWait}>Wait</button>
            <button onClick={handleReset}>Reset</button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default App