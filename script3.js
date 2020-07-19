(function(){
	if (localStorage.storage==undefined) {
		localStorage.storage = JSON.stringify([]);
	}

	request();

})();


function request(){
	clear();
	var arr = JSON.parse(localStorage.storage);
	if (arr.length==0) {
		var myul = document.getElementById('myul');
		myul.remove();
		var div = document.getElementById('conatainer');
		var cre =document.createElement('div');
		cre.setAttribute("class","empty");
		var str = "<h2>Favourite List is Empty</h2><h4>Please add Your Favourite Hero to show here</h4>";
		cre.innerHTML = str;
		div.appendChild(cre);
		return
	}
	for (let i = 0; i<arr.length;i++) {
		active(arr[i]);
	}
}


function active(id){
	var url = "https://superheroapi.com/api.php/1868552363280889/"+id;
	var xhrrequest = new XMLHttpRequest();
	xhrrequest.onload = function(){
		show(xhrrequest.response);
	}
	xhrrequest.open("get",url,true);
	xhrrequest.send();
}

function show(data){
	var store = JSON.parse(data);
	var list_container = document.getElementById("myul");
	var li_no = document.getElementsByTagName("li");
	var li = document.createElement('li');
	var str = "<div><div class='number'>"+(li_no.length+1)+"</div><div class='name' id="+store["id"]+" onclick='openpage(this.id)'>"
	+store['name']+"</div><div class='remove' id="+(li_no.length)+" onclick='remove(this.id);'><i class='fas fa-times-circle'></i></div</div>"
	li.innerHTML = str;
	list_container.appendChild(li);
}


var openpage= (id)=>{
	localStorage.id = id;
	if(localStorage.id==""){
		return;
	}
	window.open("detail.html","_self");
}

function remove(id){
	var arr = JSON.parse(localStorage.storage);
	arr.splice(id,1);
	localStorage.storage = JSON.stringify(arr);
	request();
}


function clear(){
	var li = document.getElementsByTagName('li');
	for(let i =0;i<li.length;i++){
		li[i].remove();
		i--;
	}
}

function main(){
	window.open("index.html","_self");
}


