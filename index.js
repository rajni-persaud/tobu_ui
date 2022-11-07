var sentinel_id = document.getElementById("app-interact").getAttribute('data-sentinelid');
var server = document.getElementById("app-interact").getAttribute('data-server');
var walker = document.getElementById("app-interact").getAttribute('data-walkername');
var token = document.getElementById("app-interact").getAttribute('data-token');
var last_jid = null;

// Javascript objects containing emotions. Each key has a value of type array. - [icon,]
emotions = {
  sad:["fa-frown-o", "blue"], 
  happy:["fa-smile-o", "orange"], 
  fear:["fa-frown-open", "green"], 
  anger:["fa-angry", "red"], 
  surprised:["fa-surprise", "yellow"]
};

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
  <div class="modal-dialog" role="document" style="height: 30%;">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ask Tobu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-footer" style="padding-right: 12%">
      <!-- User input box -->
      <span class="fa-stack fa-1x"><i id="query_mic-bg" class="fa fa-circle fa-stack-2x icon-background" style="margin-left: -10px; color: #ffffff;"></i><i id="query_mic-btn" class="fa fa-microphone fa-stack-1x" style="margin-left: -7px;" onclick="query_mic_click()"></i></span>
          <input id="query__inputField" style="width: 500px;float: left;border-color: whitesmoke;height: 47px;border-width: 0px;"" type="text" name="msg" placeholder="ask Tobu about your memories">
          <div style="display: inline;float: left;height: 47px; width: 25px;"><button type="button" class="btn btn-outline-secondary" onclick="ask_tobu()">Send</button></div>
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="display_memory_feed()"><span aria-hidden="true">&times;</span></button>
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
        <div class="modal-footer" style="padding-right: 10%">
        <!-- User input box -->
            <span class="fa-stack fa-1x"><i id="chat_mic-bg" class="fa fa-circle fa-stack-2x icon-background" style="margin-left: -13px; color: #ffffff;"></i><i id="chat_mic-btn" class="fa fa-microphone fa-stack-1x" style="margin-left: -5px;" onclick="chat_mic_click()"></i></span> 
            <input id="chatio__inputField" style="width: 950px;float: left;border-color: whitesmoke;height: 47px;border-width: 0px;" "="" type="text" name="msg" placeholder="describe your memory">
            <div style="display: inline;float: left;height: 47px; width: 25px;"><button type="button" class="btn btn-outline-secondary" onclick="chat_sendButton()">Send</button></div>
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
        <div id="memoryModal_details">
          <div class="card mb-3">
            <div id="memoryModal_image"></div>
            <div class="card-body">
              <div style="display: inline;float: right;">
                <a type="text" class="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                <div class="dropdown-menu">
                  <a id="memoryModal_btn_narrate" class="dropdown-item" href="#">Narrate</a>
                  <a id="memoryModal_btn_edit" class="dropdown-item" href="#">Edit</a>
                  <a id="memoryModal_btn_delete" class="dropdown-item" href="#">Delete</a>
                </div>
              </div>
              <h5 id="memoryModal_subject" class="card-title" style="margin-bottom: 0px;"></h5>
              <p class="card-text"><small class="text-muted"><span><i class="fa ${emotions["happy"][0]}" style="color: ${emotions["happy"][1]};"></i></span><span id="memoryModal_date">23 Oct, 2022</span><span><i class="fas fa-map-marker-alt" style="padding-left: 2%;"></i></span><span id="memoryModal_where">Ann Arbor, MI</span></small></p>

              <p class="card-text"></p>
              <p id="memoryModal_description" class="card-text"></p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            <div id="memoryModal_related_memories"></div>
          </div>
        </div>
        <div id="memoryModal_edit" style="display: none">
          <form>
            <div class="form-group">
              <label for="memory_subject">Subject</label>
              <input type="text" class="form-control" id="memory_subject" placeholder="Subject">
            </div>
            <div class="form-group">
              <label for="memory_description">Description</label>
              <textarea class="form-control" id="memory_description" rows="3"></textarea>
            </div>
          </form>
          <button class="btn btn-primary" onclick="save_memory_details()"><i class="fa fa-check-circle" aria-hidden="true"></i>Save Changes</button>
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
var upload_ids = [];

// get input from query field
var query_inputField = document.getElementById('query__inputField');

//fetches and renders memories in the feed area
function display_memory_feed() {
  var memories = [];
  
  walker_get_memories(query_inputField.value).then((result) => {
    
    memories = result.report[0];  
    render_memories(memories);

  }).catch(function (error) {
    console.log(error);
  });
}

//fetches and renders memories in the feed area based on a query
// function display_query_memories(question) {
//   var memories = [];
  
//   walker_query_memories(question).then((result) => {
    
//     memories = result.report[0]; 
//     render_memories(memories);

//   }).catch(function (error) {
//     console.log(error);
//   });
// }

//takes an array of memories and renders memory posts in the memory feed.
function render_memories(memories) {

  var imageData = null;
  //clear memory feed 
  $("#all_memories").html('');
  // console.log(memories);

  if(!memories) return;

  for (let i = 0; i < memories.length; i++) {
   
    m_keys = Object.keys(memories[i]);

    rendered_related_memories = ``;

    if (m_keys.includes("relatedMemories") && memories[i]["relatedMemories"] != null) {
      related_memories = memories[i]["relatedMemories"];
      rendered_related_memories = render_related_memories(related_memories);
    }

    if (m_keys.includes("file_ids") && memories[i]["file_ids"][0] != null) {
      imageData = null;
      
      walker_get_file(memories[i]["file_ids"]).then((result) => {
        imageData = result.report[0][0]['context']['base64'];
        
        if(imageData) {
        $("#all_memories").append(
          `
          <div class="card mb-3">
          <img src="data:image/jpeg;base64,${imageData}" class="card-img-top" alt="..." onclick=display_memory_modal('${memories[i]["id"]}')>
          <div class="card-body">
            <h5 class="card-title" style="margin-bottom: 0px;"><a href="javascript:display_memory_modal('${memories[i]["id"]}')">${memories[i]["subject"]}</a></h5>
            <p class="card-text"><small class="text-muted"><span><i class="fa ${emotions[memories[i]["how"]][0]}" style="color: ${emotions["happy"][1]};"></i></span>${memories[i]["date"]}<span><i class="fas fa-map-marker-alt" style="padding-left: 2%;"></i></span>${memories[i]["where"]}</small></p>
            <p class="card-text"></p>
            <p class="card-text">${memories[i]["summary"]}</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
          ${rendered_related_memories}

        </div> 
          `
        );
        } else {
          $("#all_memories").append(
            `
            <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title" style="margin-bottom: 0px;"><a href="javascript:display_memory_modal('${memories[i]["id"]}')">${memories[i]["subject"]}</a></h5>
              <p class="card-text"><small class="text-muted"><span><i class="fa ${emotions[memories[i]["how"]][0]}" style="color: ${emotions[memories[i]["how"]][1]};"></i></span>${memories[i]["date"]}<span><i class="fas fa-map-marker-alt" style="padding-left: 2%;"></i></span>${memories[i]["where"]}</small></p>
              <p class="card-text"></p>
              <p class="card-text">${memories[i]["summary"]}</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            ${rendered_related_memories}
    
          </div> 
            `
          );
        }
      
      
      }).catch(function (error) {
          console.log(error);
      });

    } else {

      $("#all_memories").append(
        `
        <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title" style="margin-bottom: 0px;"><a href="javascript:display_memory_modal('${memories[i]["id"]}')">${memories[i]["subject"]}</a></h5>
          <p class="card-text"><small class="text-muted"><span><i class="fa ${emotions[memories[i]["how"]][0]}" style="color: ${emotions[memories[i]["how"]][1]};"></i></span>${memories[i]["date"]}<span><i class="fas fa-map-marker-alt" style="padding-left: 2%;"></i></span>${memories[i]["where"]}</small></p>
          <p class="card-text"></p>
          <p class="card-text">${memories[i]["summary"]}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        ${rendered_related_memories}

      </div> 
        `
      );
    }
  }
}

function render_related_memories(related_memories) {
  var output = ``;
  var rm_output = ``;
  
  if(related_memories && related_memories.length > 0) {
        
    for (let r = 0; r < related_memories.length; r++) {
      if(related_memories[r]["id"]) rm_output = rm_output + `<div class="td" onclick="display_memory_modal('${related_memories[r]["id"]}')"></div>`;
    }

    output = `
    <div class="card-footer" style="margin-bottom: 1%;">
    <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
    <div class="related_memories">
      <div class="tb">
        <div class="tr">
          ${rm_output}
        </div>
        
      </div>
    </div>
  </div>
    `;
  }

  return output;

}

function ask_tobu(){
  // get input
  var query_inputField = document.getElementById('query__inputField');
  //close this modal
  $('#ask_tobu_modal').modal('hide');
      display_memory_feed();
  // clear query field after displaying feed 
  query_inputField.value = '';
}

//displays the capture a memory modal
function display_capture_modal() {
  
  //reset the conversation
  chat_messages = [];
  create_memory_images = [];
  upload_ids = [];

  walker_yield_clear().then((result) => {

    $('#createMemoryModal').modal('show');
    
    walker_run_talk('talk', "Document a memory", upload_ids).then((result) => {
      chat_messages.push(["bot", result.report[0]['response']]);
      readOutLoud(result.report[0]['response']); 

      update_messages();
    }).catch(function (error) {
        console.log(error);
    });
  
  }).catch(function(error) { console.log(error);});
}

//displays the detailed modal of the memory
function display_memory_modal(id) {

  memory = [];
  walker_get_memory(id).then((result) => {

    memory = result.report[0];  

    console.log(memory.file_ids);

    if(memory.file_ids && memory.file_ids.length > 0) {
      if(memory.file_ids[0]) {
        walker_get_file(memory.file_ids).then((result) => {
            $('#memoryModal_image').html(`<img src="data:image/png;base64,${result["report"][0][0]['context']['base64']}" class="card-img-top" alt="...">`)
        })
      }
    } else {
      $('#memoryModal_image').html(' ');
    }
    $('#memoryModal_title').text(memory.date);
    $('#memoryModal_subject').text(memory.subject);
    $('#memoryModal_date').text(memory.date);
    $('#memoryModal_where').text(memory.where);
    $('#memoryModal_description').text(memory.description);
    $('#memoryModal_related_memories').html(render_related_memories(memory.relatedMemories)); //Tim needs to spell this correctly

    $('#memoryModal_btn_narrate').on('click',function(){
      readOutLoud(memory.summary);
    });

    $('#memoryModal_btn_edit').on('click',function(){
      $('#memoryModal_title').text("Edit Memory");
      document.getElementById("memory_subject").value = memory.subject;
      document.getElementById("memory_description").value = memory.description;
      document.getElementById("memoryModal_edit").style.display = "block";
      document.getElementById("memoryModal_details").style.display = "none";
    });

    $('#memoryModal_btn_delete').on('click',function(){
      walker_delete_memory(memory.id).then((result) => {
        //close this modal
        $('#memoryModal').modal('hide');
        setTimeout(function() {
          display_memory_feed();
        }, 1500);
        
      }).catch(function(error) { console.log(error);});
    });

    $('#memoryModal').modal('show');
    
  }).catch(function (error) {
    console.log(error);
  });

}

function save_memory_details(){
  $('#memoryModal_title').text(memory.date);
  document.getElementById("memoryModal_edit").style.display = "none";
  document.getElementById("memoryModal_details").style.display = "block";
}

function readOutLoud(message){
  speech = new SpeechSynthesisUtterance(message);
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

var speechRecognition = window.webkitSpeechRecognition
// ----------------- Chat Microphone --------------------------

var chat_inputField = document.getElementById('chatio__inputField');
var chat_recognition = new speechRecognition()
var chat_textbox = $("#chatio__inputField")
var chat_content = ''

chat_recognition.continuous = true
chat_stat = true

chat_recognition.onstart = function(){
    console.log("Recording start")
    document.getElementById("chat_mic-btn").style.color = "#ffffff";
    document.getElementById("chat_mic-bg").style.color = "#365d96";
}

chat_recognition.onend = function(){
    console.log("Recording end")
    chat_sendButton();
    document.getElementById("chat_mic-btn").style.color = "#000000";
    document.getElementById("chat_mic-bg").style.color = "#ffffff";
    chat_content = ''
    chat_textbox.val(chat_content)
    chat_stat = true
}

chat_recognition.onresult = function(event){
    var chat_current = event.resultIndex;
    var chat_transcript = event.results[chat_current][0].transcript
    chat_content += chat_transcript
    chat_textbox.val(chat_content)
}

function chat_mic_click(){
  if(chat_stat){
      if(chat_content.length){
          chat_content += ''
      }
  
      chat_recognition.continuous = true
      chat_recognition.start()
      chat_stat = false   
  }
  else{
      chat_recognition.stop()
  }
}

// ----------------- Chat Microphone --------------------------

// ----------------- Query Microphone --------------------------

var query_inputField = document.getElementById('query__inputField');
var query_recognition = new speechRecognition()
var query_textbox = $("#query__inputField")
var query_content = ''

query_recognition.continuous = true
query_stat = true

query_recognition.onstart = function(){
    console.log("Recording start")
    document.getElementById("query_mic-btn").style.color = "#ffffff";
    document.getElementById("query_mic-bg").style.color = "#365d96";
}

query_recognition.onend = function(){
    console.log("Recording end")
    ask_tobu();
    document.getElementById("query_mic-btn").style.color = "#000000";
    document.getElementById("query_mic-bg").style.color = "#ffffff";
    query_content = ''
    query_textbox.val(chat_content)
    query_stat = true
}

query_recognition.onresult = function(event){
    var query_current = event.resultIndex;
    var query_transcript = event.results[query_current][0].transcript
    query_content += query_transcript
    query_textbox.val(query_content)
}

function query_mic_click(){
  if(query_stat){
      if(query_content.length){
          query_content += ''
      }
  
      query_recognition.continuous = true
      query_recognition.start()
      query_stat = false   
  }
  else{
      query_recognition.stop()
  }
}

// ----------------- Query Microphone --------------------------


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
    chat_inputField.value = '';
}


function chat_sendButton(){
  var utterance = chat_inputField.value;

  if(utterance){
    chat_messages.push(["user", utterance]);
  }

    update_messages();

    walker_run_talk('talk', utterance, upload_ids).then((result) => {
      chat_messages.push(["bot", result.report[0]['response']]);
      readOutLoud(result.report[0]['response']); 

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

      walker_run_upload(Date.now(), base64String).then((result) => {

        console.log(result.report[0][0]['context']['id']);

        if(create_memory_images.length > 0){
          upload_ids = new Array(result.report[0][0]['context']['id']);
          document.getElementById("photos").style.display = "block";
        }

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



function walker_run_talk(name, utterance="", file_ids=[]) {

  //if(file_ids.length > 0) {
    query = `
    {
      "name": "${name}",
      "ctx": {"question": "${utterance}", "file_ids":"${file_ids}"}
    }
    `;
  // } else {
  //   query = `
  //   {
  //     "name": "${name}",
  //     "ctx": {"question": "${utterance}"}
  //   }
  //   `;
  // }

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

function walker_yield_clear() {

  query = `
  {}
  `;

  return fetch(`${server}/js/walker_yield_clear`, {
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

function walker_get_file(file_id) {

  if(file_id) {
    query = `
    {
      "name": "get_file",
      "ctx": {
          "id": "${file_id}"
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
}



function walker_get_memories(question="") {

  query = `
  {
    "name": "get_memories",
    "ctx": {}
  }
  `;

  if (question){
    query = `
    {
      "name": "get_memories",
      "ctx": {
          "question": "${question}"
      }
  }
    `;
  }

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

function walker_get_memory(id) {

  query = `
  {
    "name": "get_memory",
    "ctx": {"id":"${id}"}
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

function walker_delete_memory(id) {

  query = `
  {
    "name": "delete_memory",
    "ctx": {"id":"${id}"}
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

// function walker_query_memories(question) {

//   query = `
//   {
//     "name": "get_memories",
//     "ctx": {"question":"${question}"}
//   }
//   `;

//   return fetch(`${server}/js/walker_run`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `token ${token}`
//     },
//     body: query,
//   }).then(function (result) {
//     return result.json();
//   });
// }


// function walker_get_base64(fild_id) {

//   query = `
//   {
//     "name": "get_file",
//     "ctx": {
//         "file_id": "${fild_id}"
//     }
//   }
//   `;

//   return fetch(`${server}/js/walker_run`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `token ${token}`
//     },
//     body: query,
//   }).then(function (result) {
//     return result.json();
//   });
// }


display_memory_feed();