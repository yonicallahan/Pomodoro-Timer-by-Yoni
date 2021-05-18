import React from "react";
import { secondsToDuration } from "../utils/duration";
import { minutesToDuration } from "../utils/duration";



function SessionInfo({session, focusDuration, breakDuration}) {

    //for every 5 minutes we need to increase the progress bar by 20


    if (session) {
        let sessionLabel;
        if (session.label === "Focusing") {
            sessionLabel = `${session.label} for ${minutesToDuration(focusDuration)} minutes`
        } else {
            sessionLabel = `${session.label} for ${minutesToDuration(breakDuration)} minutes`
        }

        const focusWidth = 100 - Math.floor(session.timeRemaining/(focusDuration*60)*100)
        
        const breakWidth = 100 - Math.floor(session.timeRemaining/(breakDuration*60)*100)
        

        function handleProgress () {
          if (session.label === "Focusing"){
            return focusWidth
          } else {
            return breakWidth
          }
        }

        return (
            <div>
            {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
            <div className="row mb-2">
              <div className="col">
                {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
                <h2 data-testid="session-title">
                  {sessionLabel}
                </h2>
                {/* TODO: Update message below correctly format the time remaining in the current session */}
                <p className="lead" data-testid="session-sub-title">
                  {secondsToDuration(session?.timeRemaining)} remaining
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col">
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={handleProgress()} // TODO: Increase aria-valuenow as elapsed time increases
                    style={{width: handleProgress()}} // TODO: Increase width % as elapsed time increases
                  />
                </div>
              </div>
            </div>
            </div>
                )
    }
    return null;
}

export default SessionInfo;
