var sentinel_id = document.getElementById("app-interact").getAttribute("data-sentinelid");
var server = document.getElementById("app-interact").getAttribute("data-server");
var walker = document.getElementById("app-interact").getAttribute("data-walkername");
var token = document.getElementById("app-interact").getAttribute("data-token");
var last_jid = null;

// Javascript objects containing emotions. Each key has a value of type array. - [icon,]
emotions = {
  sad: ["fa-frown-o", "blue"],
  happy: ["fa-smile-o", "orange"],
  fear: ["fa-frown-open", "green"],
  anger: ["fa-angry", "red"],
  surprised: ["fa-surprise", "yellow"],
  default: ["fa-meh-blank", "grey"],
};

//say = "Arianna is growing up so fast. Today she's been trying to stand on her own. It fills me up with such a sense of joy to see my little girl blossom before me.";

// list of emotions to be used in select list
emotions_select_values = Object.keys(emotions);
emotion_select_options = ``;
for (i = 0; i < emotions_select_values.length - 1; i++) {
  emotion_select_options = emotion_select_options + `<option value="${emotions_select_values[i]}">${emotions_select_values[i]}</option>`;
}

// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();
speech.lang = "en";
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  // Get List of Voices
  voices = window.speechSynthesis.getVoices();
  //set the voice.
  if (voices.length > 49) speech.voice = voices[49]; //US Female
  speech.volume = 1;
  speech.rate = 0.85;
  speech.pitch = 1;
};

// var query_textbox = $("#query__inputField");
// var chat_textbox = $("#chatio__inputField");

// const artyom = new Artyom();

// // // Add a single command
// var commandHello = {
//   indexes:["I'd like to add a memory"], // These spoken words will trigger the execution of the command
//   action:function(){ // Action to be executed when a index match with spoken word
//       //artyom.say("I'm Tobu, I can help you remember.");
//       //console.log("hi");
//       display_capture_modal();
//       artyom.fatality();
//   }
// };

// artyom.addCommands(commandHello);

// // // This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
// function startContinuousArtyom() {
//   artyom.fatality();// use this to stop

//   setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
//        artyom.initialize({
//           lang:"en-US",// A lot of languages are supported. Read the docs !
//           continuous:true,// Artyom will listen forever
//           listen:true, // Start recognizing
//           debug:true, // Show everything in the console
//           speed:1, // talk normally
//           name: "hey there"
//       }).then(function(){
//           console.log("Ready to work !");
//       });
//   },250);
// }

// var Chat_UserDictation = chat_artyom.newDictation({
//     continuous:true, // Enable continuous if HTTPS connection
//     onResult:function(chat_text){
//         // Do something with the text
//         console.log(chat_text);
//         chat_textbox.val(chat_text);
//     },
//     onStart:function(){
//         console.log("chat started");
//     },
//     onEnd:function(){
//         alert("Dictation stopped by the user");
//     }
// });

// Stop whenever you want
// Chat_UserDictation.stop();

/*const query_artyom = new Artyom();
// This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
function query_startContinuousArtyom(){
    query_artyom.fatality();// use this to stop any of

    setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
        query_artyom.initialize({
            lang:"en-GB",// A lot of languages are supported. Read the docs !
            continuous:true,// Artyom will listen forever
            listen:true, // Start recognizing
            debug:true, // Show everything in the console
            speed:1 // talk normally
        }).then(function(){
            console.log("Ready to work !");
        });
    },250);
}
query_startContinuousArtyom();
var Query_UserDictation = query_artyom.newDictation({
    continuous:true, // Enable continuous if HTTPS connection
    onResult:function(query_text){
        // Do something with the text
        console.log(query_text);
        query_textbox.val(query_text);
    },
    onStart:function(){
      console.log("query started");
    },
    onEnd:function(){
        alert("Dictation stopped by the user");
    }
});

Query_UserDictation.start();

// Stop whenever you want
// Query_UserDictation.stop();

query_artyom.redirectRecognizedTextOutput(function(query_recognized,query_isFinal){
    if(query_isFinal){
        query_textbox.val(query_recognized);
    }else{
      query_textbox.val(query_recognized);
    }
});*/

// // Replace the script tag with the app
document.getElementById("app-interact").parentNode.innerHTML = `
<!-- NAVBAR--><nav class="navbar navbar-expand-sm navbar-dark">
<div class="container">
<a onclick="location.reload()" class="navbar-brand">
    <!-- Logo Image -->
    <img src="./images/tobu_logo_w.png" width="30" height="30" alt="" class="d-inline-block align-middle mr-2">
</a>

<button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

<div id="navbarSupportedContent" class="collapse navbar-collapse">
    <ul class="navbar-nav ml-auto">
      <button type="button" class="btn btn-outline-secondary" onclick="display_capture_modal()" style="background-color: #feb248;"><i class="fa fa-picture-o"></i> Capture a memory</button>
      <button type="button" id="ask_tobu_btn" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#ask_tobu_modal"><i class="fa fa-microphone"></i> Ask Tobu</button>
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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick="display_memory_feed()"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
        <!-- <button type="button" class="btn btn-outline-secondary">Add Photo/Video</button> -->
          
        <div id="create_image_input"><input type="file" name="" id="create_fileId" onchange="imageUploaded()"></div>
        <div id="photos"></div>
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
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="close_edit_modal()"><span aria-hidden="true">&times;</span></button>
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
              <p class="card-text"><small class="text-muted"><span id="memoryModal_how"></span><span id="memoryModal_date"></span><span><i class="fas fa-map-marker-alt" style="padding-left: 2%;"></i></span><span id="memoryModal_where"></span><span id="memoryModal_people"></span></small></p>

              <p class="card-text"></p>
              <p id="memoryModal_description" class="card-text"></p>
              <p class="card-text"><small class="text-muted"><span id="memoryModal_lastUpdated"></span></small></p>
            </div>
            <div id="memoryModal_related_memories"></div>
          </div>
        </div>
        <div id="memoryModal_edit" style="display: none">
          <div id="edit_image_input"><input type="file" name="" id="edit_fileId" onchange="editImageUploaded()"></div>
          <div id="edit_photos"></div>
          <form>
            <div class="form-group">
              <label for="memory_subject">Subject</label>
              <input type="text" class="form-control" id="memory_subject" placeholder="Subject">
            </div>
            <!-- <div class="form-group">
              <label for="memory_category">Category</label>
              <input type="text" class="form-control" id="memory_category" placeholder="Category">
            </div> -->
            <div class="form-group">
              <label for="memory_when">When</label>
              <input type="text" class="form-control" id="memory_when" placeholder="When did this happen?">
            </div>
            <div class="form-group">
              <label for="memory_where">Where</label>
              <input type="text" class="form-control" id="memory_where" placeholder="Where did this happen?">
            </div>
            <div class="form-group">
              <label for="memory_how">How:</label>
              <select class="form-control" id="memory_how">${emotion_select_options}</select>
            </div>
            <div class="form-group">
              <label for="memory_who">Who:</label>  
              <input type="text" class="form-control" id="memory_who" name="memory_who">
            </div>
            <div class="form-group">
              <label for="memory_description">Description</label>
              <textarea class="form-control" id="memory_description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="memory_summary">Summary</label>
              <textarea class="form-control" id="memory_summary" rows="3"></textarea>
            </div>
          </form>
          <button class="btn btn-primary" onclick="save_memory_details()"><i class="fa fa-check-circle" aria-hidden="true"></i>Save Changes</button>
        </div>
      </div>

    </div>
  </div>
</div>
</div>


<div id="ask_tobu_alert" class="alert alert-primary alert-dismissible fade show mb-3" role="alert" style="display:none;"></div>

<div class="loader"></div>
<div id="all_memories"></div>

</div>
`;

var chat_messages = [];
var create_memory_images = [];
var upload_ids = [];
var edit_memory_images = [];
var edit_memory_ids = [];
var extension = "";
var file_upload = false;
var current_memory_photos = [];
var current_memory_id = "";
// var loading = true;
// var t = setInterval(function (){
//   if(loading){
//     $("#main_app").addClass("transparent");
//     $('.loader').show();
//     //document.querySelector('#ask_tobu_btn').disabled = true;
//   }
//   else{
//     $("#main_app").removeClass("transparent");
//     $('.loader').hide();
//     //document.querySelector('#ask_tobu_btn').disabled = false;
//   }
// },1000);

// get input from query field
var query_inputField = document.getElementById("query__inputField");

// function start_listening(){
//   var speechRecognizer = new webkitSpeechRecognition();
//   speechRecognizer.continuous = true;
//   speechRecognizer.interimResults = true;
//   speechRecognizer.start();
  
//   var finalTranscripts = "";
//   speechRecognizer.onresult = function(event){
//       var interimTranscripts = "";
//       for(var i=event.resultIndex; i<event.results.length; i++){
//           var transcript = event.results[i][0].transcript;
//           transcript.replace("\n", "<br>");
//           if(event.results[i].isFinal){
//               finalTranscripts += transcript;
//           }
//           else{
//               interimTranscripts += transcript;
//               console.log("You said: "+interimTranscripts);
//           }
//       }

//       if(interimTranscripts.includes("create") && interimTranscripts.includes("memory") && interimTranscripts.includes("hi")){
//           speechRecognizer.stop();
//           display_capture_modal();
//       }
//   };
// }

//fetches and renders memories in the feed area
async function display_memory_feed() {

  // clear memory feed again before displaying anything
  $("#all_memories").html("");
  var memories = [];

  if (query_inputField.value) {
    walker_get_memories(query_inputField.value).then(async (result) => {
      if (result.success){
        memories = result.report[0];
        if (memories.length > 0) {
          display_askTobu_alert(memories.length, query_inputField.value);
          await render_memories(memories);
        } 
        else {
          walker_get_memories().then(async (result) => {
            memories = result.report[0];
            display_askTobu_alert(0, query_inputField.value);
            await render_memories(memories);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      } else{
        $("#all_memories").html(`<div style="height:75vh; margin:auto; text-align:center; padding: 100px 0;"><i class="fa fa-exclamation-triangle"></i><br><div>We are currently experiencing technical difficulties with the Ask tobu feature. Please try again later. Thank you for your patience</div></div>`);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  } else {
    walker_get_memories()
      .then(async (result) => {
        if(!(result.success)){
          $("#all_memories").html(`<div style="height:75vh; margin:auto; text-align:center; padding: 100px 0;"><i class="fa fa-exclamation-triangle"></i><br><div>We are currently experiencing technical difficulties at the moment. Please try again later. Thank you for your patience</div></div>`);
        }
        else{
          memories = result.report[0];
          await render_memories(memories);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // startContinuousArtyom();
  //start_listening();
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

function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//takes an array of memories and renders memory posts in the memory feed.
async function render_memories(memories) {
  //clear memory feed
  $("#all_memories").html("");
  // console.log(memories);

  if (!memories) return;
  showLoader(true);
  for (let i = 0; i < memories.length; i++) {
    // for each memory
    console.log(memories[i]);
    m_keys = Object.keys(memories[i]);

    $("#all_memories").append(`<div id="memory_${memories[i]["id"]}" class="card mb-3"></div>`); // append card to feed

    // checking to see if file id exists; making sure it's not null or an empty string
    if (m_keys.includes("file_ids") && (memories[i]["file_ids"] != null || memories[i]["file_ids"] != "")) {
      var imageUrl = null;
      var memory_card_image = null;
      if (Array.isArray(memories[i]["file_ids"]) && memories[i]["file_ids"].length > 0) memory_card_image = memories[i]["file_ids"][0];
      if (typeof memories[i]["file_ids"] === "string") memory_card_image = memories[i]["file_ids"].split(",")[0]; // this safeguards against comma separated string (until I'm able to store it correctly)
      if (memory_card_image) {
        await walker_get_file(memory_card_image).then((result) => {
            imageUrl = result.report[0][0]["context"]["url"];
            if (imageUrl)
              $("#memory_" + memories[i]["id"]).prepend(
                `<img src="${imageUrl}" class="card-img-top" alt="..." onclick=display_memory_modal('${memories[i]["id"]}')>`
              );
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

    memory_subject = memories[i]["subject"];
    memory_description = memories[i]["description"];
    memory_summary = memories[i]["summary"];
    memory_where = memories[i]["where"];
    memory_when = memories[i]["when"];
    memory_date_created = memories[i]["date_created"];
    memory_date_modified = memories[i]["date_modified"];
    memory_emotion = [];
    memory_who = [];

    memory_subject = memory_subject == "" ? "Subject N/A" : memory_subject;
    memory_description = memory_description == "" ? "Description N/A" : memory_description;
    memory_summary = memory_summary == "" ? "Summary N/A" : memory_summary;
    memory_where = memory_where == "" ? "Unknown Location" : memory_where;
    memory_who = Array.isArray(memories[i]["who"]) ? memories[i]["who"] : [];
    var display_memory_people = ``;
    if(memory_who.length > 0) display_memory_people = `<span><i class="fas fa-user" style="padding-left: 2%;"></i></span>${memory_who.toString()}`;
    memory_emotion = memories[i]["how"] == "" ? emotions["default"] : emotions[memories[i]["how"]];
    memory_when = memory_when == "" ? "Date Unknown" : memory_when;
    memory_date_created = memory_date_created == "" ? memory_when : memory_date_created;
    memory_date_modified = memory_date_modified == "" ? memory_date_created : memory_date_modified;
    memory_date_created = isValidTimestamp(memory_date_created) ? memory_date_created.replace("T", " ").substring(0, memory_date_created.lastIndexOf(".")): memory_date_created;
    memory_date_modified = isValidTimestamp(memory_date_modified) ? memory_date_modified.replace("T", " ").substring(0, memory_date_modified.lastIndexOf(".")): memory_date_modified;
    memory_date_created = memory_date_created == "" ? memory_when : memory_date_created;
    memory_date_modified = memory_date_modified == "" ? memory_date_created : memory_date_modified;

    $("#memory_" + memories[i]["id"]).append(`
      <div class="card-body">
        <h5 class="card-title" style="margin-bottom: 0px;"><a href="javascript:display_memory_modal('${memories[i]["id"]}')">${memory_subject}</a></h5>
        <p class="card-text"><small class="text-muted"><span><i class="fa ${memory_emotion[0]}" style="color: ${memory_emotion[1]};"></i></span>${memory_when}<span><i class="fas fa-map-marker-alt" style="padding-left: 2%;"></i></span>${memory_where}${display_memory_people}</small></p>
        <p class="card-text"></p>
        <p class="card-text">${memory_summary}</p>
        <p class="card-text"><small class="text-muted">Last updated on ${memory_date_modified}</small></p>
      </div>
    `);

    if (m_keys.includes("relatedMemories") && memories[i]["relatedMemories"] != null && Array.isArray(memories[i]["relatedMemories"]) && memories[i]["relatedMemories"].length > 0) {
      related_memories = memories[i]["relatedMemories"];

      $("#memory_" + memories[i]["id"]).append(await render_related_memories(related_memories, 3));
      
      // rendered_related_memories = render_related_memories(related_memories);
      // $("#memory_"+memories[i]['id']).append(rendered_related_memories)
    }
  } // end for each memory
  showLoader(false);
}

async function render_related_memories(related_memories, limit) {
  var output = `
  <div class="card-footer" style="margin-bottom: 1%;">
        <p class="card-text"><small class="text-muted"><span><i class="fa fa-picture-o"></i></span>Related Memories</small></p>
        <div class="related_memories">
          <div class="tb">
            <div class="tr">
  `;
  
  for (let r = 0; r < related_memories.length; r++) {
    if(r < limit) {
      var rm_subject = related_memories[r]["subject"];
      var rm_imageData = null;
      var rm_card_image = null;
      rm_keys = Object.keys(related_memories[r]);
      if (rm_keys.includes("file_ids") && (related_memories[r]["file_ids"] != null || related_memories[r]["file_ids"] != "")) {
        if (Array.isArray(related_memories[r]["file_ids"]) && related_memories[r]["file_ids"].length > 0) rm_card_image = related_memories[r]["file_ids"][0];
        if (typeof related_memories[r]["file_ids"] === "string") rm_card_image = related_memories[r]["file_ids"].split(",")[0]; // this safeguards against comma separated string (until I'm able to store it correctly)
        if (rm_card_image) {
          await walker_get_file(rm_card_image).then((result) => {
            rm_imageData = result.report[0][0]["context"]["url"];
            rm_subject = related_memories[r]["subject"];
            if (related_memories[r]["id"]) {
              output +=
                `<div class="td" style="background-image: url('${rm_imageData}');position:relative" onclick="display_memory_modal('${related_memories[r]["id"]}')">
                <div style="top:0;left:0;width:100%; height:100%; background-color:#000000;opacity:0.6;position:absolute;color:#fff;padding: 2em;font-size: 0.8em;text-align: center;cursor:pointer">
                ${rm_subject}
                </div>
                </div>`
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
      if (related_memories[r]["file_ids"] == null || related_memories[r]["file_ids"] == "" || (Array.isArray(related_memories[r]["file_ids"]) && related_memories[r]["file_ids"].length == 0)) {
        if (related_memories[r]["id"]) {
        output +=
          `<div class="td" style="position:relative"><div style="top:0;left:0;width:100%; height:100%; background-color:#000000;opacity:0.6;position:absolute;color:#fff;padding: 2em;font-size: 0.8em;text-align: center;cursor:pointer">
          ${rm_subject}
          <div>
          </div>`;
        }
      }
    }
  }

  output += `</div></div></div></div></div>`;
  return output;
}

async function ask_tobu() {
  //close this modal
  $("#ask_tobu_modal").modal("hide");
  //clear memory feed when ask_tobu modal closes so that it doesn't append to all memories
  $("#all_memories").html("");
  await display_memory_feed();
}

function display_askTobu_alert(num_memories, query_value) {
  if (num_memories > 0) {
    // display alert
    $("#ask_tobu_alert").html(`
    Showing results for: '${query_value}'
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="display_memory_feed()">
      <span aria-hidden="true">&times;</span>
    </button>
    `);
    document.getElementById("ask_tobu_alert").style.display = "block";
  } else {
    $("#ask_tobu_alert").html(`
    No results found for: '${query_value}'; displaying all memories
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="display_memory_feed()">
      <span aria-hidden="true">&times;</span>
    </button>
    `);
    document.getElementById("ask_tobu_alert").style.display = "block";
  }
  // clear query field after displaying alert
  var query_inputField = document.getElementById("query__inputField");
  query_inputField.value = "";
}

//displays the capture a memory modal
async function display_capture_modal() {
  //reset the conversation
  chat_messages = [];
  $("#photos").html(``); // resets photos
  $("#photos").hide();
  $("#create_fileId").val(""); // clear input field
  create_memory_images = [];
  upload_ids = [];

  await walker_yield_clear().then((result) => {
      $("#createMemoryModal").modal({backdrop: 'static', keyboard: false});
      $("#createMemoryModal").modal("show");

      walker_run_talk("talk", "Document a memory", upload_ids, extension).then((result) => {
        chat_messages.push(["bot", result.report[0]["response"]]);
        readOutLoud(result.report[0]["response"]);

        update_messages();
      })
      .catch(function (error) {
        console.log(error);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function get_photo_url(memory_photo_ids){
  $("#edit_photos").html(``);
  current_memory_photos = [];
  for (let p = 0; p < memory_photo_ids.length; p++) {
    console.log(memory_photo_ids[p]);
    await walker_get_file(memory_photo_ids[p]).then((result) => {
      current_memory_photos.push(result.report[0][0]["context"]["url"]);
      display_memory_photos(memory.id, memory_photo_ids, current_memory_photos);
      $("#edit_fileId").val(""); // clear input field
    });
  }
}

//displays the detailed modal of the memory
async function display_memory_modal(id) {
  memory = [];
  current_memory_photos = [];
  file_upload = false;
  edit_memory_ids = [];

  // always show detailed view; hide edit view when memory modal is being displayed
  document.getElementById("memoryModal_edit").style.display = "none";
  document.getElementById("memoryModal_details").style.display = "block";
  $("#edit_photos").html(``);

  //clear
  $("#memoryModal_title").text("");
  $("#memoryModal_subject").text("");
  $("#memoryModal_date").text("");
  $("#memoryModal_where").text("");
  $("#memoryModal_description").text("");
  $("#memoryModal_how").html("");
  $("#memoryModal_related_memories").html("");
  $("#memoryModal_lastUpdated").text("");
  $("#memoryModal_image").html(" ");
  $("#memoryModal_people").html(``);

  showLoader(true);
  $("#memoryModal").modal("show");

  
  await walker_get_memory(id).then(async (result) => {
    memory = result.report[0];
    current_memory_id = id;

    console.log(memory.file_ids);

      if (memory.file_ids && memory.file_ids.length > 0) {
          edit_memory_ids = memory.file_ids;
        // console.log(memory.file_ids);
        if (memory.file_ids[0]) {
          await walker_get_file(memory.file_ids[0]).then((result) => {
            $("#memoryModal_image").html(
              `<img src="${result.report[0][0]["context"]["url"]}" class="card-img-top" alt="...">`
            );
          });
        }
        get_photo_url(edit_memory_ids);
      } else {
        $("#memoryModal_image").html(" ");
      }

      console.log(memory);

      $("#memoryModal_title").text(memory.when);
      $("#memoryModal_subject").text(memory.subject);
      $("#memoryModal_date").text(memory.when);
      $("#memoryModal_where").text(memory.where);
      $("#memoryModal_description").text(memory.description);
      if (memory.how == "") {
        $("#memoryModal_how").html(`<i class="fa ${emotions["default"][0]}" style="color: ${emotions["default"][1]};"></i>`);
      } else {
        $("#memoryModal_how").html(`<i class="fa ${emotions[memory.how][0]}" style="color: ${emotions[memory.how][1]};"></i>`);
      }

      persons = [];
      for (let p = 0; p < memory.who.length; p++) {
        persons.push(memory.who[p]["context"]["name"]);
      }

      if(persons.length > 0){
        $("#memoryModal_people").html(`<span><i class="fas fa-user" style="padding-left: 2%;"></i></span>${persons.toString()}`);
      } else{
        $("#memoryModal_people").html(``);
      }

      $("#memoryModal_lastUpdated").text(`Last updated on ${memory.date_modified.replace("T", " ").substring(0, memory.date_modified.lastIndexOf("."))}`);
      $("#memoryModal_related_memories").html(await render_related_memories(memory.relatedMemories, 6)); 
      $("#memoryModal_btn_narrate").on("click", function () {
        readOutLoud(memory.summary);
      });

      $("#memoryModal_btn_edit").on("click", function () {
        $("#edit_fileId").val(""); // clear input field
        $("#memoryModal_title").text("Edit Memory");

        $('input[name="memory_who"]').amsifySuggestags({
          suggestions: persons,
        });
        document.getElementById("memory_subject").value = memory.subject;
        // document.getElementById("memory_category").value = memory.category;
        document.getElementById("memory_description").value = memory.description;
        document.getElementById("memory_summary").value = memory.summary;
        document.getElementById("memory_when").value = memory.when;
        document.getElementById("memory_where").value = memory.where;
        document.getElementById("memory_how").value = memory.how;
        document.getElementById("memory_who").value = persons.toString();
        $('input[name="memory_who"]').amsifySuggestags();

        document.getElementById("memoryModal_edit").style.display = "block";
        //document.getElementById("memoryModal_details").style.display = "none";
      });

      $("#memoryModal_btn_delete").on("click", function () {
        walker_delete_memory(memory.id).then((result) => {
          //close this modal
          $("#memoryModal").modal("hide");
          setTimeout(function () {
            //resets feed and hide ask_tobu alert
            display_memory_feed();
            document.getElementById("ask_tobu_alert").style.display = "none";
          }, 1500);
        })
        .catch(function (error) {
          console.log(error);
        });
      });

      showLoader(false);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function display_memory_photos(memory_id, memory_file_ids, memory_photos) {
  console.log(memory_file_ids);
  d_memory_photos = ``;
  for (let ph = 0; ph < memory_photos.length; ph++) {
    d_memory_photos =
      d_memory_photos +
      `<div><i class="fas fa-times" style="padding-right: 20px; margin-bottom: 10px;" onclick="delete_memory_photo('${memory_id}', '${memory_file_ids[ph]}', '${memory_file_ids}')"></i><img src="${memory_photos[ph]}" style="height: 200px;"></div>`;
    // display photos above edit form
    $("#edit_photos").html(`<div class="tb"><div class="tr">${d_memory_photos}</div></div>`);
  }
}

function delete_memory_photo(memory_id, photo_id, memory_file_ids) {
  console.log(memory_file_ids);
  memory_file_ids = memory_file_ids.split(",");
  console.log(memory_file_ids);
  if (Array.isArray(memory_file_ids)) {
    const delete_index = memory_file_ids.indexOf(photo_id);
    if (delete_index > -1) memory_file_ids.splice(delete_index, 1);
  }
  console.log(memory_file_ids);
  edit_memory_ids = memory_file_ids;
  update_file_id(memory_id, edit_memory_ids).then((result) => {
    get_photo_url(edit_memory_ids);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  // walker_delete_file(photo_id).then((result) => {})
  //   .catch(function (error) {
  //     console.log(error);
  //   });
}

function close_edit_modal() {
  document.getElementById("memoryModal_edit").style.display = "none";
  document.getElementById("memoryModal_details").style.display = "block";
  $("#memoryModal").modal("hide");
  // hides ask_tobu alert
  document.getElementById("ask_tobu_alert").style.display = "none";
  // display_memory_feed();
}

function save_memory_details() {
  walker_update_memory(memory.id, edit_memory_ids, extension);
  console.log(who_selected);
  setTimeout(function () {
    close_edit_modal();
    display_memory_feed();
  }, 1500);
}

function readOutLoud(message) {
  speech.text = message;
  window.speechSynthesis.speak(speech);

  // const artyom = new Artyom();
  // if (artyom.speechSupported()) {
    //artyom.say(message);
  // } else {
  //   Unsupported :/
  // }
}

function showLoader(show = true) {
  if(show){
    $("#glass_case").show();
    $('.loader').show();
  }
  else{
    $("#glass_case").hide();
    $('.loader').hide();
  }
}

var speechRecognition = window.webkitSpeechRecognition;
// ----------------- Chat Microphone --------------------------

var chat_inputField = document.getElementById("chatio__inputField");
var chat_recognition = new speechRecognition();
var chat_textbox = $("#chatio__inputField");
var chat_content = "";
var chat_finalTranscripts = "";

chat_recognition.continuous = true;
chat_recognition.interimResults = true;
chat_stat = true;

chat_recognition.onstart = function () {
  console.log("Recording start");
  chat_finalTranscripts = "";
  document.getElementById("chat_mic-btn").style.color = "#ffffff";
  document.getElementById("chat_mic-bg").style.color = "#365d96";
};

chat_recognition.onend = function () {
  console.log("Recording end");
  chat_sendButton();
  document.getElementById("chat_mic-btn").style.color = "#000000";
  document.getElementById("chat_mic-bg").style.color = "#ffffff";
  chat_content = "";
  chat_textbox.val(chat_content);
  chat_stat = true;
};

chat_recognition.onresult = function (event) {
  // var chat_current = event.resultIndex;
  // var chat_transcript = event.results[chat_current][0].transcript;
  // chat_content += chat_transcript;
  // chat_textbox.val(chat_content);

  var chat_interimTranscripts = "";
  for(var i=event.resultIndex; i<event.results.length; i++){
    var chat_transcript = event.results[i][0].transcript;
    chat_transcript.replace("\n", "<br>");
    if(event.results[i].isFinal){
      chat_finalTranscripts += chat_transcript;
      chat_textbox.val(chat_finalTranscripts);
    }
    else{
      chat_interimTranscripts += chat_transcript;
      chat_textbox.val(chat_finalTranscripts + chat_interimTranscripts);
    }
  }
};

function chat_mic_click() {
  if (chat_stat) {
    if (chat_content.length) {
      chat_content += "";
    }

    chat_recognition.continuous = true;
    chat_recognition.start();
    chat_stat = false;
  } else {
    chat_recognition.stop();
  }
}

// ----------------- Chat Microphone --------------------------

// ----------------- Query Microphone --------------------------

var query_inputField = document.getElementById("query__inputField");
var query_recognition = new speechRecognition();
var query_textbox = $("#query__inputField");
var query_content = "";
var query_finalTranscripts = "";

query_recognition.continuous = true;
query_recognition.interimResults = true;
query_stat = true;

query_recognition.onstart = function () {
  console.log("Recording start");
  query_finalTranscripts = "";
  query_textbox.val("");
  document.getElementById("query_mic-btn").style.color = "#ffffff";
  document.getElementById("query_mic-bg").style.color = "#365d96";
};

query_recognition.onend = async function () {
  console.log("Recording end");
  await ask_tobu();
  document.getElementById("query_mic-btn").style.color = "#000000";
  document.getElementById("query_mic-bg").style.color = "#ffffff";
  query_content = "";
  query_stat = true;
};

query_recognition.onresult = function (event) {
  // var query_current = event.resultIndex;
  // var query_transcript = event.results[query_current][0].transcript;
  // query_content += query_transcript;
  // query_textbox.val(query_content);

  var query_interimTranscripts = "";
  for(var i=event.resultIndex; i<event.results.length; i++){
    var query_transcript = event.results[i][0].transcript;
    query_transcript.replace("\n", "<br>");
    if(event.results[i].isFinal){
      query_finalTranscripts += query_transcript;
      query_textbox.val(query_finalTranscripts);
    }
    else{
      query_interimTranscripts += query_transcript;
      query_textbox.val(query_finalTranscripts + query_interimTranscripts);
    }
  }
};

function query_mic_click() {
  if (query_stat) {
    if (query_content.length) {
      query_content += "";
    }

    query_recognition.continuous = true;
    query_recognition.start();
    query_stat = false;
  } else {
    query_recognition.stop();
  }
}

// ----------------- Query Microphone --------------------------

function update_messages() {
  conv = "";
  for (let i = 0; i < chat_messages.length; i++) {
    if (chat_messages[i][0] == "bot") {
      new_message =
        '<p class="botText"><span>' + chat_messages[i][1] + "</span></p>";
    } else {
      new_message =
        '<p class="userText"><span>' + chat_messages[i][1] + "</span></p>";
    }
    conv = conv + new_message;
  }
  document.getElementById("chatbox").innerHTML = conv;
  chat_inputField.value = "";
}

function chat_sendButton() {
  var utterance = chat_inputField.value;

  if (utterance) {
    chat_messages.push(["user", utterance]);
  }

  update_messages();

  walker_run_talk("talk", utterance, upload_ids, extension)
    .then((result) => {
      chat_messages.push(["bot", result.report[0]["response"]]);
      readOutLoud(result.report[0]["response"]);

      update_messages();
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function uploadImage(file) {
  const cloudName = "dlwqeqp9i";

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", "tobuapp");

  const result = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: "POST",
      body,
    }
  ).then((res) => res.json());

  return result;
}

async function imageUploaded() {
  var base64String = "";

  var file = document.querySelector("#create_image_input input[type=file]")["files"][0];

  const result = await uploadImage(file).catch((err) => console.log(err));
  const imageUrl = result.url;
  console.log({ imageUrl });

  file_upload = true;

  extension = file.name;

  var reader = new FileReader();

  reader.onload = async function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    imageBase64Stringsep = base64String;
    create_memory_images.push(base64String);
    console.log(create_memory_images);
    // console.log(base64String);

    await walker_run_upload(extension, imageUrl)
      .then((result) => {
        console.log(result.report[0][0]["context"]["id"]);

        if (create_memory_images.length > 0) {
          upload_ids.push(result.report[0][0]["context"]["id"]);
          document.getElementById("photos").style.display = "block";
          $("#create_fileId").val(""); // clear input field
        }

        c_memory_photos = ``;
        for (let i = 0; i < create_memory_images.length; i++) {
          image_src = "data:image/png;base64," + create_memory_images[i];
          c_memory_photos = c_memory_photos + `<div class="td"><img src="${image_src}" style="height: 200px;"></div>`;
          $("#photos").html(`<div class="tb"><div class="tr">${c_memory_photos}</div></div>`);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  reader.readAsDataURL(file);
}

async function editImageUploaded() {
  $("#edit_photos").html(``);
  file_upload = true;

  var base64String = "";

  var file = document.querySelector("#edit_image_input input[type=file]")["files"][0];

  const result = await uploadImage(file).catch((err) => console.log(err));
  const imageUrl = result.url;
  console.log({ imageUrl });

  extension = file.name;

  var reader = new FileReader();

  reader.onload = async function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    imageBase64Stringsep = base64String;
    $("#edit_photos").html(``);
    edit_memory_images.push(base64String);
    console.log(edit_memory_images);
    // console.log(base64String);

    await walker_run_upload(extension, imageUrl).then((result) => {
        console.log(result.report[0][0]["context"]["id"]);

        if (edit_memory_images.length > 0) {
          edit_memory_ids.push(result.report[0][0]["context"]["id"]);
          update_file_id(current_memory_id, edit_memory_ids).then((result) => {}).catch(function (error) {console.log(error);});
          get_photo_url(edit_memory_ids);
          console.log(edit_memory_ids);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  reader.readAsDataURL(file);
}

function update_file_id(memory_id, file_ids){
  // This function updates only the file id in a given memory
  query = `
  {
    "name": "update_memory",
    "ctx": {
      "id":"${memory_id}",
      "file_ids": ${JSON.stringify(file_ids)}
    }
  }
  `;

  return fetch(`${server}/js/walker_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

function walker_run_talk(name, utterance = "", file_ids = [], file_name = "") {
  //if(file_ids.length > 0) {
  query = `
    {
      "name": "${name}",
      "ctx": {
        "question": "${utterance}"
      }
    }
    `;
  if (file_upload) {
    query = `
    {
      "name": "${name}",
      "ctx": {
        "question": "${utterance}", 
        "file_ids": ${JSON.stringify(file_ids)},
        "file_name": "${file_name}"
      }
    }
    `;
  }
  // } else {
  //   query = `
  //   {
  //     "name": "${name}",
  //     "ctx": {"question": "${utterance}"}
  //   }
  //   `;
  // }

  return fetch(`${server}/js/walker_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

async function walker_yield_clear() {
  query = `
  {}
  `;

  return fetch(`${server}/js/walker_yield_clear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

async function walker_run_upload(name, url) {
  query = `
  {
    "name": "upload_files",
    "ctx": {
        "files": [
            {
             "name": "${name}",
             "base64": "",
             "url": "${url}"
        }
    ]
    }
  }
  `;

  return fetch(`${server}/js/walker_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

async function walker_get_file(file_id) {
  if (file_id) {
    query = `
    {
      "name": "get_file",
      "ctx": {
          "file_id": "${file_id}"
      }
    }
    `;

    return fetch(`${server}/js/walker_run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: query,
    }).then(function (result) {
      return result.json();
    });
  }
}

function walker_get_memories(question = "") {
  query = `
  {
    "name": "get_memories",
    "ctx": {}
  }
  `;

  if (question) {
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

async function walker_get_memory(id) {
  query = `
  {
    "name": "get_memory",
    "ctx": {"id":"${id}"}
  }
  `;

  return fetch(`${server}/js/walker_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

function walker_delete_file(id) {
  query = `
  {
    "name": "delete_file",
    "ctx": {"id":"${id}"}
  }
  `;

  return fetch(`${server}/js/walker_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

function walker_update_memory(id, file_ids = [], file_name = "") {
  query = `
  {
    "name": "update_memory",
    "ctx": {
      "id":"${id}",
      "subject": "${document.getElementById("memory_subject").value}",
      "summary": "${document.getElementById("memory_summary").value}",
      "description": "${document.getElementById("memory_description").value}",
      "when": "${document.getElementById("memory_when").value}",
      "where": "${document.getElementById("memory_where").value}",
      "how": "${document.getElementById("memory_how").value}",
      "file_ids": ${JSON.stringify(file_ids)},
      "who": ${JSON.stringify(who_selected)}
    }
  }
  `;

  if (file_upload) {
    query = `
  {
    "name": "update_memory",
    "ctx": {
      "id":"${id}",
      "subject": "${document.getElementById("memory_subject").value}",
      "summary": "${document.getElementById("memory_summary").value}",
      "description": "${document.getElementById("memory_description").value}",
      "when": "${document.getElementById("memory_when").value}",
      "where": "${document.getElementById("memory_where").value}",
      "how": "${document.getElementById("memory_how").value}",
      "file_ids": ${JSON.stringify(file_ids)},
      "file_name": "${file_name}",
      "who": ${JSON.stringify(who_selected)}
    }
  }
  `;
  }

  return fetch(`${server}/js/walker_run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    },
    body: query,
  }).then(function (result) {
    return result.json();
  });
}

async function get_memory_people(memory_id) {
  // This function returns a list of people in the memory
  var people = [];
  await walker_get_memory(memory_id)
    .then((result) => {
      for (let p = 0; p < result.report[0].who.length; p++) {
        people.push(result.report[0].who[p]["context"]["name"]);
      }
    })
    .catch(function (error) {
      console.log(error);
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
display_memory_feed();