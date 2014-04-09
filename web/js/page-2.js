App.populator('page2', function (page) {
	var user_info = $(page).find('.holder');
	var current_friend;
	kik.getUser(function(user){
		if (!user){
			console.log("Denied");
		} else {
			renderUser(user);

		}
	});
	var chat = $(page).find('.chat');
	$(chat).on("click", function(){
		kik.openConversation(current_friend.username);
	})
	var friend_picker = $(page).find('#friend-picker');
	$(friend_picker).on("click",function(){
		
		kik.pickUsers({minResults : 1 , maxResults : 1   },function(users){
			if (!users){
				App.dialog({
					title : "Please Select a User", 
					okButton : "Ok"

				});
			} else {
				renderUser(users[0]);
			}		
		})
	});
	function renderUser(user){
			$(page).find('.profile-picture').css('background-image', 'url(' +user.thumbnail +')');
			$(user_info).find('.username').text(user.username);
			$(user_info).find('.fullName').text(user.fullName);
			$(user_info).find('.firstName').text(user.firstName);
			$(user_info).find('.lastName').text(user.lastName);		
			current_friend = user;
	}
});