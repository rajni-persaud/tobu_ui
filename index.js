var sentinel_id = document.getElementById("app-interact").getAttribute('data-sentinelid');
var server = document.getElementById("app-interact").getAttribute('data-server');
var walker = document.getElementById("app-interact").getAttribute('data-walkername');
var token = document.getElementById("app-interact").getAttribute('data-token');
var last_jid = null;

say = "Arianna is growing up so fast. Today she's been trying to stand on her own. It fills me up with such a sense of joy to see my little girl blossom before me.";

// // Replace the script tag with the app
document.getElementById('app-interact').parentNode.innerHTML = `
<!-- NAVBAR--><nav class="navbar navbar-expand-sm navbar-dark">
<div class="container">
<a href="./home.html" class="navbar-brand">
    <!-- Logo Image -->
    <img src="./images/tobu_logo_w.png" width="30" height="30" alt="" class="d-inline-block align-middle mr-2">
</a>

<button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

<div id="navbarSupportedContent" class="collapse navbar-collapse">
    <ul class="navbar-nav ml-auto">
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#createMemoryModal" style="
    background-color: #feb248;"><i class="fa fa-picture-o"></i> Capture a memory</button>
  <button type="button" class="btn btn-outline-secondary"><i class="fa fa-microphone"></i> Ask Tobu</button>

    </ul>
</div>
</div>

</nav><!-- NAVBAR-->
<div style="padding-bottom: 20%"></div>

<div>

<div class="btn-group" style="padding-bottom: 10px;">
  
  <!-- Modal -->
  <div class="modal fade" id="createMemoryModal" tabindex="-1" aria-labelledby="createMemoryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="createMemoryModalLabel"> Capture a memory</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
        <!-- <button type="button" class="btn btn-outline-secondary">Add Photo/Video</button> -->
          
        <input type="file" name="" id="fileId" 
        onchange="imageUploaded()">
    <br><br>
  

          <div id="photos">
            <div class="tb">
              <div class="tr">
                <div id="photo_1" class="td"></div>
                <div id="photo_2" class="td"></div>
                <div id="photo_3" class="td"></div>
              </div>
            </div>
          </div>

          <div id="chatbox"></div>

        </div>
        <div class="modal-footer" style="padding-right: 20%">
        <!-- User input box -->
            <div style="display: inline;float: left;height: 47px;width: 25px;background-color: whitesmoke;margin-right: 80px;" class="fa fa-microphone" onclick="mic_click()"></i> </div> 
            <input id="chatio__inputField" style="width: 500px;float: left;border-color: whitesmoke;height: 47px;border-width: 0px;"" type="text" name="msg" placeholder="describe your memory">
            <div style="display: inline;float: left;height: 47px; width: 25px;"><button type="button" class="btn btn-outline-secondary" onclick="sendButton()">Send</button></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <p class="modal-title" id="detailModalLabel"> Memory Details</p>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      
      <div class="card mb-3">
  <img src="./images/nexus_oct_2019.jpg" class="card-img-top" alt="..." onclick='open_modal()'>
  <div class="card-body">
    <h5 class="card-title" style="margin-bottom: 0px;">Arianna is growing up so fast</h5>
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-smile-o" style="color: orange;"></i></span>23 Oct, 2022<span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span>Ann Arbor, MI</small></p>

    <div style="display: inline;float: right;">
      <a type="text" class="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
      <div class="dropdown-menu">
        <a class="dropdown-item" onclick="readOutLoud(say)">Narrate</a>
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#">Delete</a>
      </div>
    </div>

<p class="card-text"></p>
    <p class="card-text">Today she's been trying to stand on her own. It fills me up with such a sense of joy to see my little girl blossom before me.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>

  <div class="card-footer" style="margin-bottom: 1%;">
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
    <div id="photos">
      <div class="tb">
        <div class="tr">
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
        </div>

        <div class="tr">
        <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
        <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
        <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
      </div>

      </div>
    </div>
  </div>
</div> 
      </div>

    </div>
  </div>
</div>
</div>




<div class="card mb-3">
  <img src="./images/nexus_oct_2019.jpg" class="card-img-top" alt="..." onclick='open_modal()'>
  <div class="card-body">
    <h5 class="card-title" style="margin-bottom: 0px;">Arianna is growing up so fast</h5>
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-smile-o" style="color: orange;"></i></span>23 Oct, 2022<span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span>Ann Arbor, MI</small></p>
    <p class="card-text"></p>
    <p class="card-text">Today she's been trying to stand on her own. It fills me up with such a sense of joy to see my little girl blossom before me.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
  <div class="card-footer" style="margin-bottom: 1%;">
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
    <div id="photos">
      <div class="tb">
        <div class="tr">
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')" onclick='open_modal()'></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')" onclick='open_modal()'></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')" onclick='open_modal()'></div>
        </div>
        
      </div>
    </div>
  </div>

</div> 

<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title" style="margin-bottom: 0px;" onclick="open_modal()">A text-based memory</h5>
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-frown-o" style="color: blue;"></i></span>13 Oct, 2022<span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span>Ann Arbor, MI</small></p>
    <p class="card-text"></p>
    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
  <div class="card-footer" style="margin-bottom: 1%;">
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
    <div id="photos">
      <div class="tb">
        <div class="tr">
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
        </div>
      </div>
    </div>
  </div>

</div> 

<div class="card mb-3">
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
        <img src="./images/tobu_logo.png" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="./images/nexus_oct_2019.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="./images/tobu_logo.png" class="d-block w-100" alt="...">
    </div>
  </div>
  </div>

  <div class="card-body">
    <h5 class="card-title" style="margin-bottom: 0px;">Arianna is growing up so fast</h5>
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-smile-o" style="color: orange;"></i></span>23 Oct, 2022<span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span>Ann Arbor, MI</small></p>
    <p class="card-text"></p>
    <p class="card-text">Today she's been trying to stand on her own. It fills me up with such a sense of joy to see my little girl blossom before me.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
  <div class="card-footer" style="margin-bottom: 1%;">
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
    <div id="photos">
      <div class="tb">
        <div class="tr">
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
          <div class="td" style="background-image: url('./images/nexus_oct_2019.jpg')"></div>
        </div>
        
      </div>
    </div>
  </div>

</div> 

</div>
`;

var chat_messages = [];
var create_memory_images = [];

walker_run_talk('talk', "I'd like to document a memory.").then((result) => {


  chat_messages.push(["bot", result.report[0]['response']]);
  

  update_messages();


}).catch(function (error) {
    console.log(error);
});


function open_modal(){
  $('#detailModal').modal('show');
}

function readOutLoud(message){
  speech = new SpeechSynthesisUtterance(message);
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

// ----------------- Microphone --------------------------
var inputField = document.getElementById('chatio__inputField');

var speechRecognition = window.webkitSpeechRecognition

var recognition = new speechRecognition()

var textbox = $("#chatio__inputField")

var content = ''

recognition.continuous = true

stat = true

recognition.onstart = function(){
    console.log("Recording start")
}

recognition.onend = function(){
    console.log("Recording end")
    sendButton()
    let userHtml = '<p class="userText"><span>' + inputField.value + '</span></p>';
    $("#chatbox").append(userHtml);
    content = ''
    textbox.val(content)
    stat = true
}

recognition.onresult = function(event){
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript
    content += transcript
    textbox.val(content)
}

function mic_click(){
  if(stat){
      if(content.length){
          content += ''
      }
  
      recognition.continuous = true
      recognition.start()
      stat = false   
  }
  else{
      recognition.stop()
  }
}

// ----------------- Microphone --------------------------

function update_messages() {
  conv = "";
  for (let i = 0; i < chat_messages.length; i++) {
      if(chat_messages[i][0] == "bot"){
          new_message = '<p class="botText"><span>' + chat_messages[i][1] + '</span></p>';
      }
      else{
          new_message = '<p class="userText"><span>' + chat_messages[i][1] + '</span></p>';
      }
      conv = conv + new_message;
    }
    document.getElementById("chatbox").innerHTML = conv;
    // document.getElementById("chat-bar-bottom").scrollIntoView(true);
    inputField.value = '';
}


function sendButton(){
  var utterance = inputField.value;
  if(utterance){
    chat_messages.push(["user", utterance]);
  }

  update_messages();

  walker_run_talk('talk', utterance).then((result) => {


    chat_messages.push(["bot", result.report[0]['response']]);
    

    update_messages();


  }).catch(function (error) {
      console.log(error);
  });

}



  
function imageUploaded() {

  var base64String = "";
let file_name = "";

    var file = document.querySelector(
        'input[type=file]')['files'][0];
  
    var reader = new FileReader();
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
  
        imageBase64Stringsep = base64String;

        create_memory_images.push(base64String);

        console.log(create_memory_images);
  
        // console.log(base64String);

        walker_run_upload("test", base64String).then((result) => {

          console.log(result.report[0][0]['context']['id']);


          for (let i = 0; i < create_memory_images.length; i++) {
            a = i + 1;
            image_src = 'data:image/png;base64,'+ create_memory_images[i];
            document.getElementById("photo_"+a).innerHTML = `<img src="${image_src}" style="height: 200px;">`;
          }

        }).catch(function (error) {
            console.log(error);
        });
    }

 
    reader.readAsDataURL(file);
    
}



function walker_run_talk(name, utterance="") {

  query = `
  {
    "name": "${name}",
    "ctx": {"question": "${utterance}"}
  }
  `;

  return fetch(`${server}/js/walker_run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

function walker_run_upload(name, base64="") {

  query = `
  {
    "name": "upload_files",
    "ctx": {
        "files": [
            {
             "name": "${name}",
             "base64": "${base64}" 
        }
    ]
    }
  }
  `;

  return fetch(`${server}/js/walker_run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}