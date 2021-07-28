'use strict'

// page GAME
//*******************************************************************
/** Update Time in page Game
 *  
 */
function updateTime() {

    const now = new Date();
    const timeStr = getTimeFromDate(now);
    actualTime.innerText = timeStr;

    window.setTimeout(updateTime, 1000);
}

/** To format Date in Time
 * 
 */
const getTimeFromDate = function(date) {
    return date.toTimeString().slice(0, 8);
};


export { updateTime }