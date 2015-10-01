<?php
	/* Distrubution script packager */
	$scripts = ['LightMod','library/library','classes/application','classes/module','classes/viewParser/abstractElement','classes/viewParser/input','classes/viewParser/button','classes/viewParser/module','classes/viewParser/repeater','classes/viewParser/text'];
	
	$distFileStr = 'LightMod = (function() {'.PHP_EOL;
	
	$root = 'c:/users/francis astin/documents/light mod/';
	
	foreach($scripts as $script) {
		$file = $root.'/engine/'.$script.'.js';
		$distFileStr .= file_get_contents($file) .PHP_EOL;
	}
	
	$distFileStr .= 'return LightMod;'.PHP_EOL.'}());';
	
	$distFile = fopen($root.'dist/LightMod.js', "w");

	fwrite($distFile, $distFileStr);
	?>