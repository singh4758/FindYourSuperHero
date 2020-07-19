localStorage.storage;
localStorage.id;
if(localStorage.storage==undefined){
		localStorage.storage = JSON.stringify([]);
}
var i =-1;

function inputpress(event){
	var li = document.getElementsByTagName('li');
	if(event.keyCode==13){
		if(i!=-1){
			var id= document.getElementsByTagName('li')[i].id;
			openpage(id);
		}
	}
	else if((event.keyCode>=65 && event.keyCode<=90)|| event.keyCode==8){
		i=-1;
		setTimeout(autocomplete,100);
	}
	else if (event.keyCode==40) {
		if(li.length==0){
			return;
		}
		if(i!=-1){
			li[i].classList.remove('selected');
		}
		if(i>=li.length-1){
			i=-1;
		}
		i++;
		move(i);
	}
	else if (event.keyCode==38) {
		if(li.length==0){
			return;
		}
		if(i!=-1){
			li[i].classList.remove('selected');
		}
		if(i<=0){
			i =li.length;
		}
		i--;
		//up
		move(i);
	}
}

var  move = (i)=>{
	var li = document.getElementsByTagName('li');
	li[i].className = "selected"
}





var autocomplete = ()=>{
	var input = document.getElementsByTagName('input');
	var str = input[0].value;
	if(str.length<3){
		clear();
		return;
	}
	var url = "https://superheroapi.com/api.php/1868552363280889/search/"+str;
	var xhrrequest = new XMLHttpRequest();

	xhrrequest.onload = function(){
		clear();
		updatelist(xhrrequest.response);
	};

	xhrrequest.open("get",url,true);
	xhrrequest.send();
}


function clear(){
	var li = document.getElementsByTagName('li');
	for(let i =0;i<li.length;i++){
		li[i].remove();
		i--;
	}
}

function updatelist(data){
	var temp = JSON.parse(data);
	if(temp.response=="success"){
		show(temp.results);
	}
	else{
		var str = "<li class='list'>Sarch not Found</li>"
		var myul = document.getElementById('myul');
		myul.innerHTML = str;
	}
}


function show(data){
	var arr = JSON.parse(localStorage.storage);
	var myul = document.getElementById('myul');
	clear();
	for (let i = 0; i < data.length; i++) {
		var li = document.createElement('li');
		li.setAttribute("id",data[i]['id']);
		var str;
		if(arr.indexOf(data[i]['id'])!=-1){
			str = "<div><span class='data' onclick='openpage(this.parentNode.parentNode.id)'>"
				+data[i]['name']
				+"</span><span onclick='addfavourite(this.parentNode.parentNode.id)'><i class='fas fa-heart'></i></span></div>"
		}
		else{
			str = "<div><span class='data' onclick='openpage(this.parentNode.parentNode.id)'>"
					+data[i]['name']
					+"</span><span onclick='addfavourite(this.parentNode.parentNode.id)'><i class='far fa-heart'></i></span></div>"
		}
		li.innerHTML = str;
		myul.append(li);
	}
}



var openpage= (id)=>{
	localStorage.id = id;
	if(localStorage.id==""){
		return;
	}
	window.open("detail.html","_self");
}


var addfavourite = (id)=>{
	var arr = JSON.parse(localStorage.storage);
	var flag= false;
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]==id){
			flag=true;
			arr.splice(i,1);
			i--;
		}
	}
	if(!flag){
		arr.push(id);
	}
	localStorage.storage = JSON.stringify(arr);
	autocomplete();

}


function favourite(){
	window.open("favourite.html","_self");
}