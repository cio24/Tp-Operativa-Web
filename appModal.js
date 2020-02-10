
  const divupload=document.querySelector("#div-upload");
  var fileInput = document.getElementById("file_upload");

  inputHandler = function () {

    /*
      var reader = new FileReader();
      reader.onload = function () {
        document.getElementById('out').innerHTML = reader.result;
      };

      */

      loadCSV(fileInput.files[0]);
      
  };

      fileInput.addEventListener("change",inputHandler);


function dragOverHandler(ev) {
  console.log('File(s) in drop zone'); 

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function removeDragData(ev) {
  console.log('Removing drag data')
  
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to remove the drag data
    ev.dataTransfer.items.clear();
  } else {
    // Use DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
}

function dropHandler(ev) {
        console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();

        console.log('... file[' + i + '].name = ' + file.name);

        loadCSV(file);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  } 
  
  // Pass event to removeDragData for cleanup
  removeDragData(ev);
}

function dragOverHandler(ev) {

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

function removeDragData(ev) {
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to remove the drag data
    ev.dataTransfer.items.clear();
  } else {
    // Use DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
  
}

function loadCSV(file) {
  const reader = new FileReader();
  reader.onloadend = function () {
    console.log(reader.result);
    //crear la matrix
  };

  //start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(file);

  let filename = document.querySelector("#filename");
  if(filename == undefined){
    filename = document.createElement("h6");
    filename.setAttribute("id","filename");
    filename.style.marginTop="40px";
    filename.style.fontSize="32px";
    filename.style.fontWeight="bold";
    divupload.appendChild(filename);
  }
  filename.innerHTML=file.name;

};