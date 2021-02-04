const parseDate = (date) => {
    const now = new Date(); 
    let minus = 0;
    if(now.getFullYear() > date.getFullYear()){
        minus= now.getFullYear()-date.getFullYear();
        return minus+"년 전";
    }else if(now.getMonth() > date.getMonth()){
        minus= now.getMonth()-date.getMonth();
        return minus+"달 전";
    }else if(now.getDate() > date.getDate()){
        minus= now.getDate()-date.getDate();
        return minus+"일 전";
    }else if(now.getDate() === date.getDate()){
        var nowTime = now.getTime();
        var writeTime = date.getTime();
        if(nowTime>writeTime){
            let sec = parseInt(nowTime - writeTime) / 1000;
            let day  = parseInt(sec/60/60/24);
            sec = (sec - (day * 60 * 60 * 24));
            let hour = parseInt(sec/60/60);
            sec = (sec - (hour*60*60));
            let min = parseInt(sec/60);
            sec = parseInt(sec-(min*60));
            if(hour>0){
                return hour + "시간 전";
            }else if(min>0){
                return min + "분 전";
            }else if(sec>0){
                return sec + "초 전";
            }
        }
    }
    return '방금 전';
};

export {
    parseDate
};