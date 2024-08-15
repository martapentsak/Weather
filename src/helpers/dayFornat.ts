function addDaysWRONG() {
    var result = new Date()
    result.setDate(result.getDate() + 1);
    return result;
  }

export const otherDay = addDaysWRONG().toISOString().split("T")[0];

export const today = new Date().toISOString().split("T")[0];

export const todayDate = new Date().toDateString().slice(0, 3);






