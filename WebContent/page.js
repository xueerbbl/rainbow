
 /*
* @date 2013.3.7
* @author guanhl
* @verson 0.6
* @description ����һ������json���ݣ�js����ʵ���˷�ҳչʾ���ݣ�����������
*  myShowPage.settings = {
*	    //json��ʾģ���json�ַ������ݣ�json���������⣬������ÿ����������ͳһ���ɡ�
*		json : '[{"id":1,"fid":0,"name":"����ģ��1","url":"","isleaf":false},{"id":2,"fid":1,"name":"��ģ��1","url":"","isleaf":true},{"id":3,"fid":1,"name":"��ģ��2","url":"","isleaf":true},{"id":4,"fid":0,"name":"����ģ��2","url":"","isleaf":false},{"id":5,"fid":4,"name":"��ģ��3","url":"","isleaf":true},{"id":6,"fid":4,"name":"��ģ��4","url":"","isleaf":true}]',
*		//size��ʾһҳ��ʾ������������
*       size : 10,
*       //��ʾ����ͷ��Ϣ��
*       titles : ["id","fid","name","url","isleaf"],
*       //��ʾÿ����Ϣ��Ӧ����������
*		values : ["id","fid","name","url","isleaf"],
*       //divID��ʾҳ���б������һ��idΪdivID��div��ǩ��
*		divID : "mydiv"
*  }
*  
*  myShowPage.showPage();//��ʾ���ݡ�
*/
 
 
 
 myShowPage = {
 
		  json : null,
		  titles : null,
		  values : null,
		  size : 10,
		  divID: "root",
		  current : 1,    //��ǰҳ
		  total : null,   //��ҳ
		  jsonObjects:null,
		  cacheData:null, //��������
		  settings:{},
		  sortFlag:true, //�����־
		  sortName:null, //�������

		  showPage:function(){ 
			   if(null==this.cacheData){
				   if(!this.initHandler(this.settings))//��ʼ��
					   return ;
				   this.creatTableDomHandler(this.divID);//����ҳ��ձ��
			   }
			   this.fillCacheHandler(this.current);//��ԭ����ȡ��ʾ��Ϣ��䵽��������
			   this.fillTableHandler(this.cacheData);//������������䵽ҳ������
			   var curspan = document.getElementById("curspan");
			   curspan.innerHTML = "��ǰҳ"+this.current+"/"+this.total;//ˢ�µ�ǰҳ��
          },
		  initHandler:function(settings){
			if(settings){
				if(settings.titles)
					this.titles = settings.titles;
				else
					return false;

				if(settings.values)
					this.values = settings.values;
				else
					return false;
				if(settings.divID)
					this.divID = settings.divID;
				
				if(this.titles.length!=this.values.length)
					return false;

				if(settings.json)
					this.json = settings.json;
				else
					return false;

				if(settings.size&&settings.size!=0)
					this.size = settings.size;
			}  
			this.jsonObjects = this.jsonHandler(this.json);
			this.current = 1;
			this.total = Math.ceil(this.jsonObjects.length/this.size);
			this.clearCacheHandler();//��ջ�������
			return true;
		  },
		  clearCacheHandler:function(){
			    if(!this.cacheData)
				this.cacheData = new Array();
				for(var i = 0;i<this.size;i++){
					this.cacheData[i] = new Array();
					for(var j = 0;j<this.titles.length;j++){
						this.cacheData[i][j]=null;
					}
				}
		  },
		  jsonHandler:function(json){//jsonת��
						if(json)
						var obj = eval('(' + json + ')');
						return obj;
		  },
		  creatTableDomHandler:function(name){
		  	   
			   var sTable = document.createElement("table");
			   sTable.border = 1;
			   var sTbody = document.createElement("tbody"); 
			   sTable.appendChild(sTbody);
			   var sTh = document.createElement("tr");
			   for(var i=0;i<this.titles.length;i++){
					var sTd = document.createElement("td");
					sTd.innerHTML = this.titles[i];
					sTd.onclick = this.sortHandler;
					sTh.appendChild(sTd);
			   }
			   sTbody.appendChild(sTh);
			   for(var i=0;i<this.size;i++){
					var sTr = document.createElement("tr");
					for(var j=0;j<this.titles.length;j++){
						var sTd = document.createElement("td");
						  //sTd.innerText = "1";
						sTr.appendChild(sTd);
					}
					sTbody.appendChild(sTr);
			   }
			   document.getElementById(name).appendChild(sTable);

			   var first = document.createElement("a");
			   var last = document.createElement("a");
			   var previous = document.createElement("a");
			   var next = document.createElement("a");
			   first.href = "javascript:void(0)";
			   last.href = "javascript:void(0)";
			   previous.href = "javascript:void(0)";
			   next.href = "javascript:void(0)";
			   first.onclick = this.firstPageHandler;
			   last.onclick = this.lastPageHandler;
			   previous.onclick = this.previousPageHandler;
			   next.onclick = this.nextPageHandler;
			   first.innerHTML = "��ҳ";
			   last.innerHTML = "βҳ";
			   previous.innerHTML = "��һҳ";
			   next.innerHTML = "��һҳ";
			   var curspan = document.createElement("span");
			   curspan.id = "curspan";
			   curspan.innerHTML = "��ǰҳ"+this.current+"/"+this.total;
			   var space1 = document.createElement("span");
			   space1.innerHTML = "&nbsp;";
			   var space2 = document.createElement("span");
			   space2.innerHTML = "&nbsp;";
			   var space3 = document.createElement("span");
			   space3.innerHTML = "&nbsp;";			  
			   var space4 = document.createElement("span");
			   space4.innerHTML = "&nbsp;";
			   document.getElementById(name).appendChild(first);
			   document.getElementById(name).appendChild(space1);
			   document.getElementById(name).appendChild(previous);
			   document.getElementById(name).appendChild(space2);
			   document.getElementById(name).appendChild(next);
			   document.getElementById(name).appendChild(space3);
			   document.getElementById(name).appendChild(last);
			   document.getElementById(name).appendChild(space4);
			   document.getElementById(name).appendChild(curspan);
		  },
		  fillCacheHandler:function(current){
			    var top = this.size;
					top = this.current*this.size;
				for(var i = (this.current-1)*this.size;i<top;i++){
					for(var j = 0;j<this.titles.length;j++){
						this.cacheData[i-(this.current-1)*this.size][j]=this.jsonObjects[i]==null?"":this.jsonObjects[i][this.values[j]];
					}
				}
		  },
		  fillTableHandler:function(){
			
				var tbody = document.getElementById(this.divID).getElementsByTagName("tbody")[0]; 
				for(var i = 0;i<this.size;i++){
					for(var j = 0;j<this.titles.length;j++){
						tbody.getElementsByTagName("tr")[i+1].getElementsByTagName("td")[j].innerHTML = null===this.cacheData[i][j]||""===this.cacheData[i][j]? "&nbsp":this.cacheData[i][j];
					}
				}
		  },
		  previousPageHandler:function(){//��һҳ����
			if(myShowPage.current<=1)
			return;
			myShowPage.current -= 1;
			myShowPage.showPage();
		  },
		  nextPageHandler:function(){//��һҳ����
			if(myShowPage.current>=myShowPage.total)
			return;
			myShowPage.current += 1;
			myShowPage.showPage();
		  },
		  firstPageHandler:function(){//��ҳ����
			if(myShowPage.current<=1)
			return;
			myShowPage.current = 1;
			myShowPage.showPage();
		  },
		  lastPageHandler:function(){//βҳ����
			if(myShowPage.current>=myShowPage.total)
			return;
			myShowPage.current = myShowPage.total;
			myShowPage.showPage();
		  },sortHandler:function(event){//����
				
				var str = this.innerHTML;
				var arr = myShowPage.titles;
				
				var compare = function(name){//�������
				   
				   return function(obj1,obj2){
 					    
						var val1 = obj1[name];
 					    var val2 = obj2[name];
						    
						if(val1>val2)
							return 1;
						else if(val1<val2)
							return -1;
						else 
							return 0;
				   }
				}
				if(myShowPage.sortName!=str){
					myShowPage.sortFlag = true;
					myShowPage.sortName = str;
				}

				for(var i=0;i<arr.length;i++){
				   if (str==arr[i]){
	   
					    if(myShowPage.sortFlag){
		                    myShowPage.sortFlag = false;
							myShowPage.jsonObjects.sort(compare(myShowPage.values[i]));	
						} else {
							myShowPage.sortFlag = true;
							myShowPage.jsonObjects.reverse(compare(myShowPage.values[i]));	
						}
						myShowPage.current = 1;
						myShowPage.showPage();
				   }    
				}
		  }

 };