
 /*
* @date 2013.3.7
* @author guanhl
* @verson 0.6
* @description 这是一个接受json数据，js控制实现了分页展示数据，按属性排序。
*  myShowPage.settings = {
*	    //json表示模块的json字符串数据，json中属性随意，集合中每个对象属性统一即可。
*		json : '[{"id":1,"fid":0,"name":"导航模块1","url":"","isleaf":false},{"id":2,"fid":1,"name":"子模块1","url":"","isleaf":true},{"id":3,"fid":1,"name":"子模块2","url":"","isleaf":true},{"id":4,"fid":0,"name":"导航模块2","url":"","isleaf":false},{"id":5,"fid":4,"name":"子模块3","url":"","isleaf":true},{"id":6,"fid":4,"name":"子模块4","url":"","isleaf":true}]',
*		//size表示一页显示的数据数量。
*       size : 10,
*       //显示表格的头信息。
*       titles : ["id","fid","name","url","isleaf"],
*       //显示每条信息对应的属性名。
*		values : ["id","fid","name","url","isleaf"],
*       //divID表示页面中必须存在一个id为divID的div标签。
*		divID : "mydiv"
*  }
*  
*  myShowPage.showPage();//显示数据。
*/
 
 
 
 myShowPage = {
 
		  json : null,
		  titles : null,
		  values : null,
		  size : 10,
		  divID: "root",
		  current : 1,    //当前页
		  total : null,   //总页
		  jsonObjects:null,
		  cacheData:null, //缓冲数据
		  settings:{},
		  sortFlag:true, //正序标志
		  sortName:null, //排序参照

		  showPage:function(){ 
			   if(null==this.cacheData){
				   if(!this.initHandler(this.settings))//初始化
					   return ;
				   this.creatTableDomHandler(this.divID);//生成页面空表格
			   }
			   this.fillCacheHandler(this.current);//从原数据取显示信息填充到缓冲数据
			   this.fillTableHandler(this.cacheData);//将缓冲数据填充到页面表格中
			   var curspan = document.getElementById("curspan");
			   curspan.innerHTML = "当前页"+this.current+"/"+this.total;//刷新当前页面
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
			this.clearCacheHandler();//清空缓冲数据
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
		  jsonHandler:function(json){//json转换
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
			   first.innerHTML = "首页";
			   last.innerHTML = "尾页";
			   previous.innerHTML = "上一页";
			   next.innerHTML = "下一页";
			   var curspan = document.createElement("span");
			   curspan.id = "curspan";
			   curspan.innerHTML = "当前页"+this.current+"/"+this.total;
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
		  previousPageHandler:function(){//上一页操作
			if(myShowPage.current<=1)
			return;
			myShowPage.current -= 1;
			myShowPage.showPage();
		  },
		  nextPageHandler:function(){//下一页操作
			if(myShowPage.current>=myShowPage.total)
			return;
			myShowPage.current += 1;
			myShowPage.showPage();
		  },
		  firstPageHandler:function(){//首页操作
			if(myShowPage.current<=1)
			return;
			myShowPage.current = 1;
			myShowPage.showPage();
		  },
		  lastPageHandler:function(){//尾页操作
			if(myShowPage.current>=myShowPage.total)
			return;
			myShowPage.current = myShowPage.total;
			myShowPage.showPage();
		  },sortHandler:function(event){//排序
				
				var str = this.innerHTML;
				var arr = myShowPage.titles;
				
				var compare = function(name){//排序策略
				   
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