





function Music (title, artist, favourite) {
	this.title = title;
	this.artist = artist;
	this.favourite = favourite;

	this.changeTitle = function(name) {
		this.title = name;
	};

	this.changeArtist = function(name) {
		this.artist = name;
	};

	this.toggleFavourite = function() {
		if (this.favourite === true)
			this.favourite = false;
		else if (this.favourite === false)
			this.favourite = true;
	};
}





function Playlist (name) {
	this.name = name;
	this.music = [];


	this.refreshList = function() {
		var table = document.getElementById("musiclist");

		var button = document.getElementById("removemusicbutton");
		button.value = "Remove music";
		button.style.color = "black";
		button = document.getElementById("editmusicbutton");
		button.value = "Edit music";
		button.style.color = "black";
		document.getElementById("extraButtons").innerHTML = "";

		if (document.getElementById("radiotitle").checked===true) {
			this.music.sort(function(a, b){
				if(a.title.toUpperCase() < b.title.toUpperCase()) return -1;
				if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
				if(a.title.toUpperCase()==b.title.toUpperCase()) {
					if(a.artist.toUpperCase() < b.artist.toUpperCase()) return -1;
					if(a.artist.toUpperCase() > b.artist.toUpperCase()) return 1;
				}
				return 0;
			});
		}
		else {
			this.music.sort(function(a, b){
				if(a.artist.toUpperCase() < b.artist.toUpperCase()) return -1;
				if(a.artist.toUpperCase() > b.artist.toUpperCase()) return 1;
				if(a.artist.toUpperCase()==b.artist.toUpperCase()) {
					if(a.title.toUpperCase() < b.title.toUpperCase()) return -1;
					if(a.title.toUpperCase() > b.title.toUpperCase()) return 1;
				}
				return 0;
			});
		}

		for (var i = 1; i<table.rows.length;) {
			table.deleteRow(i);
		}
		if (table.rows[0].cells.length>4)
			table.rows[0].deleteCell(0);

		for (i = 0; i<this.music.length; i++) {
			var row = table.insertRow(-1);
			row.insertCell(0).innerHTML = this.music[i].title;
			row.insertCell(1).innerHTML = this.music[i].artist;
			if (this.music[i].favourite)
				row.insertCell(2).innerHTML = "✓";
			else
				row.insertCell(2).innerHTML = "-";
			row.insertCell(3).innerHTML = '<input class="playbutton" type="button" value="(*OwO*)<Go!" onclick="findYoutube(' + "'" + this.music[i].title + " " + this.music[i].artist + "'" + ')"/>';
		}
		document.getElementById("total").innerHTML = "Total " + i + " music.";

		document.getElementById("otherinfo").innerHTML = "";
	};



	this.findMusic = function(keyword) {
		this.refreshList();

		var indices  = [];
		var result = [];

		for (i = 0; i<this.music.length; i++) {
			if ((this.music[i].title.toUpperCase().indexOf(keyword)!=-1) || (this.music[i].artist.toUpperCase().indexOf(keyword)!=-1)) {
				indices.push(i);
				result.push(this.music[i]);
			}
		}

		if (keyword==="" || result.length===0)
			document.getElementById("otherinfo").innerHTML = "No music were found.";
		else {
			var output = "Found " + result.length + " music:<br/>";
			for (var i=0; i<result.length; i++)
				output += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<button class="search-results" onclick="highlightFound(' + indices[i] + ')">' + result[i].title + " - " + result[i].artist + "</button><br/>";
			document.getElementById("otherinfo").innerHTML = output;

			for (i=0; i<indices.length;i++) {
				var rows = document.getElementById("musiclist").getElementsByTagName("tr");
				rows[indices[i]+1].style.backgroundColor = "yellow";
			}

			document.getElementById("keyword").value = "";
		}

		return indices;
	};



	this.addMusicWithParams = function(title, artist, favourite) {
		var newmusic = new Music(title, artist, favourite);
		this.music.push(newmusic);

		document.getElementById("title").value = "";
		document.getElementById("artist").value = "";
		document.getElementById("favourite").checked = false;

		this.refreshList();
	};



	this.addMusic = function() {
		var title = document.getElementById("title").value;
		var artist = document.getElementById("artist").value;
		var favourite = document.getElementById("favourite").checked;

		if (title==="" || artist==="")
			window.confirm("Please enter all elements before adding a music.");
		else
			this.addMusicWithParams(title, artist, favourite);
	};


	this.removeMusic = function(i) {
		this.music.splice(i-1, 1);
		document.getElementById("total").innerHTML = "Total " + this.music.length + " music.";
	};


}





function MusicBox () {
	this.playlists = [];
	this.current = -1;
	this.mode = "default";

	/* set current playlist */
	this.setCurrent = function (playlist) {
		for (i=0; i<this.playlists.length; i++) {
			if (this.playlists[i]===playlist) {
				this.current = this.playlists[i];
				break;
			}
		}

		document.getElementById("current").innerHTML = this.current.name;
		this.current.refreshList();
		this.refreshSidebar();
	};

	/* refresh sidebar */
	this.refreshSidebar = function() {
		var playlists = document.getElementById("playlists");
		while (playlists.firstChild) {
			playlists.removeChild(playlists.firstChild);
		}

		var dropdown = document.getElementById("dropdown");
		while (dropdown.firstChild) {
			dropdown.removeChild(dropdown.firstChild);
		}

		for (var i=0; i<this.playlists.length; i++) {
			var newPlaylist = document.createElement('li');
			newPlaylist.innerHTML = this.playlists[i].name;
			newPlaylist.id = "playlist" + i;
			newPlaylist.name = i;

			newPlaylist.addEventListener("click", function() {
				for (var i=0; i<box.playlists.length; i++) {
					if (box.playlists[i].name===this.innerHTML)
						box.setCurrent(box.playlists[i]);
				}
			}, false);

			playlists.appendChild(newPlaylist);

			if (this.current.name!==this.playlists[i].name) {
				newPlaylist = document.createElement('a');
				newPlaylist.innerHTML = this.playlists[i].name;
				newPlaylist.id = "link" + i

				newPlaylist.addEventListener("click", function() {
					if (box.current==this);
					else if (box.current.music.length===0)
						window.confirm("No music to add!");
					else {
						for (var i=0; i<box.playlists.length; i++) {
							if (box.playlists[i].name===this.innerHTML)
								box.addToPlaylistMode(box.playlists[i]);
						}
					}
				}, false);

				dropdown.appendChild(newPlaylist);
			}
		}
	};

	this.removeMusicMode = function() {
		var current = this.current;

		if (current.music.length===0)
			window.confirm("No music to remove!");
		else {
			if (this.mode!=="default")
				current.refreshList();

			this.mode = "removeMusic";

			var row = document.getElementById("musiclist").rows;
			row[0].insertCell(0).innerHTML = "";

			for (i = 1; i<=current.music.length; i++) {
				var button = document.createElement('button');
				button.className = "removebutton";
				button.id = i;
				button.innerHTML = "x";

				button.addEventListener("click", function() {
					current.removeMusic(this.id);
					if (current.music.length>0)
						box.removeMusicMode();
					else
						document.getElementById("removemusicbutton").click();
				}, false);
				row[i].insertCell(0).appendChild(button);
			}

			var endbutton = document.getElementById("removemusicbutton");
			endbutton.value = "End removing";
			endbutton.style.color = "red";
		}
	};

	/* enter mode to edit music */
	this.editMusicMode = function() {
		if (this. current.music.length===0)
			window.confirm("No music to edit!");
		else {
			var cells = document.getElementById("musiclist").getElementsByTagName("td");
			for (var i = 0; i < cells.length; i++) {
				if (cells[i].cellIndex===0 || cells[i].cellIndex===1) {
					cells[i].onclick = function() {
						for (var j=0; j<cells.length; j++) {
							var c = cells[j];
							if ((c.cellIndex===0 || c.cellIndex===1) && c.firstChild.nodeName!=="#text")
								c.innerHTML = c.name;
						}

						this.name = this.innerHTML.slice();
						this.innerHTML = '<input type="text" id="change" value="" />';
						var change = document.getElementById("change");
						change.focus();

						change.onkeydown = function(event) {
							if(event.keyCode == 13){
								var cell = this.parentNode;
								if (this.value==="") 
									cell.innerHTML = cell.name;
								else {
									cell.innerHTML = this.value;

									var row = cell.parentNode.rowIndex;
									var column = cell.cellIndex;

									if (column===0)
										box.current.music[row-1].changeTitle(this.value);
									else if (column==1)
										box.current.music[row-1].changeArtist(this.value);

									box.current.refreshList();
									box.editMusicMode();
								}
							}
						};
					};

				}
				else if (cells[i].cellIndex===2) {
					cells[i].onclick = function(){
						box.current.music[this.parentNode.rowIndex - 1].toggleFavourite();

						if (this.innerHTML === "-") {
							this.innerHTML = "✓";
						}
						else {
							this.innerHTML = "-";
						}
					};
				}
			}

			var endbutton = document.getElementById("editmusicbutton");
			endbutton.value = "End editing";
			endbutton.style.color = "red";
		}
	};

	/* add new playlist */
	this.addPlaylist = function (name) {
		var makeNew = true;
		var current = this.current;

		for (var i=0; i<this.playlists.length; i++) {
			if (name==="") {
				window.confirm("Invalid name");
				makeNew = false;
			}
			else if (this.playlists[i].name===name) {
				window.confirm("Please choose a different name");
				makeNew = false;
			}
		}
		if (makeNew) {
			this.playlists.push(new Playlist(name));
			this.refreshSidebar();
			document.getElementById("playlistname").value = "";
		}
	};

	/* add music to another playlist */
	this.addToPlaylistMode = function(playlist) {
		var musicToAdd = [];

		if (this.mode!=="default")
			this.current.refreshList();

		this.mode = "addMusic";

		var row = document.getElementById("musiclist").rows;
		row[0].insertCell(0).innerHTML = "";


		for (i = 1; i<=this.current.music.length; i++) {
			var button = document.createElement('button');
			button.className = "addbutton";
			button.id = i;
			button.innerHTML = "Select";

			button.addEventListener("click", function() {
				var i = this.id;

				if (this.innerHTML==="Select") {
					musicToAdd.push(box.current.music[i-1]);
					document.getElementById("musiclist").rows[i].style.backgroundColor = "#01DD03";
					this.innerHTML = "Deselect";
				}
				else {
					for (var j=0; j<musicToAdd.length; j++) {
						if (musicToAdd[j]===box.current.music[i-1])
							musicToAdd.splice(j, 1);
					}
					this.innerHTML = "Select";
					document.getElementById("musiclist").rows[i].style.backgroundColor = "transparent";
				}
			}, false);

			row[i].insertCell(0).appendChild(button);
		}

		var OKbutton = document.createElement('input');
		OKbutton.value = "Add to playlist";
		OKbutton.type = "button";
		OKbutton.className = "sidebar-button";
		OKbutton.id = "OKbutton";
		OKbutton.style.color = "green";
		document.getElementById("extraButtons").appendChild(OKbutton);

		OKbutton.addEventListener("click", function() {
			playlist.music.push.apply(playlist.music, musicToAdd);
			box.current.refreshList();
			box.mode = "default";
		}, false);


		var cancelButton = document.createElement('input');
		cancelButton.value = "Cancel";
		cancelButton.type = "button";
		cancelButton.id = "cancelButton";
		cancelButton.className = "sidebar-button";
		cancelButton.style.color = "red";
		document.getElementById("extraButtons").appendChild(cancelButton);

		cancelButton.addEventListener("click", function() {
			box.current.refreshList();
			box.mode = "default";
		}, false);

	};

	this.removePlaylistMode = function () {
		var target;

		for (i = 0; i<box.playlists.length; i++) {
			target = document.getElementById("playlist" + i);
			target.innerHTML = "x  " + target.innerHTML;
			target.style.backgroundColor = "pink";
			target.onmouseover = function() {
				this.style.backgroundColor = "red";
				this.style.color = "pink";
			};
			target.onmouseout = function() {
				this.style.backgroundColor = "pink";
			};
			target.onclick = function() {
				var changeCurrent = false;
				if (box.playlists[this.name]===box.current)
					changeCurrent = true;

				box.playlists.splice(this.name, 1);
				var link = document.getElementById(this.id);
				link.parentNode.removeChild(link);

				if (changeCurrent)
					box.setCurrent(box.playlists[0]);

				box.refreshSidebar();
			};
		}
	};

	this.editPlaylistMode = function () {
		var target;

		for (i = 0; i<box.playlists.length; i++) {
			target = document.getElementById("playlist" + i);
			target.style.backgroundColor = "pink";
			target.name = i;

			target.addEventListener("click", function() {
				var currentValue = this.innerHTML.slice();
				document.getElementById("playlists").childNodes[this.name].innerHTML = '<input type="text" id="change" value="" />';
				var change = document.getElementById("change");
				change.name = this.name;
				change.focus();

				change.onkeydown = function(event) {
					if(event.keyCode == 13){
						if (this.value!=="") {
							box.playlists[this.name].name = this.value;
							box.refreshSidebar();
							box.setCurrent(box.playlists[this.name]);
						}
					}
				};
			}, false);
		}
	};

}









