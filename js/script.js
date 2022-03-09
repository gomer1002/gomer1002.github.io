// get jsons on page load
window.onload = function () {
	//httpGetJson();
	//httpGetRepos();
	//httpGetAnimes();
}

//shikimori api
// v1 https://shikimori.one/api/doc/1.0
// v2 https://shikimori.one/api/doc

/*
check user_id and other stuff
https://shikimori.one/api/users/whoami

get anime info by id
https://shikimori.one/api/animes/*id anime(target_id)*

get anime list by user id
https://shikimori.one/api/v2/user_rates?user_id=397613
info
https://shikimori.one/api/doc/2.0/user_rates/index
*/
function httpGetAnimes() {
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open('GET', 'https://shikimori.one/api/v2/user_rates?user_id=397613&status=completed', true);
	xmlHttp.send(null);
	/*
	fetch('https://shikimori.one/oauth/authorize?client_id=bce7ad35b631293ff006be882496b29171792c8839b5094115268da7a97ca34c&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=', {credentials: 'include',mode:'no-cors', redirect:'follow'})
  .then((response) => {
    return response;
  })
  .then((data) => {
    console.log(data);
  });
  */
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState === 4) {
			console.log(xmlHttp.readyState === XMLHttpRequest.DONE, xmlHttp.status);
			let animes = (xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : null);
			//
			let cont = document.querySelector(".content");
			cont.innerHTML += "<pre>\nMy anime list:\n</pre>"
			//
			animes.forEach(rec => {
				let titleXmlHttp = new XMLHttpRequest();
				//
				titleXmlHttp.open('GET', 'https://shikimori.one/api/animes/' + rec.target_id, false);
				titleXmlHttp.send(null);
				console.log(rec.target_id, titleXmlHttp.readyState, titleXmlHttp.status);
				//
					if (titleXmlHttp.readyState === XMLHttpRequest.DONE && titleXmlHttp.status == 200) {
						let title = JSON.parse(titleXmlHttp.responseText);
						//
						cont.innerHTML += "<pre>\t" + title.russian + ' / ' +
						title.episodes + "\n</pre>";
					}
				titleXmlHttp.onreadystatechange = function () {
					console.log(titleXmlHttp.readyState === XMLHttpRequest.DONE, titleXmlHttp.status);
					//
				}
				sleep(200)
			});
		}
	}
}

function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
} 


//github api sample
function httpGetRepos() {
	let xmlHttp = new XMLHttpRequest();

	//get repos
	xmlHttp.open("GET", 'https://api.github.com/users/gomer1002/repos', false);
	xmlHttp.send(null);
	let repos = (xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : null);
	localStorage.setItem('repos', JSON.stringify(repos));

	//get zen
	//xmlHttp.open("GET", 'https://api.github.com/zen', false);
	//xmlHttp.send(null);
	//let zen = (xmlHttp.responseText ? xmlHttp.responseText : null);
	//localStorage.setItem('zen', zen);

	//show everything
	let cont = document.querySelector(".content");
	cont.innerHTML += "<center><pre>" + zen + "</pre></center>";

	//cont.innerHTML += "<center><pre>" + zen + "</pre></center>";
	//console.log(zen);
	cont.innerHTML += "<pre>\nMy projects:\n</pre>"
	repos.forEach(rep => {//<a href=""></a>
		cont.innerHTML += "<pre>\t<a target=blank href=\""+ rep.html_url +"\">" + rep.name + "</a>\n</pre>";
	});

	//cont.innerHTML += "<pre>" + stringToShow + "<pre><br>";
}

// get jsons and save
function httpGetJson() {
	let xmlHttp = new XMLHttpRequest();

	//users
	xmlHttp.open("GET", 'https://jsonplaceholder.typicode.com/users', false);
	xmlHttp.send(null);
	let users = (xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : null);
	localStorage.setItem('users', JSON.stringify(users));

	//posts
	xmlHttp.open("GET", 'https://jsonplaceholder.typicode.com/posts', false);
	xmlHttp.send(null);
	let posts = (xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : null);
	localStorage.setItem('posts', JSON.stringify(posts));

	//comments
	xmlHttp.open("GET", 'https://jsonplaceholder.typicode.com/comments', false);
	xmlHttp.send(null);
	let comments = (xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : null);
	localStorage.setItem('comments', JSON.stringify(comments));

	//show post some way
	addConsPost(); // via console
}

//jsons structure
/* users
	address: {street: "Kulas Light", suite: "Apt. 556", city: "Gwenborough", zipcode: "92998-3874", geo: {…}}
	company: {name: "Romaguera-Crona", catchPhrase: "Multi-layered client-server neural-net", bs: "harness real-time e-markets"}
	email: "Sincere@april.biz"
	id: 1
	name: "Leanne Graham"
	phone: "1-770-736-8031 x56442"
	username: "Bret"
	website: "hildegard.org"
*/
/* posts
	body: "smth post body"
	id: 1
	title: "smth title"
	userId: 1
*/
/* comments
	body: "smth comm body"
	email: "Eliseo@gardner.biz"
	id: 1
	name: "smth name"
	postId: 1
*/

function addConsPost() {//(users, posts, comms) {
	// get jsons
	let users = JSON.parse(localStorage.getItem('users'));
	let posts = JSON.parse(localStorage.getItem('posts'));
	let comments = JSON.parse(localStorage.getItem('comments'));

	// get next post index
	let btn = document.getElementById("showPost");
	let key = btn.value;// номер поста (0 by default)
	if (Number(key) == 99)
btn.value = 0;
	else
btn.value = Number(key) + 1;

	//author data
	let usr = users.find(currUsr, posts[key].userId);
	let authorName =	"Author: " + usr.username + "\t|\t" +
"Email: " + usr.email + "\t|\t" +
"Phone: " + usr.phone;
	let authorComp =	"Company name: " + usr.company.name;
	let authorAddr =	"Address: " + usr.address.zipcode +
", " + usr.address.city +
", " + usr.address.street +
", " + usr.address.suite;
	let authorString =	authorName + "\n" + authorComp + "\n" + authorAddr + "\n\n";

	// post data
	let postNum ="Post: #" + posts[key].id;
	let postTitle =posts[key].title;
	let postLine ="----------------------------------------------";
	let postBody =posts[key].body;
	let postString =	postNum + "\n" + postTitle + "\n" + postLine + "\n" + postBody + "\n\n";

	// comms data
	let numComms = 0;
	let commString = "";

	comments.forEach(comm => {
if (comm.postId == posts[key].id)
{
	numComms++;

	let commAuthor =	"\tAuthor: " + comm.name + "\t|\tEmail: " + comm.email + "\n";
	let commBody ="\tComment:\n\t\t" + comm.body.replace(/\n/g, "\n\t\t") + "\n\n";
	commString += commAuthor;
	commString += commBody;
}
	});
	postString += "Total comments: " + numComms + "\nComments:\n\n";

	// out string
	let outString = authorString  + postString  + commString;

	// print string
	console.log(outString);
	addPost(outString);
}

// search user by user id function
function currUsr(element, index, array) {
	//
	if (element.id == this) // this = second arg when func call
return element;
	else 
return false;
}

// add post to html body
function addPost(stringToShow) {
	//
	let cont = document.querySelector(".content");
	cont.innerHTML += "<pre>" + stringToShow + "</pre><br>";
}
