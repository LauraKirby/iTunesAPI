$(function() {
  //alert("The javascript file that you send to the client will be in public/js/songs.js");
  function playNewSong() {
		mackActive("playing"); 
		downloadAndPlaySong(); 
		$("userInput")
	};


				

	// $("audio").on("canplay", function(){
	// 			$("audio")[0].play();

	$(".startButton").on("click", function(event){
		event.preventDefault(); 

				$("audio")[0].play();
  

	// 		// var albumImage = dataObj.artworkUrl30; 
	// 		// console.log(albumImage); 
	// 		// $("img").attr("src", albumImage); 
	// 		// $("img").show();
	 	})
	}); 
