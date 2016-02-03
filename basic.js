


/* declare variables */
var box = new MusicBox();
var musicToAdd;

/* Create default playlist */
box.addPlaylist("Default");
box.setCurrent(box.playlists[0]);




/* ----- Javascript Functions --------------------------------------------------------------------------- */


/* highlight search results */
function highlightFound(i) {
	box.current.refreshList();
	document.getElementById("musiclist").rows[i+1].style.backgroundColor = "orange";
}

/* populate list with songs for testing usgaes */
function populateList() {
	box.current.addMusicWithParams("Dear Snow", "Arashi", true);
	box.current.addMusicWithParams("Dandelion", "BUMP OF CHICKEN", true);
	box.current.addMusicWithParams("carnival night part 2", "Arashi", true);
	box.current.addMusicWithParams("Two", "Satoshi Ohno", true);
	box.current.addMusicWithParams("Rain", "Satoshi Ohno", true);
	box.current.addMusicWithParams("sugar and salt", "Sho Sakurai", true);
	box.current.addMusicWithParams("OAOA", "flumpool", true);
	box.current.addMusicWithParams("Clap your hands", "NICO touches the Walls", false);
	box.current.addMusicWithParams("Dragon Night", "SEKAI NO OWARI", false);
	box.current.addMusicWithParams("A RA SHI", "Arashi", false);
	box.current.addMusicWithParams("Sakura", "Arashi", true);
	box.current.addMusicWithParams("Bleeding Out", "Imagine Dragons", false);
	box.current.addMusicWithParams("Obladi Oblada", "The Beatles", false);
	box.current.addMusicWithParams("Born to Be Free", "X JAPAN", false);
	box.current.addMusicWithParams("Wish", "Arashi", false);
	box.current.addMusicWithParams("Hello, world", "BUMP OF CHICKEN", false);
	box.current.addMusicWithParams("Love your life", "nero", true);
	box.current.addMusicWithParams("Hit the Floor", "Satoshi Ohno", true);
}

/* open youtube link */
function findYoutube(keyword) {
	window.open("https://www.youtube.com/results?search_query=" + keyword);
}

/* Close the dropdown menu if the user clicks outside of it */
window.onclick = function(event) {
	var dropdowns, i, openDropdown;
	if (!event.target.matches('.dropdownbutton')) {
		dropdowns = document.getElementsByClassName("dropdown-content");
		for (i = 0; i < dropdowns.length; i++) {
			openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}

	if (!event.target.matches('.addplaylistdropdown') && !event.target.matches('.playlistname')) {
		dropdowns = document.getElementsByClassName("popup-content-playlist");
		for (i = 0; i < dropdowns.length; i++) {
			openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}

	if (!event.target.matches('.addmusicdropdown') && !event.target.matches('.title') && !event.target.matches('.artist') && !event.target.matches('.favourite')) {
		dropdowns = document.getElementsByClassName("popup-content-music");
		for (i = 0; i < dropdowns.length; i++) {
			openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
};





/* ----- JQuery Functions --------------------------------------------------------------------------- */




$(document).ready(function(){

	/* refresh list */
	$("#refreshlistbutton").click(function(event){
		box.current.refreshList();
	});

	/* clear list */
	$("#clearlistbutton").click(function(event){
		var confirm = window.confirm("Are you sure you want to wipe the playlist?");
		if (confirm) {
			box.current.music = [];
			box.current.refreshList();
		}
	});

	/* find music */
	$("#findmusicbutton").click(function(event){
		var keyword = document.getElementById("keyword").value.toUpperCase();
		box.current.findMusic(keyword);
	});

	/* find music */
	$("#editmusicbutton").click(function(event){
		if(document.getElementById("editmusicbutton").value==="Edit music")
			box.editMusicMode();
		else {
			box.current.mode = "default";
			box.current.refreshList();
		}
	});

	/* add music */
	$("#addmusicbutton").click(function(event){
		box.current.addMusic();
	});

	/* remove music */
	$("#removemusicbutton").click(function(event){
		if(document.getElementById("removemusicbutton").value==="Remove music")
			box.removeMusicMode();
		else {
			box.current.mode = "default";
			box.current.refreshList();
		}
	});

	/* add playlist */
	$("#addplaylistbutton").click(function(event){
		box.addPlaylist(document.getElementById("playlistname").value);
	});

	/* remove playlist */
	$("#removeplaylistbutton").click(function(event){
		if (box.playlists.length<=1)
			window.confirm("Must have at least one playlist!");
		else
			box.removePlaylistMode();
	});

	/* find music */
	$("#editplaylistbutton").click(function(event){
		box.editPlaylistMode();
	});




	/* Refresh onchange */
	$("#radiotitle").change(function(event){
		box.current.refreshList();
	});

	/* Refresh onchange */
	$("#radioartist").change(function(event){
		box.current.refreshList();
	});

	/* Press button on enter key */
	$("#keyword").keyup(function(event){
		if(event.keyCode == 13){
			$("#findmusicbutton").click();
		}
	});

	/* show dropdown */
	$("#addmusicdropdown").click(function(event){
		document.getElementById("musicpopup").classList.toggle("show");
		document.getElementById("title").focus();
	});

	/* Press button on enter key */
	$("#title").keyup(function(event){
		if(event.keyCode == 13){
			$("#addmusicbutton").click();
		}
	});

	/* Press button on enter key */
	$("#artist").keyup(function(event){
		if(event.keyCode == 13){
			$("#addmusicbutton").click();
		}
	});

	/* Toggle checkmark on enter key */
	$("#favourite").keyup(function(event){
		if(event.keyCode == 13){
			var checked = $("#favourite").is(":checked");
			$("#favourite").prop("checked", !checked);
		}
	});

	/* show dropdown */
	$("#addplaylistdropdown").click(function(event){
		document.getElementById("playlistpopup").classList.toggle("show");
		document.getElementById("playlistname").focus();
	});

	/* Press button on enter key */
	$(".playlistname").keyup(function(event){
		if(event.keyCode == 13){
			$("#addplaylistbutton").click();
		}
	});

	/* show dropdown */
	$("#dropdownbutton").click(function(event){
		document.getElementById("dropdown").classList.toggle("show");
	});

});

