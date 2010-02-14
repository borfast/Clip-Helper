// CLIP Helper
// version 1.0.1
// 2009-02-09
// Copyright (c) 2008, Raul Pedro Santos
// Released under the GPL 3.0 license
// http://www.gnu.org/copyleft/gpl.html
//
//
// Thanks to Ricardo Martins (http://scarybox.net) for spotting a bottleneck!
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CLIP Helper", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CLIP Helper
// @namespace     http://www.borfast.com/clip-helper
// @description   Script utilitário para a escolha dos turnos no sistema CLIP da UNL.
// @include			https://clip.unl.pt/utente/eu/aluno/acto_curricular/inscri%E7%E3o/turnos*
// ==/UserScript==



// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	allCells = $('.celulaDeCalendario');
	sz = allCells.length;
	
	pairs = [];
	$.each(allCells, function(i, val) {
		pairs[i] = '';
		elem = this;
		
		$.each(allCells, function(j, secval) {
			inner = $(this).html();
			outter = $(elem).html();

			if (i != j && inner == outter)
			{
				pairs[i] += j+'-';
				//GM_log('pairs['+i+']='+pairs[i]+' AND i='+i+':'+$(kids[0]).text()+'+'+$(kids[2]).text()+' AND j='+j+':'+$(mykids[0]).text()+'+'+$(mykids[2]).text());
			}
		});

		var originalBG = $(this).css("background-color");
		var fadeColor = "#9AA6C9";

		$(this).hover(
			function() {
				var originalBG = $(this).css("background-color");
				$(this).css('background-color', fadeColor);
				
				mypairs = pairs[i].split('-');
				$.each(mypairs, function(z, index) {
					$(allCells[index]).css('background-color', fadeColor);
				});
			},
			function() {
				$(this).css('background-color', originalBG);
				
				mypairs = pairs[i].split('-');
				$.each(mypairs, function(z, index) {
					$(allCells[index]).css('background-color', originalBG);
				});
			}
		);
	});
}
