
const DateToString = (date) =>{

    var month = ''+(date.getMonth()+1);
    var year = ''+date.getFullYear();
    if(month==='12'){
      month = '01'
    }
    if(month.length<2){
      month='0'+month
    }
    return year+'-'+month+'-01'
  };

export default DateToString