
import {startOfWeek,endOfWeek} from "date-fns";

export const getStartOfWeek= async(d)=> {
    return startOfWeek(d,{weekStartsOn:1});
  }
