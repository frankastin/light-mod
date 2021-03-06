<?php

	/* Distrubution script packager */

	$scripts = ['LightMod','library/library','classes/application','classes/module','classes/viewParser/abstractElement','classes/viewParser/module','classes/viewParser/input','classes/viewParser/button','classes/viewParser/repeater','classes/viewParser/text','classes/viewParser/element'];
	
	$distFileStr = 'LightMod = (function() {'.PHP_EOL;
	
	$root = 'c:/projects/light-mod/';
	
	foreach($scripts as $script) {
		$file = $root.'/engine/'.$script.'.js';
		$distFileStr .= file_get_contents($file) .PHP_EOL;
	}
	
	$distFileStr .= 'return LightMod;'.PHP_EOL.'}());';
	
	$distFile = fopen($root.'dist/LightMod.js', "w");

	fwrite($distFile, $distFileStr);
	
	$extraDistFile = fopen('c:\projects\zen-typing\js\lib\lightmod.js', "w");

	fwrite($extraDistFile, $distFileStr);
?>