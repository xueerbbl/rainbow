
function isRen(year)
{
	var result = false;
	result = (year % 4 == 0 && year % 100 != 0) || (year%400==0);
	return result;
}


function renderDays(month,year,day){
	day = parseInt(day);
	var i = 0;
	if(month>=1&&month<=3)//31+28+31=90 or 91
	{
		var ren = isRen(year);
		if(ren)
		{	
			document.getElementById("last7").className="";
			document.getElementById("last8").className="disable";
			
			if(month==1){
				i = day - 1 + 31;
			}
			else if(month==2){
				i = day - 1 + 31 + 29;
			}
			else{
				i = day - 1 + 31 + 29 +31;
			}

		} else {
			if(month==1){
				i = day - 1 + 31;
			}
			else if(month==2){
				i = day - 1 + 31 + 28;
			}
			else{
				i = day - 1 + 31 + 28 +31;
			}
			document.getElementById("last7").className="disable";
			document.getElementById("last8").className="disable";
		}
		document.getElementById("startmon").innerHTML='<span class="num">1</span>月';
		document.getElementById("startday").innerHTML='01日';
		document.getElementById("endmon").innerHTML='<span class="num">3</span>月';
		document.getElementById("endday").innerHTML='31日';
		document.getElementById("season").innerHTML='第一季';
		document.getElementsByName("uu")[i].className="current";

	} else if (month>=4&&month<=6)//30+31+30=91
	{
		if(month==4){
				i = day - 1 + 30;
		}
			else if(month==5){
				i = day - 1 + 30 + 31;
			}
			else{
				i = day - 1 + 30 + 31 +30;
			}
		document.getElementById("last7").className="";
		document.getElementById("last8").className="disable";
		document.getElementById("startmon").innerHTML='<span class="num">4</span>月';
		document.getElementById("startday").innerHTML='01日';
		document.getElementById("endmon").innerHTML='<span class="num">6</span>月';
		document.getElementById("endday").innerHTML='30日';
		document.getElementById("season").innerHTML='第二季';
		var ac =document.getElementsByName("uu");
			ac[i].className="current";

	} else if (month>=7&&month<=9)//31+31+30=92
	{
		if(month==7){
				i = day - 1 + 31;
		}
			else if(month==8){
				i = day - 1 + 31 + 31;
			}
			else{
				i = day - 1 + 31 + 31 +30;
			}
		document.getElementById("last7").className="";
		document.getElementById("last8").className="";
		document.getElementById("startmon").innerHTML='<span class="num">7</span>月';
		document.getElementById("startday").innerHTML='01日';
		document.getElementById("endmon").innerHTML='<span class="num">9</span>月';
		document.getElementById("endday").innerHTML='30日';
		document.getElementById("season").innerHTML='第三季';
		document.getElementsByName("uu")[i].className="current";

	} else {//31+30+31=92
		if(month==10){
				i = day - 1 + 31;
		}
			else if(month==11){
				i = day - 1 + 31 + 30;
			}
			else{
				i = day - 1 + 31 + 30 +31;
			}
			document.getElementById("last7").className="";
			document.getElementById("last8").className="";
			document.getElementById("startmon").innerHTML='<span class="num">10</span>月';
			document.getElementById("startday").innerHTML='01日';
			document.getElementById("endmon").innerHTML='<span class="num">12</span>月';
			document.getElementById("endday").innerHTML='31日';
			document.getElementById("season").innerHTML='第四季';
			document.getElementsByName("uu")[i].className="current";
	}
}

function dmrenderDays(arr){

	for (var i=1;i<=15 ;i++ )
	{
		if(arr.length>=i){
		document.getElementById("title"+i).innerHTML = arr[i-1][0].title;
		var dateString = arr[i-1][0].date;
		var dateArr = dateString.split("-");
		document.getElementById("date"+i).innerHTML = dateArr[1]+"."+dateArr[2];
		} else {
			document.getElementById("title"+i).innerHTML = "";
			document.getElementById("date"+i).innerHTML = "";
		}
	}
	
	if(arr.length>0){
		var startDateArr = arr[0][0].date.split("-");
		var endDateArr = arr[arr.length-1][0].date.split("-");
		document.getElementById("startmon").innerHTML='<span class="num">'+startDateArr[1]+'</span>月';
		document.getElementById("startday").innerHTML=startDateArr[2]+'日';
		document.getElementById("endmon").innerHTML='<span class="num">'+endDateArr[1]+'</span>月';
		document.getElementById("endday").innerHTML=endDateArr[2]+'日';
	}


}