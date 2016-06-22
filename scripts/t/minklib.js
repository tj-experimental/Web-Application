$(function() {
  	br = document.getElementById("__browse");
	cf = document.getElementById("cfl");
	cd = document.getElementById("cfd");
	upl = document.getElementById("upl");
	$('#formfs').on('submit', file_upload);
});

function init() {
    var sorter = tsorter.create('list');
}    
window.onload = init;


function foldericon(__box) {
	var html = '<img style="float:none;vertical-align:middle"'
			+ 'src="/img/image.png" alt="Folder "/>&nbsp;';
	__box.innerHTML = html;
	var row = $('#all_text tr')[0];
	var box = row.cells[1].innerHTML
}

function fileicon(box) {
	var html = '<img src=img/images.png>';
	box.innerHTML = html;
}

function alert_show(message) {
	var warn = '<span style="color: red;">' + message + '</span>';
	cf.innerHTML = warn;
	cd.innerHTML = warn;
	upl.innerHTML = warn;
}
function alert_hide() {
	upl.innerHTML = "";
	cf.innerHTML = "";
	cd.innerHTML = "";
}
function file_upload(event) {
	
	var fullPath = document.getElementById('__browse').value;
	//if(event.data != undefined)
	if (fullPath != "") {
		var size = document.getElementById("__browse").files[0].size;
		{
			if (size == 0) {
				size = "0.0 B";
			} else {
				var e = Math.floor(Math.log(size) / Math.log(1024));
				var size = (size / Math.pow(1024, e)).toFixed(1) + ' '
						+ ' KMGTP'.charAt(e) + 'B';
			}
		}
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath
				.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		var filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
		
			var split = filename.split(".");
			var str = split[0].substring(0, 16);
			var form = this;
			var fname = split[0];
			var form_data = new FormData(form);
		$.ajax({
			url : 'file_upload.cgi' + fname,
			type : 'POST',
			data : form_data,
			processData : false,
			contentType : false,
			success : function() {
				create_data(str, split);
			},
			error : function(xhr, type) {
				   alert("Error Uploading the File");
			},
			complete : function(xhr, type){
				}
		});
		//else if(event.data == undefined)
	} else if(fullPath == "") {
		var message = "Please Select a File";
		alert_show(message);
	}
	event.preventDefault()
}

function cfile() {
	var str = document.getElementById("createfile").value;
	var split = str.split(".");
	switch (true) {
	case (str == ""):
		var message = "Please Enter File Name";
		alert_show(message);
		break;
	case (split[1] == undefined && str != ""):
		split[1] = "txt";
	    var ext = ".";
	    var str= str.concat(ext,split[1]);
	    create_data(str, split);
	    break;
	case (str != "" && split[1] != undefined):
		create_data(str, split);
		break;
	default:
		var modal = document.getElementById('test1');
		modal.style.display = "none";
		break;
	}
}

function create_data(str , split){
	for (i = 0; i < 1; ++i) {
		$('#all_text')
				.append(
						'<tr>'
								+ '<td><img src=img/images.png></td>'
								+ '<td>'
								+ str
								+ '</td>'
								+ '<td>0.0 KB</td>'
								+ '<td>'
								+ split[1]
								+ '</td>'
								+ '<td><input id="download" type="button" class="button" value="Download" onclick= "download_file()"/><input id="delete" style="float: right" type="button" class="button3" value="Delete" onclick= "delete_file()"/></td>'
								+ '<td>/'+ str +'</td>'
								+ '</tr>');

	}
	alert_hide();
	document.getElementById("createfile").value = "";
	var modal = document.getElementById('test1');
	modal.style.display = "none";
	
}

function cfolder() {
	var str = document.getElementById("createfolder").value;
	if (str == "") {
		var message = "Please Enter Folder Name";
		alert_show(message);
	} else {
		var split = str.split(".");
		for (i = 0; i < 1; ++i) {
			$('#all_text')
					.append(
							'<tr>'
									+ '<td><img src=img/image.png></td>'
									+ '<td>'+ str + '</td>'
									+ '<td>0.0 KB</td>'
									+ '<td></td>'
									+ '<td><input id="download" type="button" class="button" value="Download" onclick= "download_file()"/> <input id="delete" style="float: right" type="button" class="button3" value="Delete" onclick= "delete_folder()"/></td>'
									+ '<td>/'+ str +'</td>'
									+ '</tr>');
		}
		alert_hide();
		document.getElementById("createfolder").value = "";
		var modal = document.getElementById('test2');
		modal.style.display = "none";
	}
}

function delete_file() {
	var table = document.getElementById("list");
	var rows = table.getElementsByTagName('tbody')[0]
			.getElementsByTagName('tr');
	delete_action(table, rows);
}

function delete_folder() {
	var table = document.getElementById("list");
	var rows = table.getElementsByTagName('tbody')[0]
			.getElementsByTagName('tr');
	delete_action(table, rows);
}

function delete_action(table, rows) {
	for (i = 0; i < rows.length; i++) {
		rows[i].onclick = function() {
			var r = this.rowIndex;
			table.deleteRow(r);
		}
	}
}

function download_file() {

}

function upload_file() {
	var modal = document.getElementById('test');
	var btn = document.getElementById("uploadf");
	var span = document.getElementsByClassName("close")[0];
	var er = document.getElementById("__fname");
	area(modal, btn, span, er);
}

function area(modal, btn, span, er) {
	btn.onclick = function() {
		modal.style.display = "block";
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		er.value = "";
		br.value = "";
		alert_hide();
		modal.style.display = "none";
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			er.value = "";
			br.value = "";
			alert_hide();
			modal.style.display = "none";
		}
	}
}

function create_file() {
	var modal = document.getElementById('test1');
	var btn = document.getElementById("upload1");
	var span = document.getElementsByClassName("close1")[0];
	var er = document.getElementById("createfile");
	area(modal, btn, span, er);
}

function create_folder() {
	// Get the test div
	var modal = document.getElementById('test2');
	// Get the button that opens the modal
	var btn = document.getElementById("upload2");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close2")[0];
	// When the user clicks the button, open the modal
	var er = document.getElementById("createfolder");
	// When the box is close delete the folder name
	// var bx = document.getElementById("cfd");
	// Remove the alert message
	area(modal, btn, span, er);
}

/*function file_read(path, fs ) {
 var tr = $('#stat' + port)[0];

 $.ajax({
 type : 'GET',
 url : 'get_status.cgi',
 data : {
 port : port
 },
 dataType : 'json',
 timeout : 250,
 context : $('body'),
 success : function(data) {
 tr.cells[1].innerHTML = data.state;
 if (data.hasOwnProperty('kernel')) {
 tr.cells[2].innerHTML = 'ThinkOS-' + data.kernel.version.major
 + '.' + data.kernel.version.minor + '.'
 + data.kernel.version.build;
 tr.cells[3].innerHTML = data.kernel.ticks;
 } else {
 tr.cells[2].innerHTML = '?.?.?';
 tr.cells[3].innerHTML = '?';
 }
 if (data.hasOwnProperty('app')) {
 tr.cells[4].innerHTML = 'DevSim-' + data.app.version.major
 + '.' + data.app.version.minor + '.'
 + data.app.version.build;
 tr.cells[5].innerHTML = data.app.uptime;
 } else {
 tr.cells[4].innerHTML = '?.?.?';
 tr.cells[5].innerHTML = '?';
 }
 },
 error : function(xhr, type) {
 stdout_flush_tmo[port] = 5000;
 }
 });
 }
 */
var tsorter=function(){"use strict";var a,b,c,d=!!document.addEventListener;return Object.create||(Object.create=function(a){var b=function(){return void 0};return b.prototype=a,new b}),b=function(a,b,c){d?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},c=function(a,b,c){d?a.removeEventListener(b,c,!1):a.detachEvent("on"+b,c)},a={getCell:function(a){var b=this;return b.trs[a].cells[b.column]},sort:function(a){var b=this,c=a.target;b.column=c.cellIndex,b.get=b.getAccessor(c.getAttribute("data-tsorter")),b.prevCol===b.column?(c.className="ascend"!==c.className?"ascend":"descend",b.reverseTable()):(c.className="ascend",-1!==b.prevCol&&"exc_cell"!==b.ths[b.prevCol].className&&(b.ths[b.prevCol].className=""),b.quicksort(0,b.trs.length)),b.prevCol=b.column},getAccessor:function(a){var b=this,c=b.accessors;if(c&&c[a])return c[a];switch(a){case"link":return function(a){return b.getCell(a).firstChild.firstChild.nodeValue};case"input":return function(a){return b.getCell(a).firstChild.value};case"numeric":return function(a){return parseFloat(b.getCell(a).firstChild.nodeValue,10)};default:return function(a){return b.getCell(a).firstChild.nodeValue}}},exchange:function(a,b){var c,d=this,e=d.tbody,f=d.trs;a===b+1?e.insertBefore(f[a],f[b]):b===a+1?e.insertBefore(f[b],f[a]):(c=e.replaceChild(f[a],f[b]),f[a]?e.insertBefore(c,f[a]):e.appendChild(c))},reverseTable:function(){var a,b=this;for(a=1;a<b.trs.length;a++)b.tbody.insertBefore(b.trs[a],b.trs[0])},quicksort:function(a,b){var c,d,e,f=this;if(!(a+1>=b)){if(b-a===2)return void(f.get(b-1)>f.get(a)&&f.exchange(b-1,a));for(c=a+1,d=b-1,f.get(a)>f.get(c)&&f.exchange(c,a),f.get(d)>f.get(a)&&f.exchange(a,d),f.get(a)>f.get(c)&&f.exchange(c,a),e=f.get(a);;){for(d--;e>f.get(d);)d--;for(c++;f.get(c)>e;)c++;if(c>=d)break;f.exchange(c,d)}f.exchange(a,d),b-d>d-a?(f.quicksort(a,d),f.quicksort(d+1,b)):(f.quicksort(d+1,b),f.quicksort(a,d))}},init:function(a,c,d){var e,f=this;for("string"==typeof a&&(a=document.getElementById(a)),f.table=a,f.ths=a.getElementsByTagName("th"),f.tbody=a.tBodies[0],f.trs=f.tbody.getElementsByTagName("tr"),f.prevCol=c&&c>0?c:-1,f.accessors=d,f.boundSort=f.sort.bind(f),e=0;e<f.ths.length;e++)b(f.ths[e],"onFocus",f.boundSort)},destroy:function(){var a,b=this;if(b.ths)for(a=0;a<b.ths.length;a++)c(b.ths[a],"onFocus",b.boundSort)}},{create:function(b,c,d){var e=Object.create(a);return e.init(b,c,d),e}}}();