(function(){
	if (localStorage.id==undefined) {
		var container = document.getElementById('container');
		var str = "<h1 id='error'>Error Please Back </h1>";
		container.remove();
		var body = document.getElementsByTagName('body');
		body[0].innerHTML = str;
		return;
	}
	iconsetstart();
	goingon();
})();

function iconsetstart(){
	var url = "https://superheroapi.com/api.php/1868552363280889/"+localStorage.id;
	var xhrrequest = new XMLHttpRequest();
	xhrrequest.onload = function(){
		iconsetprocess(xhrrequest.response);
	}

	xhrrequest.open("get",url,true);
	xhrrequest.send();
}


function iconsetprocess(){
	var arr = JSON.parse(localStorage.storage);
	var id = localStorage.id;
	var flag = false;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]==id) {
			var icon = document.getElementById('icon');
			icon.innerHTML = "<i class='fas fa-heart'></i>"
			flag=true;
			break;
		}
	}

	if(!flag){
		var icon = document.getElementById('icon');
		icon.innerHTML = "<i class='far fa-heart'></i>"
	}

}


function goingon(){
	var url = "https://superheroapi.com/api.php/1868552363280889/"+localStorage.id;
	var xhrrequest = new XMLHttpRequest();
	xhrrequest.onload = function(){
		appearance(xhrrequest.response);
		biography(xhrrequest.response);
		work(xhrrequest.response);
		powerstats(xhrrequest.response);
		connection(xhrrequest.response);
	}

	xhrrequest.open("get",url,true);
	xhrrequest.send();
}

function appearance(data){
	data = JSON.parse(data);
	var image = document.getElementById('image');
	image.setAttribute("src",data['image']['url']);
	var name = document.getElementById('name');
	name.innerHTML = data["name"];
	var height = document.getElementById('height');
	height.innerHTML = data['appearance']['height'][1];
	var weight = document.getElementById('weight');
	weight.innerHTML = data['appearance']['weight'][1];
	var gender = document.getElementById('gender');
	gender.innerHTML = data['appearance']['gender'];
	var eye_color = document.getElementById('eye-color');
	eye_color.innerHTML = data['appearance']['eye-color'];
	var hair_color = document.getElementById('hair-color');
	hair_color.innerHTML = data['appearance']['hair-color'];
	var race = document.getElementById('race');
	race.innerHTML = data['appearance']['race'];
}

function biography(data){
	var data = JSON.parse(data);
	var full_name = document.getElementById('full-name');
	full_name.innerHTML = data['biography']['full-name'];
	var alter_egos = document.getElementById('alter-egos');
	alter_egos.innerHTML = data['biography']['alter-egos'];
	var place_of_birth = document.getElementById('place-of-birth');
	place_of_birth.innerHTML = data['biography']['place-of-birth'];
	var first_appearance = document.getElementById('first-appearance');
	first_appearance.innerHTML = data['biography']['first-appearance'];
	var publisher = document.getElementById('publisher');
	publisher.innerHTML = data['biography']['publisher'];
	var alignment = document.getElementById('alignment');
	alignment.innerHTML = data['biography']['alignment'];
}


function work(data){
	var data = JSON.parse(data);
	var occupation = document.getElementById('occupation');
	occupation.innerHTML = data['work']['occupation'];
	var base = document.getElementById('base');
	base.innerHTML = data['work']['base'];
}

function powerstats(data){
	var data = JSON.parse(data);
	var intelligence = document.getElementById('intelligence');
	intelligence.innerHTML = data['powerstats']['intelligence'];
	var strength = document.getElementById('strength');
	strength.innerHTML = data['powerstats']['strength'];
	var speed = document.getElementById('speed');
	speed.innerHTML = data['powerstats']['speed'];
	var durability = document.getElementById('durability');
	durability.innerHTML = data['powerstats']['durability'];
	var power = document.getElementById('power');
	power.innerHTML = data['powerstats']['power'];
	var combat = document.getElementById('combat');
	combat.innerHTML = data['powerstats']['combat'];
}

function connection(data){
	var data = JSON.parse(data);
	var group_affiliation = document.getElementById('group-affiliation');
	group_affiliation.innerHTML = data['connections']['group-affiliation'];
	var relatives = document.getElementById('relatives');
	relatives.innerHTML = data['connections']['relatives'];
}


function main(){
	window.open("index.html","_self");
}

var addfavourite = ()=>{
	var id = localStorage.id;
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
	iconsetstart();
}

function favourite(){
	window.open("favourite.html","_self");
}
