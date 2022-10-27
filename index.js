var sentinel_id = document.getElementById("app-interact").getAttribute('data-sentinelid');
var server = document.getElementById("app-interact").getAttribute('data-server');
var walker = document.getElementById("app-interact").getAttribute('data-walkername');
var token = document.getElementById("app-interact").getAttribute('data-token');
var last_jid = null;

//say = "Arianna is growing up so fast. Today she's been trying to stand on her own. It fills me up with such a sense of joy to see my little girl blossom before me.";


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
    <button type="button" class="btn btn-outline-secondary" onclick="display_capture_modal()" style="
    background-color: #feb248;"><i class="fa fa-picture-o"></i> Capture a memory</button>
  <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#ask_tobu_modal"><i class="fa fa-microphone"></i> Ask Tobu</button>

    </ul>
</div>
</div>

</nav><!-- NAVBAR-->
<div style="padding-bottom: 20%"></div>

<div>

<div class="btn-group" style="padding-bottom: 10px;">


<div class="modal fade" id="ask_tobu_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document" style="height: 18%;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ask Tobu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-footer" style="padding-right: 20%">
      <!-- User input box -->
          <div style="display: inline;float: left;height: 47px;width: 25px;background-color: whitesmoke;margin-right: 80px;" class="fa fa-microphone" onclick="mic_click()"></i> </div> 
          <input id="query__inputField" style="width: 500px;float: left;border-color: whitesmoke;height: 47px;border-width: 0px;"" type="text" name="msg" placeholder="ask Tobu about your memories">
          <div style="display: inline;float: left;height: 47px; width: 25px;"><button type="button" class="btn btn-outline-secondary" onclick="sendButton()">Send</button></div>
      </div>
    </div>
  </div>
</div>

  
<!-- Capture Memory Modal -->
  <div class="modal fade" id="createMemoryModal" tabindex="-1" aria-labelledby="createMemoryModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="createMemoryModalLabel"> Capture a memory</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
        <!-- <button type="button" class="btn btn-outline-secondary">Add Photo/Video</button> -->
          
        <input type="file" name="" id="fileId" onchange="imageUploaded()">
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

<!-- Memory Modal -->
<div class="modal fade" id="memoryModal" tabindex="-1" aria-labelledby="memoryModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <p class="modal-title" id="memoryModal_title"></p>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      
      <div class="card mb-3">
  <img id="memoryModal_photo" src="./images/tobu_iconic_logo.jpg" class="card-img-top" alt="..." onclick='open_modal()'>
  <div class="card-body">
    <div style="display: inline;float: right;">
      <a type="text" class="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
      <div class="dropdown-menu">
        <a class="dropdown-item" onclick="readOutLoud(say)">Narrate</a>
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#">Delete</a>
      </div>
    </div>
    <h5 id="memoryModal_subject" class="card-title" style="margin-bottom: 0px;"></h5>
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-smile-o" style="color: orange;"></i></span><span id="memoryModal_date">23 Oct, 2022</span><span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span><span id="memoryModal_where">Ann Arbor, MI</span></small></p>

<p class="card-text"></p>
    <p id="memoryModal_description" class="card-text"></p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>

  <div id="memoryModal_related_memories" class="card-footer" style="margin-bottom: 1%;">
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
    <div id="photos">
    
      <div class="tb">
        <div class="tr">
          <div class="td" style="background-image: url('./images/tobu_iconic_logo.jpg')"></div>
          <div class="td" style="background-image: url('./images/tobu_iconic_logo.jpg')"></div>
          <div class="td" style="background-image: url('./images/tobu_iconic_logo.jpg')"></div>
        </div>

        <div class="tr">
        <div class="td" style="background-image: url('./images/tobu_iconic_logo.jpg')"></div>
        <div class="td" style="background-image: url('./images/tobu_iconic_logo.jpg')"></div>
        <div class="td" style="background-image: url('./images/tobu_iconic_logo.jpg')"></div>
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


<div id="all_memories"></div>

</div>
`;

var chat_messages = [];
var create_memory_images = [];

//fetches and renders memories in the feed area
function display_memory_feed() {
  var memories = [];
  
  walker_get_memories().then((result) => {
    
    memories = result.report[0];  
    render_memories(memories);

  }).catch(function (error) {
    console.log(error);
  });
}

//takes an array of memories and renders memory posts in the memory feed.
function render_memories(memories) {

  for (let i = 0; i < memories.length; i++) {

    m_keys = Object.keys(memories[i]);

    if (m_keys.includes("releatedMemories")){
      related_memories = memories[i]["releatedMemories"];
      r_memories = ``;

      if(related_memories.length > 0) {
        
        for (let r = 0; r < related_memories.length; r++) {
          r_memories = r_memories + `<div class="td" onclick="display_memory_modal('${related_memories[i]["id"]}')"></div>`;
        }

        card_footer = `
        <div class="card-footer" style="margin-bottom: 1%;">
        <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
        <div id="photos">
          <div class="tb">
            <div class="tr">
              ${r_memories}
            </div>
            
          </div>
        </div>
      </div>
        `;
      }
      else{
        card_footer = ``;
      }
    }

    if (m_keys.includes("file_ids")){

      walker_get_base64(memories[i]["file_ids"]).then((result) => {

        console.log(result.report[0][0]['context']['base64']);

        $("#all_memories").append(
          `
          <div class="card mb-3">
          <img src="data:image/png;base64,"+ ${result.report[0][0]['context']['base64']}" class="card-img-top" alt="..." onclick='display_memory_modal(${memories[i]["id"]})'>
          <div class="card-body">
            <h5 class="card-title" style="margin-bottom: 0px;"><a href="javascript:display_memory_modal('${memories[i]["id"]}')">${memories[i]["subject"]}</a></h5>
            <p class="card-text"><small class="text-muted"><span><i class="fa fa-smile-o" style="color: orange;"></i></span>${memories[i]["date"]}<span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span>${memories[i]["where"]}</small></p>
            <p class="card-text"></p>
            <p class="card-text">${memories[i]["summary"]}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
          ${card_footer}

        </div> 
          `
        );
      
      
      }).catch(function (error) {
          console.log(error);
      });

    } else {

      $("#all_memories").append(
        `
        <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title" style="margin-bottom: 0px;"><a href="javascript:display_memory_modal('${memories[i]["id"]}')">${memories[i]["subject"]}</a></h5>
          <p class="card-text"><small class="text-muted"><span><i class="fa fa-smile-o" style="color: orange;"></i></span>${memories[i]["date"]}<span><i class="fa fa-map-marker" style="padding-left: 2%;"></i></span>${memories[i]["where"]}</small></p>
          <p class="card-text"></p>
          <p class="card-text">${memories[i]["summary"]}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        ${card_footer}

      </div> 
        `
      );
    }
  }
}

//displays the capture a memory modal
function display_capture_modal() {
  
  //reset the conversation
  chat_messages = [];
  create_memory_images = [];

  $('#createMemoryModal').modal('show');

  walker_run_talk('talk', "Document a memory").then((result) => {
    chat_messages.push(["bot", result.report[0]['response']]);  
    update_messages();
  }).catch(function (error) {
      console.log(error);
  });
  
}

function display_memory_modal(id) {
  
  $('#memoryModal_title').text('TThis is the title');
  $('#memoryModal_subject').text('This is the subject');
  $('#memoryModal_date').text('23 Oct, 2022');
  $('#memoryModal_where').text('Ann Arbor, MI');
  $('#memoryModal_description').text('This is the full description');
  $('#memoryModal').modal('show');
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



function walker_get_memories() {

  query = `
  {
    "name": "get_memories",
    "ctx": {}
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



function walker_get_base64(fild_id) {

  query = `
  {
    "name": "get_file",
    "ctx": {
        "file_id": "${fild_id}"
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


display_memory_feed();