# You-Tube-PLayer
## Running Instructions
  - First clone the repository to your local machine.
  - Upon completion, go inside the cloned directory and run **node server.js**.
  - The command will start the server at port 8080. Open browser and hit at **http://localhost:8080/**.
## Player Features:
- ### Login Screen:
  This is the first screen for the you tube player app. User is required to enter his/her credentials. For the demo purpose user can enter anything. Upon successfull login this screen will direct to home screen of user.
- ### Home Screen:
  This is the screen which is displayed after login screen. It contains personalized content of user. The left panel is for displaying user library which contains multiple you tube videos.
  PlayAll button, Add new Video(plus sign) button and clickable video list comprises the left panel. The right side of screen is reserved for showing the current video which is being played.
  - #### PlayAll Button:
    Upon clicking this button,the videos are played sequentially in the current playlist, starting from the first video. The button is hidden and is visible only when library consists of atleast one video.
  - #### Add Video(Plus sign):
    Initially when home screen is loaded, the playlist is empty, so the user can click on this icon to add new video to the playlist. At any time, user can click this button and add any song to the playlist.
  - #### Modal:
    This is a popup which is opened when plus sign is clicked. The modal contain video url/id, title, start time and end time fields. User is required to enter values in all the fields. Upon clicking the save button, the video is added into the playlist and is visible in the left panel. If the video url/id is incorrect or invalid, the controller handles it accordingly.
  - #### List Item
    Each list item in the left panel is a video object. Upon clicking any item in the list, the playing video stops,if any, and clicked video starts playing.
  - #### Prev and Next Button
    These two buttons are for playing the previous or next video to the currently playing video. Previous button is hidden if first video is playing, likewise Next button is hidden if last video is playing.
  - #### Title and View Count
    The title and view Count is displayed on top of the playing video. This is a dynamic feature, whose value changes with the current video's title and view Count.
  - #### Completion Message
    Upon completing all the videos ,i.e, playing till the last video a completion message is shown to the user to notify him that the playlist has ended and he may restart the playlist again.
## Cases Covered:
   - The sequential playing of videos starting from the very first video being added.
   - The next video is played if current video ends, with the end time specified while enterring fieldvalues in modal popup.
   - The url field in modal popup accepts both url and video id.
   - Upon any video related error, the next video in the playlist is played immediately. 
   - Upon any errorneous entry in  modal popup, next video in playlist is played.
